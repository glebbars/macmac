import React from "react";
import PropTypes from "prop-types";

const Modal = ({
  header,
  closeButton,
  text,
  actions,
  headerBg,
  mainBg,
  closeModal,
}) => {
  return (
    <div
      onClick={(e) =>
        e.target.classList.contains("dark-screen-container")
          ? closeModal()
          : null
      }
      className="dark-screen-container"
    >
      <div style={{ backgroundColor: mainBg }} className="modal">
        <div
          style={{ backgroundColor: headerBg }}
          className="modal__header-section"
        >
          <h4 className="modal__header-section-text">{header}</h4>
          {closeButton && (
            <div onClick={closeModal} className="modal__cross"></div>
          )}
        </div>
        <div className="modal-main-part">
          <p className="modal__main-part-text">{text}</p>
          <div className="modal__main-part-btns">{actions}</div>
        </div>
      </div>
    </div>
  );
};

Modal.propTypes = {
  header: PropTypes.string,
  closeButton: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired,
  actions: PropTypes.node.isRequired,
  headerBg: PropTypes.string,
  mainBg: PropTypes.string,
  closeModal: PropTypes.func.isRequired,
};

Modal.defaultProps = {
  header: "Want to buy thi item?))",
  headerBg: "white",
  mainBg: "white",
};

export default Modal;
