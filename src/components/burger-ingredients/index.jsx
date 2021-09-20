import React, { useState } from "react";
import PropTypes from "prop-types";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { grid, tabs, list, ingredients } from "./styles.module.css";
import { ingredientPropTypes } from "../types";
import IngredientDetails from "../ingredient-details";
import IngredientCard from "../ingredient-card";
import Modal from "../modal";

const BurgerIngredients = ({ data }) => {
  const [current, setCurrent] = React.useState(null);

  const [isOpen, setOpen] = useState(false);

  const handleClose = () => setOpen(false);
  const handleOpen = (data) => () => {
    setCurrent(data);
    setOpen(true);
  };

  return (
    <section className={`${ingredients}`}>
      <h2 className={`text text_type_main-large`}>Соберите бургер</h2>
      <div className={`${tabs}`}>
        <Tab value="one" active={current === "one"} onClick={setCurrent}>
          Булки
        </Tab>
        <Tab value="two" active={current === "two"} onClick={setCurrent}>
          Соусы
        </Tab>
        <Tab value="three" active={current === "three"} onClick={setCurrent}>
          Научинки
        </Tab>
      </div>
      <div className={`${list}`}>
        <h3 className="text text_type_main-medium mt-10">Булки</h3>
        <div className={`${grid} mt-6 ml-4 mr-4`}>
          {data
            .filter((item) => item.type === "bun")
            .map((item) => (
              <IngredientCard
                ingredient={item}
                onClick={handleOpen(item)}
                key={item._id}
              />
            ))}
        </div>
        <h3 className="text text_type_main-medium mt-10">Соусы</h3>
        <div className={`${grid} mt-6 ml-4 mr-4`}>
          {data
            .filter((item) => item.type === "sauce")
            .map((item) => (
              <IngredientCard
                ingredient={item}
                onClick={handleOpen(item)}
                key={item._id}
              />
            ))}
        </div>
        <h3 className="text text_type_main-medium mt-10">Начинка</h3>
        <div className={`${grid} mt-6 ml-4 mr-4`}>
          {data
            .filter((item) => item.type === "main")
            .map((item) => (
              <IngredientCard
                ingredient={item}
                onClick={handleOpen(item)}
                key={item._id}
              />
            ))}
        </div>
      </div>
      {current && isOpen && (
        <Modal header="Детали ингредиента" onClose={handleClose}>
          <IngredientDetails ingredient={current} />
        </Modal>
      )}
    </section>
  );
};

BurgerIngredients.propTypes = {
  data: PropTypes.arrayOf(ingredientPropTypes.isRequired).isRequired,
};

export default BurgerIngredients;
