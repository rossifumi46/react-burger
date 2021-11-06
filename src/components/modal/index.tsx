import { useCallback, useEffect } from "react";
import ReactDOM from "react-dom";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./styles.module.css";
import ModalOverlay from "../modal-overlay";

const modalRoot = document.getElementById("root") as HTMLElement;;

type TProps = {
  header: string;
  onClose: () => void;
}

const Modal: React.FC<TProps> = ({ children, header, onClose }) => {
  const onEscPressClose = useCallback(({ key }) => {
    if (key === "Escape") {
      onClose();
    }
  }, [onClose]);
  
  useEffect(() => {
    document.addEventListener("keydown", onEscPressClose);
    return () => document.removeEventListener("keydown", onEscPressClose);
  }, [onEscPressClose]);

  return ReactDOM.createPortal(
    <div className={styles.modal_wrapper}>
      <ModalOverlay onClick={onClose} />
      <div className={`${styles.modal} p-10`} onClick={e => e.stopPropagation()}>
        <div className={`${styles.close_icon}`}>
          <CloseIcon onClick={onClose} type="primary" />
        </div>
        {header && (
          <h2 className={`text text_type_main-large mt-3`}>{header}</h2>
        )}
        {children}
      </div>
    </div>,
    modalRoot
  );
}

export default Modal;
