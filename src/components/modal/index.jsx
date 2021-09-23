import { useEffect } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { modal, close_icon, modal_wrapper } from "./styles.module.css";
import ModalOverlay from "../modal-overlay";

const modalRoot = document.getElementById("root");

function Modal({ children, header, onClose, isOpen }) {
  useEffect(() => {
    document.addEventListener("keydown", onEscPressClose);
    return () => document.removeEventListener("keydown", onEscPressClose);
  }, []);

  const onEscPressClose = ({ key }) => {
    if (key === "Escape") {
      onClose();
    }
  };

  return ReactDOM.createPortal(
    <div className={modal_wrapper} onClick={onClose}>
      <ModalOverlay />
      <div className={`${modal} p-10`} onClick={e => e.stopPropagation()}>
        <div className={`${close_icon}`}>
          <CloseIcon onClick={onClose} type="primary" />
        </div>
        {header && (
          <h2 className={`${header} text text_type_main-large`}>{header}</h2>
        )}
        {children}
      </div>
    </div>,
    modalRoot
  );
}

Modal.propTypes = {
  children: PropTypes.element.isRequired,
  header: PropTypes.string,
  onClose: PropTypes.func.isRequired,
};

export default Modal;
