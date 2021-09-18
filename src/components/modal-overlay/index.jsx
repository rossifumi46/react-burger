import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { modal_overlay, is_open } from './styles.module.css';

const modalRoot = document.getElementById('root');

function ModalOverlay({ children, isOpen, onClick }) {

  return ReactDOM.createPortal(
    (
      <div onClick={onClick} className={`${modal_overlay} ${isOpen ? is_open : ''}`}>
        {children}
      </div>
    ), 
    modalRoot,
  );
  
}

ModalOverlay.propTypes = {
  children: PropTypes.element.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
}

export default ModalOverlay;