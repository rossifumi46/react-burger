import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { modal, close_icon } from './styles.module.css';
import ModalOverlay from '../modal-overlay';

function Modal({ children, header, onClose, isOpen}) {
  useEffect(() => {
    document.addEventListener('keydown', onEscPressClose);
    return () => document.removeEventListener('keydown', onEscPressClose);
  }, []);

  const onEscPressClose = ({ key }) => {
    if (key === 'Escape') {
      onClose();
    }
  }

  return (
    <ModalOverlay onClick={onClose} isOpen={isOpen}>
      <div onClick={e => e.stopPropagation()} className={`${modal} p-10`}>
        <div className={`${close_icon}`}><CloseIcon onClick={onClose} type="primary"  /></div>
        {header && <h2 className={`${header} text text_type_main-large`}>{header}</h2>}
        {children}
      </div>
    </ModalOverlay>
  )
  
}

Modal.propTypes = {
  children: PropTypes.element.isRequired,
  header: PropTypes.string,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
}

export default Modal;