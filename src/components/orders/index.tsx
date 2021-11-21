import { TOrders } from "../../services/types/websocket";
import { OrderCard } from "../order-card";
import styles from "./styles.module.css";

type TProps = {
  orders: TOrders;
  type: 'feed' | 'history';
}

export function Orders({ orders, type }: TProps) {
  return (
    <div className={`${styles.orders} pr-2`}>
      {orders.map(order => <OrderCard order={order} type={type} />)}
    </div>
  )
}