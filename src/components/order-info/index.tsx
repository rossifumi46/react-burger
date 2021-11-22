import styles from './styles.module.css';
import { Icon, statuses, TOrder } from '../order-card';
import { useSelector } from '../../services/store';
import { useCallback, useMemo } from 'react';
import { TIngredient } from '../../types';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

type TProps = {
  order: TOrder;
}

type TIngredienets = Record<string, (TIngredient & { count: number })>;

export function OrderInfo({ order }: TProps) {
  const { ingredients } = useSelector(store => store.ingredients);

  const add = useCallback((accumulator: number, id: string) => 
    accumulator + (ingredients.find(ingredient => ingredient._id === id)?.price || 0), [ingredients]);
  const price = useMemo(() => order.ingredients.reduce(add, 0), [add, order.ingredients]);

  const orderIngredients = useMemo(() => {
    let orderIngredients: TIngredienets = {};
    order.ingredients.forEach(id => {
      const find = ingredients.find(ingredient => ingredient._id === id);
      if (find) {
        if (orderIngredients[id]) {
          orderIngredients[id].count += 1;
        } else {
          orderIngredients[id] = ({...find, count: 1});
        }
      }
    });
    return Object.values(orderIngredients);
  }, [ingredients, order]);

  return (
    <div>
      <span className="text text_type_digits-default">#{order.number}</span>
      <h3 className="text text_type_main-medium mt-10">{order.name}</h3>
      <span className="text text_type_main-small mt-3">{statuses[order.status]}</span>
      <h3 className="text text_type_main-medium mt-15">Состав:</h3>
      <div className={`${styles.ingredients} mt-6 pr-6`}>
        {orderIngredients.map(ingredient => (
          <div className={`${styles.row} mb-4`} key={ingredient._id} >
            <div className={styles.flex}>
              <Icon image={ingredient.image_mobile || ''} />
              <span className="text text_type_main-small ml-4">{ingredient.name}</span>
            </div>
            <div className={`${styles.flex} ml-4`}><span className="text text_type_digits-default mr-2">{`${ingredient.count} x ${ingredient.price}`}</span><CurrencyIcon type="primary" /></div>
          </div>
        ))}
      </div>
      <div className={`${styles.footer} mt-10 ${styles.row}`}>
        <span className="text text_type_main-small secondary">{new Date(order.createdAt).toLocaleDateString()}</span>
        <div className={`${styles.flex} ml-4`}><span className="text text_type_digits-default mr-2">{price}</span><CurrencyIcon type="primary" /></div>
      </div>
    </div>
  )
}