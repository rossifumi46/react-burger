import { useEffect } from "react";
import { Orders } from "../../components/orders";
import { FeedInfo } from "../../components/feed-info";
import { connect, disconnect } from "../../services/actions";
import { useDispatch, useSelector } from "../../services/store";
import styles from "./styles.module.css";

export function FeedPage() {
  const dispatch = useDispatch();
  const { orders, total, totalToday } = useSelector(store => store.orders);

  useEffect(() => {
    dispatch(connect('wss://norma.nomoreparties.space/orders/all'));
    return () => {
      dispatch(disconnect());
    };
  }, [dispatch]);

  return (
    <main className={styles.main}>
      <h2 className="text text_type_main-large mb-5">Лента заказов</h2>
      <div className={styles.flex}>
        <Orders orders={orders} type="feed" />
        <FeedInfo orders={orders} total={total} totalToday={totalToday} />
      </div>
    </main>
  )
}