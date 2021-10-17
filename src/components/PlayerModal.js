import React, {useState} from "react";
import {withRouter} from "react-router";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import PropTypes from "prop-types";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import ColorPicker from "./ColorPicker";
import COLORS from "../model/colors";
import "../styles/PlayerModal.css"

// TODO form validation

PlayerModal.propTypes = {
  show: PropTypes.bool.isRequired,
  edit: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  player: PropTypes.object
}

function PlayerModal(props) {
  
  const [name, setName] = useState(props.player ? props.player.name : '');
  const [color, setColor] = useState(props.player ? props.player.color : '');
  
  function savePlayer() {
    props.onSave({name, color})
  }
  
  return (
    <Modal show={props.show} onHide={props.onClose} className="player-modal__container">
      <Modal.Header closeButton>
        <Modal.Title>{props.edit ? 'Edit' : 'Add new'} player</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <InputGroup className="mb-3 player-modal__player-name">
            <InputGroup.Text size="sm">Name</InputGroup.Text>
            <Form.Control onChange={() => setName(event.target.value)} value={name}/>
          </InputGroup>
          <div className="player-modal__color-picker">
            <ColorPicker color={color} onSelect={(selectedColor) => setColor(selectedColor)}></ColorPicker>
            { color && <div className="player-modal__preview" style={{
              'background-color': `${COLORS[color].color}`,
              'color': `${COLORS[color].fontColor}`
            }}>{color}</div>}
          </div>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.onClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={savePlayer}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default withRouter(PlayerModal);
