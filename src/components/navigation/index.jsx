import styles from './styles.module.css';
import { NavLink } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { logoutRequest } from '../../services/store';
import PropTypes from "prop-types";

const tips = {
  profile: 'В этом разделе вы можете изменить свои персональные данные',
}

function Navigation({ location }) {
  const dispatch = useDispatch();
  const history = useHistory();

  const logout = async () => {
    await dispatch(logoutRequest());
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
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
          <button onClick={logout} className={[styles.button, 'text text_type_main-medium secondary'].join(' ')} size="large">Выход</button>
        </li>
      </ul>
      <span className={[styles.tip, 'text text_type_main-default secondary'].join(' ')}>{tips[location]}</span>
    </div>
  );
}

Navigation.propTypes = {
  location: PropTypes.string.isRequired,
}
export default Navigation;
