import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useCallback, useMemo } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "../../services/store";
import styles from "./styles.module.css";
import { useLocation } from "react-router";


export type TOrder = {
  _id: string;
  status: 'created' | 'pending' | 'done';
  number: number;
  createdAt: string;
  updatedAt: string;
  ingredients: string[];
  name: string;
}

type TProps = {
  order: TOrder;
  type: 'feed' | 'history';
}

export const statuses: Record<string, string> = {
  'done': 'Выполнен',
  'pending': 'Готовиться',
  'created': 'Создан'
}

export const Icon = 
  ({ image }: { image: string}) => <div className={styles.preview}><img src={image} alt="ingredient" /></div>;

export function OrderCard({ order, type }: TProps) {
  const location = useLocation();

  const { ingredients } = useSelector(store => store.ingredients);

  const add = useCallback((accumulator: number, id: string) => 
    accumulator + (ingredients.find(ingredient => ingredient._id === id)?.price || 0), [ingredients]);

  const price = useMemo(() => order.ingredients.reduce(add, 0), [add, order.ingredients]);

  const orderIngredients = useMemo(() => order.ingredients.map(id => (ingredients.find(ingredient => ingredient._id === id)?.image_mobile)), [ingredients, order.ingredients]);

  return (
    <div className={`${styles.card} p-6 mb-4 ${type === 'feed' ? styles.feed : styles.history}`}>
      <Link
        to={{
          pathname: `/${type === 'feed' ? 'feed' : 'profile/orders'}/${order.number}`,
          // This is the trick! This link sets
          // the `order` in location state.
          state: { order: location },
        }}
      >
        <div className={`${styles.header} mt-6 mb-6`}>
          <span className="text text_type_digits-default">#{order.number}</span>
          <span className="text text_type_main-small secondary">{new Date(order.createdAt).toLocaleDateString()}</span>
        </div>
        <div className="mt-6"><span className="text text_type_main-medium">{order.name}</span></div>
        {type === 'history' && <div className="mt-2"><span className="text text_type_main-small">{statuses[order.status]}</span></div>}
        <div className={`${styles.footer} mt-6`}>
          <div className={styles.previews}>
            {orderIngredients.map(image => <Icon image={image || ''} />)}
          </div>
          <span className="text text_type_digits-default">{price}<CurrencyIcon type="primary"/></span>
        </div>
      </Link>
    </div>
  )
}