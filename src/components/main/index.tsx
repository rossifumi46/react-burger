import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "../burger-constructor/styles.module.css";
import { useDrag, useDrop } from "react-dnd";
import { useDispatch } from 'react-redux';
import { useRef } from "react";
import { moveIngredient, removeIngredient } from "../../services/slices/constructorSlice";
import { TIngredient } from "../../types";

type TProps = {
  ingredient: TIngredient;
  index: number;
}

const Main: React.FC<TProps> = ({ ingredient, index }) => {
  const ref = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();
  const [, drag] = useDrag({
    type: 'main',
    item: { ingredient, index },
    // collect: monitor => ({
    //   isDrag: monitor.isDragging()
    // })
  });

  const [, drop] = useDrop({
    accept: 'main',
    hover(item: TProps, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
          return;
      }
      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      // Get vertical middle
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      // Determine mouse position
      const clientOffset = monitor.getClientOffset();
      // Get pixels to the top
      if (!clientOffset) return;
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%
      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
          return;
      }
      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
          return;
      }
      // Time to actually perform the action
      dispatch(moveIngredient([dragIndex, hoverIndex]));
      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex;
    },
  });

  drag(drop(ref));

  return (
    <div className={`${styles.item} mb-4`} ref={ref}>
      <div className="mr-2">
        <DragIcon type="primary" />
      </div>
      <ConstructorElement
        text={ingredient.name}
        price={ingredient.price}
        thumbnail={ingredient.image}
        handleClose={() => dispatch(removeIngredient(index))}
      />
    </div>
  );
};

export default Main;