import React from 'react';
import PropTypes from 'prop-types';
import { Button, ConstructorElement, CurrencyIcon, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { constructor, item, sum } from './styles.module.css';

const BurgerConstructor = ({ data }) => {
  const [current, setCurrent] = React.useState('one')

  return (
    <section className={`${constructor} pt-25 pl-4`}>
      <div className={`${item}`}>
        <DragIcon className="mr-2" />
        <ConstructorElement
          type="top"
          isLocked={true}
          text={data[0].name}
          price={data[0].price}
          thumbnail={data[0].image}
        />
      </div>
      <div className={`${item} mt-4`}>
        <DragIcon className="mr-2" />
        <ConstructorElement
          text={data[1].name}
          price={data[1].price}
          thumbnail={data[1].image}
        />
      </div>
      <div className={`${item} mt-4`}>
        <DragIcon className="mr-2" />
        <ConstructorElement
          type="bottom"
          isLocked={true}
          text={data[0].name}
          price={data[0].price}
          thumbnail={data[0].image}
        />
      </div>
      <div className={`${sum} mt-10`}>
        <span className={`text text_type_digits-medium mr-10`}>610 <CurrencyIcon /></span>
        <Button type="primary" size="large">Оформить заказ</Button>
      </div>
    </section>
  )
}

const dataPropTypes = PropTypes.shape({
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  price: PropTypes.string.number,
});

BurgerConstructor.propTypes = {
  data: PropTypes.arrayOf(dataPropTypes.isRequired).isRequired,
}

export default BurgerConstructor;