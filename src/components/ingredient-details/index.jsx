import PropTypes from 'prop-types';
import { container, structure, title, img } from "./styles.module.css";
import Modal from "../modal";
import { ingredientPropTypes } from '../types';

function IngredientDetails({ ingredient, isOpen, onClose }) {
  const { name, image, calories, proteins, fat, carbohydrates } = ingredient;

  return (
    <Modal header="Детали ингредиента" isOpen={isOpen} onClose={onClose}>
      <div className={`${container} pb-15`}>
        <div className={img}>
          <img src={image} alt="ingredient" />
        </div>
        <h3 className="text text_type_main-medium mt-4">{name}</h3>
        <div className={`${structure} mt-8`}>
          <div className="text_color_inactive">
            <span className={`${title} text text_type_main-small`}>
              Калорий, ккал
            </span>
            <span className="text text_type_digits-default">{calories}</span>
          </div>
          <div className="text_color_inactive ml-5">
            <span className={`${title} text text_type_main-small`}>
              Белки, г
            </span>
            <span className="text text_type_digits-default">{proteins}</span>
          </div>
          <div className="text_color_inactive ml-5">
            <span className={`${title} text text_type_main-small`}>
              Жиры, г
            </span>
            <span className="text text_type_digits-default">{fat}</span>
          </div>
          <div className="text_color_inactive ml-5">
            <span className={`${title} text text_type_main-small`}>
              Углеводы, г
            </span>
            <span className="text text_type_digits-default">
              {carbohydrates}
            </span>
          </div>
        </div>
      </div>
    </Modal>
  );
}

IngredientDetails.propTypes = {
  ingredient: ingredientPropTypes.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
}

export default IngredientDetails;
