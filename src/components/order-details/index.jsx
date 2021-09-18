import { container } from './styles.module.css';
import PropTypes from 'prop-types';
import { CheckMarkIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../modal';

function OrderDetails({ isOpen, onClose }) {

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className={`${container} pt-30 pb-30`}>
        <h2 className="text text_type_digits-large ">034536</h2>
        <span className="text text_type_main-medium mt-8 mb-15">идентификатор заказа</span>
        <CheckMarkIcon />
        <span className="text text_type_main-default mt-15">Ваш заказ начали готовить</span>
        <span className="text text_type_main-default text_color_inactive mt-2">Дождитесь готовности на орбитальной станции</span>
      </div>
    </Modal>
  );
  
}

OrderDetails.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
}

export default OrderDetails;