
import { useMemo } from 'react';
import styles from './styles.module.css';
import { TOrders } from '../../services/types/websocket';

type TProps = {
  orders: TOrders;
  total: number;
  totalToday: number;
}

export function FeedInfo({ orders, total, totalToday }: TProps) {
  const done = useMemo(
    () => orders.filter(order => order.status === 'done'),
    [orders]);
  const pending = useMemo(
    () => orders.filter(order => order.status === 'pending'),
    [orders]);

  return (
    <div className="ml-15">
      <div className={styles.orders}>
        <div className="mr-9">
          <h3 className="text text_type_main-medium mb-4">Готовы:</h3>
          <div className={styles.grid}>{done.map(order => <span className="text text_type_digits-default success" key={order.number}>{order.number}</span>)}</div>
        </div>
        <div>
          <h3 className="text text_type_main-medium mb-6">В работе:</h3>
          <div className={styles.grid}>{pending.map(order => <span className="text text_type_digits-default" key={order.number}>{order.number}</span>)}</div>
        </div>
      </div>
      <div>
        <h3 className="text text_type_main-medium mt-15">Выполнено за все время:</h3>
        <span className="text text_type_digits-large">{total}</span>
      </div>
      <div>
        <h3 className="text text_type_main-medium mt-15">Выполнено за сегодня:</h3>
        <span className="text text_type_digits-large">{totalToday}</span>
      </div>
    </div>
  )
}