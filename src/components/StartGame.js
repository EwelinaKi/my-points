import React from "react";
import "../styles/StartGame.css"
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { withRouter } from "react-router";
import PropTypes from "prop-types";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import {randomPin} from "../utils/randomGenerator";
import {Game} from "../model/game";
import {saveGame} from "../state/api";


StartGame.propTypes = {
  submit: PropTypes.func.isRequired
}

function StartGame(props) {
  const options ={
    newGame: {
      title: 'Create new game',
      pinInputLabel: 'NEW PIN',
      pinDisabled: true,
      passInputLabel: 'SET PASS',
      goBtnLabel: 'START',
      switchBtnLabel: 'Join existing',
      switchBtnFn: () => switchMode(false),
    },
    existingGame: {
      title: 'Join existing game',
      pinInputLabel: 'PIN',
      pinDisabled: false,
      passInputLabel: 'PASS',
      goBtnLabel: 'JOIN',
      switchBtnLabel: 'Create new',
      switchBtnFn: () => switchMode(true),
    }
  }
  const [mode,setMode] = React.useState(options.newGame);
  const [tempGamePin, setTempGamePin] = React.useState(randomPin());
  const [tempGamePass, setTempGamePass] = React.useState('');
  
  
  function switchMode(isNewGame) {
    setMode(isNewGame ? options.newGame : options.existingGame);
    setTempGamePin(isNewGame ? randomPin() : '');
  }
  
  function handleSubmit(event) {
    event.preventDefault();
    const newGame = new Game(tempGamePin);
    saveGame(newGame.getGame());
    props.submit(tempGamePin);
  }
  
  return (
    <Card bg="dark" text="light" border="info" className="start-game-card">
      <Card.Body>
        <Card.Title className="mb-3"> {mode.title} </Card.Title>
        <Card.Text>
          <Form onSubmit={handleSubmit}>
            <InputGroup className="mb-3">
              <InputGroup.Text className="start-game-card__label" size="sm" id="basic-addon3">{mode.pinInputLabel}</InputGroup.Text>
              <Form.Control
                  id="basic-url"
                  disabled={mode.pinDisabled}
                  onChange={() => setTempGamePin(event.target.value)}
                  aria-describedby="basic-addon3"
                  value={tempGamePin}/>
            </InputGroup>
          
            <InputGroup className="mb-3">
              <InputGroup.Text className="start-game-card__label" id="basic-addon3">{mode.passInputLabel}</InputGroup.Text>
              <Form.Control
                  id="basic-url"
                  aria-describedby="basic-addon3"
                  onChange={() => setTempGamePass(event.target.value)}
                  value={tempGamePass}/>
            </InputGroup>
          
            <div className="start-game-card__buttons">
              <Button className="start-game-card__button" variant="info" type="submit" disabled={!mode.pinDisabled}>{mode.goBtnLabel}</Button>
              <Button className="start-game-card__button" variant="outline-info" type="button" onClick={mode.switchBtnFn}>{mode.switchBtnLabel}</Button>
            </div>
          </Form>
        </Card.Text>
      </Card.Body>
    </Card>
  )
}

export default StartGame;
// export default withRouter(StartGame);
