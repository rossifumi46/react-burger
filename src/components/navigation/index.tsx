import React from 'react';
import styles from './styles.module.css';
import { NavLink } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { logoutRequest } from '../../services/slices/authSlice';

const tips: Record<string, string> = {
  profile: 'В этом разделе вы можете изменить свои персональные данные',
  'order-history': 'В этом разделе вы можете просмотреть свою историю заказов',
}

type TProps = {
  location: string;
}

const Navigation: React.FC<TProps> = ({ location }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const logout = async () => {
    await dispatch(logoutRequest());
    history.replace('/login');
  };

  return (
    <div className={[styles.nav, 'mr-15'].join(' ')}>
      <ul className="text text_type_main-medium mb-20">
        <li className={styles.item}>
          <NavLink to="/profile" className="secondary" activeClassName="primary" exact>Профиль</NavLink>
        </li>
        <li className={styles.item}>
          <NavLink to="/profile/orders" className="secondary" activeClassName="primary">История заказов</NavLink>
        </li>
        <li className={styles.item}>
          <button onClick={logout} className={[styles.button, 'text text_type_main-medium secondary'].join(' ')}>Выход</button>
        </li>
      </ul>
      <span className={[styles.tip, 'text text_type_main-default secondary'].join(' ')}>{tips[location]}</span>
    </div>
  );
}

export default Navigation;
