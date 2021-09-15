import { BurgerIcon, ListIcon, ProfileIcon, Logo } from '@ya.praktikum/react-developer-burger-ui-components'
import { button, header, secondary, button_container } from './styles.module.css';

const AppHeader = () => {
  return (
    <header className={`p-4 ${header}`}>
        <div className={button_container}>
          <button className={`p-5 ${button} `}>
            <BurgerIcon type="primary" />
            <span className="text text_type_main-default ml-2">Булки</span>
          </button>
          <button className={`p-5 ml-2 ${button}`}>
            <ListIcon type="secondary" />
            <span className={`text text_type_main-default ml-2 ${secondary}`}>Соусы</span>
          </button>
        </div>
        <Logo />
        <button className={`p-5 ${button}`}>
          <ProfileIcon type="secondary" />
          <span className={`text text_type_main-default ml-2 ${secondary}`}>Начинки</span>
        </button>
    </header>
  )
};

export default AppHeader;