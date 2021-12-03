import React, { useEffect, useState, useRef } from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./styles.module.css";
import IngredientCard from "../ingredient-card";
import { useSelector } from "../../services/store";

const BurgerIngredients = () => {
  const [current, setCurrent] = useState('');
  const { ingredients } = useSelector((store) => store.ingredients);

  const ref = useRef<HTMLDivElement>(null);

  const refs = useRef<(HTMLHeadingElement | null )[]>(Array(3).fill(null));

  useEffect(() => {
    if (ref.current) {
      ref.current.addEventListener('scroll', _ => {
        if (ref.current && refs.current[0] && refs.current[1] && refs.current[2]) {
          const tab1 = refs.current[0].getBoundingClientRect().top - ref.current.getBoundingClientRect().top;
          const tab2 = refs.current[1].getBoundingClientRect().top - ref.current.getBoundingClientRect().top;
          const tab3 = refs.current[2].getBoundingClientRect().top - ref.current.getBoundingClientRect().top;
          const min = Math.min(Math.abs(tab1), Math.abs(tab2),Math.abs(tab3));
          const index = [tab1, tab2, tab3].findIndex(value => Math.abs(value) === min);
          setCurrent(index + '');
        }
      });
    }
  }, []);

  return (
    <section className={`${styles.ingredients_container}`}>
      <h2 className={`text text_type_main-large`}>Соберите бургер</h2>
      <div className={`${styles.tabs}`}>
        <Tab value="one" active={current ==='0'} onClick={setCurrent}>
          Булки
        </Tab>
        <Tab value="two" active={current === '1'} onClick={setCurrent}>
          Соусы
        </Tab>
        <Tab value="three" active={current === '2'} onClick={setCurrent}>
          Научинки
        </Tab>
      </div>
      <div className={`${styles.list}`} ref={ref}>
        <h3 className="text text_type_main-medium mt-10" ref={e => refs.current[0] = e}>Булки</h3>
        <div className={`${styles.grid} mt-6 ml-4 mr-4`}>
          {ingredients?.filter(item => item.type === "bun")
            .map(item => (
              <IngredientCard
                ingredient={item}
                key={item._id}
              />
            ))}
        </div>
        <h3 className="text text_type_main-medium mt-10" ref={e => refs.current[1] = e}>Соусы</h3>
        <div className={`${styles.grid} mt-6 ml-4 mr-4`}>
          {ingredients?.filter(item => item.type === "sauce")
            .map(item => (
              <IngredientCard
                ingredient={item}
                key={item._id}
              />
            ))}
        </div>
        <h3 className="text text_type_main-medium mt-10" ref={e => refs.current[2] = e}>Начинка</h3>
        <div className={`${styles.grid} mt-6 ml-4 mr-4`}>
          {ingredients?.filter(item => item.type === "main")
            .map(item => (
              <IngredientCard
                ingredient={item}
                key={item._id}
              />
            ))}
        </div>
      </div>
    </section>
  );
};

export default BurgerIngredients;
