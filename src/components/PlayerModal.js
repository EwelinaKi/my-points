import React, {useState} from "react";
import {withRouter} from "react-router";
import PropTypes from "prop-types";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import ModalWrapper from "./ModalWrapper";
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
    <ModalWrapper
      show={props.show}
      title={props.edit ? 'Edit' : 'Add new'}
      onClose={props.onClose}
      primaryLabel="Save"
      secondaryLabel="Cancel"
      onPrimaryClick={() => savePlayer()}
      onSecondaryClick={props.onClose}
      >
      <Form>
        <InputGroup className="mb-3 player-modal__player-name">
          <InputGroup.Text size="sm">Name</InputGroup.Text>
          <Form.Control onChange={() => setName(event.target.value)} value={name}/>
        </InputGroup>
        <div className="player-modal__color-picker">
          <ColorPicker color={color} onSelect={(selectedColor) => setColor(selectedColor)}/>
          {color && <div className="player-modal__preview" style={{
            backgroundColor: `${COLORS[color].color}`,
            color: `${COLORS[color].fontColor}`
          }}>{color}</div>}
        </div>
      </Form>
    </ModalWrapper>
  );
}

export default withRouter(PlayerModal);
