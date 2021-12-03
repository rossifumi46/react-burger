import { useEffect } from 'react';
import { useParams } from 'react-router';
import styles from './styles.module.css';
import { OrderInfo } from '../../components/order-info';
import { connect, disconnect } from '../../services/actions';
import { useDispatch, useSelector } from '../../services/store';
import { TParams } from '../../types';

type TProps = {
  type: 'history' | 'feed',
}

export function OrderInfoPage({ type }: TProps) {
  const dispatch = useDispatch();
  let { id } = useParams<TParams>();
  const { orders } = useSelector(store => store.orders);
  const { accessToken } = useSelector(store => store.auth);

  useEffect(() => {
    dispatch(connect(`wss://norma.nomoreparties.space/orders${type === 'feed' ? '/all' : `?token=${accessToken}`}`));
    return () => {
      dispatch(disconnect());
    };
  }, [dispatch, accessToken, type]);

  const order = orders.find(({ number }) => number === +id)
  if (!order) return null;

  return (
    <main className={[styles.order, "main mt-30"].join(" ")}>
      <OrderInfo order={order} />
    </main>
  )
}