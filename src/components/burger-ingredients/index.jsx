import React, { useEffect, useState, useRef } from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { grid, tabs, list, ingredients_container } from "./styles.module.css";
import IngredientDetails from "../ingredient-details";
import IngredientCard from "../ingredient-card";
import Modal from "../modal";
import { useSelector, useDispatch } from 'react-redux';
import { cleanIngredient, setIngredient } from "../../services";

const BurgerIngredients = () => {
  const [current, setCurrent] = useState(0);
  const { ingredients } = useSelector(store => store.ingredients);
  const ingredient = useSelector(store => store.ingredient);
  const dispatch = useDispatch();

  const [isOpen, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
    dispatch(cleanIngredient());
  }
  const handleOpen = (ingredient) => () => {
    dispatch(setIngredient(ingredient));
    setOpen(true);
  };

  const ref = useRef();

  const refs = useRef(Array(3).fill(null));

  useEffect(() => {
    if (ref.current) {
      ref.current.addEventListener('scroll', _ => {
        const tab1 = refs.current[0].getBoundingClientRect().top - ref.current.getBoundingClientRect().top;
        const tab2 = refs.current[1].getBoundingClientRect().top - ref.current.getBoundingClientRect().top;
        const tab3 = refs.current[2].getBoundingClientRect().top - ref.current.getBoundingClientRect().top;
        const min = Math.min(Math.abs(tab1), Math.abs(tab2),Math.abs(tab3));
        const index = [tab1, tab2, tab3].findIndex(value => Math.abs(value) === min);
        setCurrent(index);
      });
    }
  }, []);

  return (
    <section className={`${ingredients_container}`}>
      <h2 className={`text text_type_main-large`}>Соберите бургер</h2>
      <div className={`${tabs}`}>
        <Tab value="one" active={current === 0} onClick={setCurrent}>
          Булки
        </Tab>
        <Tab value="two" active={current === 1} onClick={setCurrent}>
          Соусы
        </Tab>
        <Tab value="three" active={current === 2} onClick={setCurrent}>
          Научинки
        </Tab>
      </div>
      <div className={`${list}`} ref={ref}>
        <h3 className="text text_type_main-medium mt-10" ref={e => refs.current[0] = e}>Булки</h3>
        <div className={`${grid} mt-6 ml-4 mr-4`}>
          {ingredients?.filter((item) => item.type === "bun")
            .map((item) => (
              <IngredientCard
                ingredient={item}
                onClick={handleOpen(item)}
                key={item._id}
              />
            ))}
        </div>
        <h3 className="text text_type_main-medium mt-10" ref={e => refs.current[1] = e}>Соусы</h3>
        <div className={`${grid} mt-6 ml-4 mr-4`}>
          {ingredients?.filter((item) => item.type === "sauce")
            .map((item) => (
              <IngredientCard
                ingredient={item}
                onClick={handleOpen(item)}
                key={item._id}
              />
            ))}
        </div>
        <h3 className="text text_type_main-medium mt-10" ref={e => refs.current[2] = e}>Начинка</h3>
        <div className={`${grid} mt-6 ml-4 mr-4`}>
          {ingredients?.filter((item) => item.type === "main")
            .map((item) => (
              <IngredientCard
                ingredient={item}
                onClick={handleOpen(item)}
                key={item._id}
              />
            ))}
        </div>
      </div>
      {isOpen && (
        <Modal header="Детали ингредиента" onClose={handleClose}>
          <IngredientDetails ingredient={ingredient} />
        </Modal>
      )}
    </section>
  );
};

export default BurgerIngredients;
