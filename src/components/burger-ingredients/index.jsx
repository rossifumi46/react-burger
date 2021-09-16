import React from 'react';
import PropTypes from 'prop-types';
import { CurrencyIcon, Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { grid, info, image, tabs, card, list, ingredients } from './styles.module.css';
import { dataPropTypes } from '../types';

const BurgerIngredients = ({ data }) => {
  const [current, setCurrent] = React.useState('one')

  return (
    <section className={`${ingredients}`}>
      <h2 className={`text text_type_main-large`}>Соберите бургер</h2>
      <div className={`${tabs}`}>
        <Tab value="one" active={current === 'one'} onClick={setCurrent}>
          Булки
        </Tab>
        <Tab value="two" active={current === 'two'} onClick={setCurrent}>
          Соусы
        </Tab>
        <Tab value="three" active={current === 'three'} onClick={setCurrent}>
          Научинки
        </Tab>
      </div>
      <div className={`${list}`}>
        <h3 className="text text_type_main-medium mt-10">Булки</h3>
        <div className={`${grid} mt-6 ml-4 mr-4`}>
          {data.filter(item => item.type === 'bun').map(item => (
            <div className={`${card}`} key={item._id}>
              <img alt="ingredient" src={item.image} className={`${image} ml-4`}/>
              <span className={`mt-1 ${info} text text_type_digits-default`}>{item.price} <CurrencyIcon type="primary" /></span>
              <span className={`mt-1 ${info} text text_type_main-default`}>{item.name}</span>
            </div>
          ))}
        </div>
        <h3 className="text text_type_main-medium mt-10">Соусы</h3>
        <div className={`${grid} mt-6 ml-4 mr-4`}>
          {data.filter(item => item.type === 'sauce').map(item => (
            <div className={`${card}`} key={item._id}>
              <img alt="ingredient" src={item.image} className={`${image} ml-4`}/>
              <span className={`mt-1 ${info} text text_type_digits-default`}>{item.price} <CurrencyIcon type="primary" /></span>
              <span className={`mt-1 ${info} text text_type_main-default`}>{item.name}</span>
            </div>
          ))}
        </div>
        <h3 className="text text_type_main-medium mt-10">Начинка</h3>
        <div className={`${grid} mt-6 ml-4 mr-4`}>
          {data.filter(item => item.type === 'main').map(item => (
            <div className={`${card}`} key={item._id}>
              <img alt="ingredient" src={item.image} className={`${image} ml-4`}/>
              <span className={`mt-1 ${info} text text_type_digits-default`}>{item.price} <CurrencyIcon type="primary" /></span>
              <span className={`mt-1 ${info} text text_type_main-default`}>{item.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}



BurgerIngredients.propTypes = {
  data: PropTypes.arrayOf(dataPropTypes.isRequired).isRequired,
}

export default BurgerIngredients;