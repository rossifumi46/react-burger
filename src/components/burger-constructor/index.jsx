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

const BurgerConstructor = ({ data }) => {
  const [isOpen, setOpen] = useState(false);

  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);
  return (
    <section className={`${constructor} pt-25 pl-4`}>
      <div className={list}>
        <div className={`${item}`}>
          <DragIcon className="mr-2" />
          <ConstructorElement
            type="top"
            isLocked={true}
            text={data[0].name}
            price={data[0].price}
            thumbnail={data[0].image}
          />
        </div>
        <div className={`${item} mt-4`}>
          <DragIcon className="mr-2" />
          <ConstructorElement
            text={data[1].name}
            price={data[1].price}
            thumbnail={data[1].image}
          />
        </div>
        <div className={`${item} mt-4`}>
          <DragIcon className="mr-2" />
          <ConstructorElement
            text={data[2].name}
            price={data[2].price}
            thumbnail={data[2].image}
          />
        </div>
        <div className={`${item} mt-4`}>
          <DragIcon className="mr-2" />
          <ConstructorElement
            text={data[3].name}
            price={data[3].price}
            thumbnail={data[3].image}
          />
        </div>
        <div className={`${item} mt-4`}>
          <DragIcon className="mr-2" />
          <ConstructorElement
            text={data[4].name}
            price={data[4].price}
            thumbnail={data[4].image}
          />
        </div>
        <div className={`${item} mt-4`}>
          <DragIcon className="mr-2" />
          <ConstructorElement
            text={data[1].name}
            price={data[1].price}
            thumbnail={data[1].image}
          />
        </div>
        <div className={`${item} mt-4`}>
          <DragIcon className="mr-2" />
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={data[0].name}
            price={data[0].price}
            thumbnail={data[0].image}
          />
        </div>
      </div>
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

BurgerConstructor.propTypes = {
  data: PropTypes.arrayOf(ingredientPropTypes.isRequired).isRequired,
};

export default BurgerConstructor;
