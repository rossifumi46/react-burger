import styles from './styles.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from "prop-types";
import { ingredientPropTypes } from '../types';

const IngredientCard = ({ ingredient, onClick }) => {
  return (
    <div
      className={`${styles.card}`}
      id={ingredient._id}
      onClick={onClick}
    >
      <img alt="ingredient" src={ingredient.image} className={`${styles.image} ml-4`} />
      <span className={`mt-1 ${styles.info} text text_type_digits-default`}>
        {ingredient.price} <CurrencyIcon type="primary" />
      </span>
      <span className={`mt-1 ${styles.info} text text_type_main-default`}>
        {ingredient.name}
      </span>
    </div>
  );
};

IngredientCard.propTypes = {
  ingredient: ingredientPropTypes.isRequired,
  onClick: PropTypes.func.isRequired,
}

export default IngredientCard;
