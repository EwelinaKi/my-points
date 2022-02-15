import React, {} from "react";
import {withRouter} from "react-router";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import PropTypes from "prop-types";
import "../styles/PlayerModal.css"

ModalWrapper.propTypes = {
  show: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  primaryLabel: PropTypes.string.isRequired,
  onPrimaryClick: PropTypes.func.isRequired,
  secondaryLabel: PropTypes.string,
  onSecondaryClick: PropTypes.func,
  children: PropTypes.element,
}

function ModalWrapper(props) {

  console.log(props);

  const {show, title, onClose, primaryLabel, onPrimaryClick, secondaryLabel, onSecondaryClick, children} = props

  return (
    <Modal show={show} onHide={onClose} className="player-modal__container">
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {children}
      </Modal.Body>
      <Modal.Footer>
        {secondaryLabel && <Button variant="secondary" onClick={onSecondaryClick || onClose}>
          {secondaryLabel}
        </Button>}
        <Button variant="primary" onClick={onPrimaryClick}>
          {primaryLabel}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default withRouter(ModalWrapper);
