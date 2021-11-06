import styles from "./styles.module.css";
import { TIngredient } from "../../types";

type TProps = {
  ingredient: TIngredient;
}

const IngredientDetails: React.FC<TProps> = ({ ingredient }) => {
  const { name, image, calories, proteins, fat, carbohydrates } = ingredient;

  return (
      <div className={`${styles.container} pb-15`}>
        <div className={styles.img}>
          <img src={image} alt="ingredient" />
        </div>
        <h3 className="text text_type_main-medium mt-4">{name}</h3>
        <div className={`${styles.structure} mt-8`}>
          <div className="text_color_inactive">
            <span className={`${styles.title} text text_type_main-small`}>
              Калорий, ккал
            </span>
            <span className="text text_type_digits-default">{calories}</span>
          </div>
          <div className="text_color_inactive ml-5">
            <span className={`${styles.title} text text_type_main-small`}>
              Белки, г
            </span>
            <span className="text text_type_digits-default">{proteins}</span>
          </div>
          <div className="text_color_inactive ml-5">
            <span className={`${styles.title} text text_type_main-small`}>
              Жиры, г
            </span>
            <span className="text text_type_digits-default">{fat}</span>
          </div>
          <div className="text_color_inactive ml-5">
            <span className={`${styles.title} text text_type_main-small`}>
              Углеводы, г
            </span>
            <span className="text text_type_digits-default">
              {carbohydrates}
            </span>
          </div>
        </div>
      </div>
  );
}

export default IngredientDetails;
