import styles from "./styles.module.css";
import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { ingredientPropTypes } from "../types";
import { useDrag } from "react-dnd";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useLocation } from "react-router";

const IngredientCard = ({ ingredient, onClick }) => {
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
      id={ingredient._id}
      ref={dragRef}
    >
      <Link
        to={{
          pathname: `/ingredients/${ingredient._id}`,
          // This is the trick! This link sets
          // the `background` in location state.
          state: { background: location },
        }}
      >
        {counts[ingredient._id] && (
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

IngredientCard.propTypes = {
  ingredient: ingredientPropTypes.isRequired,
};

export default IngredientCard;
