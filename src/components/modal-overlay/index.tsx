import styles from "./styles.module.css";

type TProps = {
  onClick: () => void;
}

const ModalOverlay: React.FC<TProps> = ({ onClick }) => {
  return (
    <div
      className={`${styles.modal_overlay}`}
      onClick={onClick}
    />
  );
}

export default ModalOverlay;
