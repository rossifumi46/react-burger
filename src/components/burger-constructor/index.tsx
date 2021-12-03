import React, { useState, useMemo } from "react";
import {
  Button,
  ConstructorElement,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./styles.module.css";
import OrderDetails from "../order-details";
import Modal from "../modal";
import { useDrop } from "react-dnd";
import Main from "../main";
import { useHistory } from "react-router";
import { addIngredient, removeBun } from "../../services/slices/constructorSlice";
import { createOrderRequest } from "../../services/slices/orderSlice";
import { TIngredient } from "../../types";
import { useDispatch, useSelector } from "../../services/store";

const add = (accumulator: number, a: TIngredient) => accumulator + a.price;

const BurgerConstructor = () => {
  const [isOpen, setOpen] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const { main, bun } = useSelector((store) => store.builder);
  const { user, accessToken } = useSelector((store) => store.auth);
  const { orderDetails, orderRequestFailed, orderRequestStart } = useSelector(
    (store) => store.order
  );

  const [, dropTarget] = useDrop({
    accept: "ingredient",
    drop(ingredient) {
      dispatch(addIngredient(ingredient));
    },
  });

  const totalPrice = useMemo(
    () => main.reduce(add, 0) + (2 * ((bun && bun.price) || 0)),
    [bun, main]
  );

  const handleClose = () => setOpen(false);

  const handleCreateOrder = async () => {
    if (!user) {
      history.replace('/login');
    } else {
      let order: string[] = main.map((ingredient: TIngredient) => ingredient._id);
      if (bun) order = [...order, bun._id, bun._id];
      await dispatch(createOrderRequest({ ingredients: order, token: accessToken }));
      setOpen(true);
    }
  };

  return (
    <section className={`constructor pt-25 pl-4`} ref={dropTarget}>
      {bun || main.length > 0 ? (
        <>
          {bun && (
            <div className={`${styles.item} ml-6 mb-4`}>
              <ConstructorElement
                type="top"
                isLocked={main.length > 0}
                text={bun.name + " (вверх)"}
                price={bun.price}
                thumbnail={bun.image}
                handleClose={() => dispatch(removeBun())}
              />
            </div>
          )}
          <div className={styles.list}>
            {main?.map((ingredient: TIngredient, index: number) => (
              <Main ingredient={ingredient} index={index} key={ingredient._id} />
            ))}
          </div>
          {bun && (
            <div className={`${styles.item} ml-6`}>
              <ConstructorElement
                type="bottom"
                isLocked={main.length > 0}
                text={bun.name + " (низ)"}
                price={bun.price}
                thumbnail={bun.image}
                handleClose={() => dispatch(removeBun())}
              />
            </div>
          )}
          <div className={`${styles.sum} mt-10`}>
              <span className={`text text_type_digits-medium mr-10`}>
                {totalPrice} <CurrencyIcon type="primary" />
              </span>
              <Button
                onClick={handleCreateOrder}
                type="primary"
                size="large"
                // disabled={orderRequestStart}
              >
                {orderRequestStart ? "Загрука..." : "Оформить заказ"}
              </Button>
            </div>
        </>
      ) : (
        <h2 className="text text_type_main-large">Добавьте ингредиенты</h2>
      )}
      {isOpen && orderDetails && (
        <Modal
          onClose={handleClose}
          {...(orderRequestFailed && { header: "Что-то пошло не так..." })}
        >
          <OrderDetails isOpen={isOpen} details={orderDetails} />
        </Modal>
      )}
    </section>
  );
};

export default BurgerConstructor;
