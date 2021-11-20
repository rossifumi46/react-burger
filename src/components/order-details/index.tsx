import React from 'react';
import styles from "./styles.module.css";
import { CheckMarkIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { TOrderDetails } from '../../types';

type TProps = {
  details: TOrderDetails;
  isOpen: boolean;
}

const OrderDetails: React.FC<TProps> = ({ details }) => {
  return (
    <div className={`${styles.container} pt-30 pb-30`}>
      <h2 className="text text_type_digits-large ">{details.order.number}</h2>
      <span className="text text_type_main-medium mt-8 mb-15">
        идентификатор заказа
      </span>
      <CheckMarkIcon type="primary" />
      <span className="text text_type_main-default mt-15">
        Ваш заказ начали готовить
      </span>
      <span className="text text_type_main-default text_color_inactive mt-2">
        Дождитесь готовности на орбитальной станции
      </span>
    </div>
  );
}

export default OrderDetails;
