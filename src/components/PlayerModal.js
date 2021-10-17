import React, {useState} from "react";
import {withRouter} from "react-router";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import PropTypes from "prop-types";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";

// TODO form validation
// TODO colors select


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
    <Modal show={props.show} onHide={props.onClose}>
      <Modal.Header closeButton>
        <Modal.Title>{props.edit ? 'Edit' : 'Add new'} player</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <InputGroup className="mb-3">
            <InputGroup.Text className="start-game-card__label" size="sm" id="basic-addon3">Name</InputGroup.Text>
            <Form.Control
                id="basic-url"
                onChange={() => setName(event.target.value)}
                aria-describedby="basic-addon3"
                value={name}
                />
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroup.Text className="start-game-card__label" id="basic-addon3">Color</InputGroup.Text>
            <Form.Control
                id="basic-url"
                aria-describedby="basic-addon3"
                onChange={() => setColor(event.target.value)}
                value={color}
                />
          </InputGroup>
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
