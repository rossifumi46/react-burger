import styles from "./styles.module.css";
import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDrag } from "react-dnd";
import { Link } from "react-router-dom";
import { useLocation } from "react-router";
import { TIngredient } from "../../types";
import { useSelector } from "../../services/store";

type TProps = {
  ingredient: TIngredient;
}

const IngredientCard: React.FC<TProps> = ({ ingredient }) => {
  const location = useLocation();
  const { counts } = useSelector((store) => store.builder);

  const [, dragRef] = useDrag({
    type: "ingredient",
    item: ingredient,
    collect: (monitor) => ({
      isDrag: monitor.isDragging(),
    }),
  });

  return (
    <div
      className={`${styles.card}`}
      id={ingredient._id + ''}
      ref={dragRef}
    >
      <Link
        to={{
          pathname: `/ingredients/${ingredient._id}`,
          // This is the trick! This link sets
          // the `ingredient` in location state.
          state: { ingredient: location },
        }}
      >
        {counts[ingredient._id] > 0 && (
          <Counter count={counts[ingredient._id]} size="default" />
        )}
        <img
          alt="ingredient"
          src={ingredient.image}
          className={`${styles.image} ml-4`}
        />
        <span className={`mt-1 ${styles.info} text text_type_digits-default`}>
          {ingredient.price} <CurrencyIcon type="primary" />
        </span>
        <span className={`mt-1 ${styles.info} text text_type_main-default`}>
          {ingredient.name}
        </span>
      </Link>
    </div>
  );
};

export default IngredientCard;
