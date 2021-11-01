import { modal_overlay } from "./styles.module.css";
import PropTypes from "prop-types";

function ModalOverlay({ onClick }) {
  return (
    <div
      className={`${modal_overlay}`}
      onClick={onClick}
    />
  );
}

ModalOverlay.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default ModalOverlay;
