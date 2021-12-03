import styles from './styles.module.css';
import Navigation from '../../components/navigation';
import { Orders } from '../../components/orders';
import { useDispatch, useSelector } from '../../services/store';
import { useEffect } from 'react';
import { connect, disconnect } from '../../services/actions';

export function OrderHistoryPage() {
  const dispatch = useDispatch();
  const { orders } = useSelector(store => store.orders);
  const { accessToken } = useSelector(store => store.auth);

  useEffect(() => {
    dispatch(connect(`wss://norma.nomoreparties.space/orders?token=${accessToken}`));
    return () => {
      dispatch(disconnect());
    };
  }, [dispatch, accessToken]);

  return (
    <main className={[styles.history, "main mt-30"].join(" ")}>
      <Navigation location="order-history" />
      <Orders orders={orders} type="history" />
    </main>
  )
}