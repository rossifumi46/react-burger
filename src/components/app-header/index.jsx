import { BurgerIcon, ListIcon, ProfileIcon, Logo } from '@ya.praktikum/react-developer-burger-ui-components'
import { NavLink } from 'react-router-dom';
import { useRouteMatch } from 'react-router';
import { link, header, link_container } from './styles.module.css';

const getType = (is) => is ? "primary" : "secondary"; 

const AppHeader = () => {
  const isConstructor = !!useRouteMatch({ path: '/', exact: true});
  const isFeed = !!useRouteMatch('/feed');
  const isProfile = !!useRouteMatch('/profile');

  return (
    <header className={`p-4 ${header}`}>
        <div className={link_container}>
          <NavLink to="/" className={`p-5 ${link} secondary`} activeClassName="primary" exact={true}>
            <BurgerIcon type={getType(isConstructor)} />
            <span className="text text_type_main-default ml-2">Конструктор</span>
          </NavLink>
          <NavLink to="/lenta" className={`p-5 ml-2 ${link} secondary`} activeClassName="primary">
            <ListIcon type={getType(isFeed)} />
            <span className={`text text_type_main-default ml-2`}>Лента заказов</span>
          </NavLink>
        </div>
        <Logo />
        <NavLink to="/profile" className={`p-5 ${link} secondary`} activeClassName="primary">
          <ProfileIcon type={getType(isProfile)} />
          <span className={`text text_type_main-default ml-2`}>Личный кабинет</span>
        </NavLink>
    </header>
  )
};

export default AppHeader;