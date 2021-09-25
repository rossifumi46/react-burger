import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Button,
  ConstructorElement,
  CurrencyIcon,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { constructor, item, sum, list } from "./styles.module.css";
import { ingredientPropTypes } from "../types";
import OrderDetails from "../order-details";
import Modal from "../modal";
import { useDrop, useDrag } from "react-dnd";
import { useDispatch, useSelector } from 'react-redux';
import { addIngredient } from "../../services";


const BurgerConstructor = () => {
  const [isOpen, setOpen] = useState(false);
  const dispatch = useDispatch();
  const { ingredients } = useSelector(store => store.constructor);
  console.log(ingredients);
  const [{} , dropTarget] = useDrop({
    accept: 'ingredient',
    drop(ingredient) {
      dispatch(addIngredient(ingredient));
    },
  });

  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);
  return (
    <section className={`${constructor} pt-25 pl-4`} ref={dropTarget}>
      {/* <div className={`${item} ml-6 mb-4`}>
        <ConstructorElement
          type="top"
          isLocked={true}
          text={data[0].name}
          price={data[0].price}
          thumbnail={data[0].image}
        />
      </div> */}
      <div className={list}>
        {ingredients?.map(ingredient => (
          <div className={`${item}`}>
            <DragIcon className="mr-2" />
            <ConstructorElement
              text={ingredient.name}
              price={ingredient.price}
              thumbnail={ingredient.image}
            />
          </div>
        ))}
      </div>
      {/* <div className={`${item} mt-4 ml-6`}>
        <ConstructorElement
          type="bottom"
          isLocked={true}
          text={data[0].name}
          price={data[0].price}
          thumbnail={data[0].image}
        />
      </div> */}
      <div className={`${sum} mt-10`}>
        <span className={`text text_type_digits-medium mr-10`}>
          610 <CurrencyIcon />
        </span>
        <Button onClick={handleOpen} type="primary" size="large">
          Оформить заказ
        </Button>
      </div>
      {isOpen && (
        <Modal onClose={handleClose}>
          <OrderDetails isOpen={isOpen} />
        </Modal>
      )}
    </section>
  );
};

export default BurgerConstructor;
