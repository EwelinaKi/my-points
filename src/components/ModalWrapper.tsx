import React, {} from "react";
import {withRouter} from "react-router";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

import "../styles/PlayerModal.css"


interface IModalWrapperProps {
  show: boolean,
  title: string,
  onClose: () => void,
  primaryLabel: string,
  onPrimaryClick: () => void,
  secondaryLabel: string,
  onSecondaryClick: () => void,
  children: HTMLElement,
}

const ModalWrapper: React.FC<IModalWrapperProps> = (props) => {

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
