import React, {useState} from "react";
import {withRouter} from "react-router";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";

import "../styles/PlayerModal.css"
import ModalWrapper from "./ModalWrapper";
import ColorPicker from "./ColorPicker";
import COLORS from "../model/colors";
import {IPlayer} from "../model/player";


// TODO form validation
interface IPlayerModalProps {
  show: boolean,
  edit: boolean,
  onClose: () => {},
  onSave: ( data: Partial<IPlayer>) => void,
  player: IPlayer
}

const PlayerModal: React.FC<IPlayerModalProps> = (props) => {

  const [ name, setName ] = useState(props.player ? props.player.name : '');
  const [ color, setColor ] = useState(props.player ? props.player.color : '');

  function savePlayer(): void {
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
          <InputGroup.Text>Name</InputGroup.Text>
          <Form.Control onChange={(event) => setName(event.target.value)} value={name}/>
          {color ?
              <InputGroup.Text style={{backgroundColor: `${COLORS[color].color}`,
                color: `${COLORS[color].fontColor}`, width: '100px'}}>{color}</InputGroup.Text>
              :
              <InputGroup.Text>Select color</InputGroup.Text>
          }
        </InputGroup>
        <div className="player-modal__color-picker">
          <ColorPicker color={color} onSelect={(selectedColor) => setColor(selectedColor)}/>
        </div>
      </Form>
    </ModalWrapper>
  );
}

export default withRouter(PlayerModal);
