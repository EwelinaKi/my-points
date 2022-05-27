import React, {FormEvent} from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import {withRouter} from "react-router";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

import "../styles/StartGame.css"
import {randomPin} from "../utils/randomGenerator";
import {Game} from "../model/game";
import {saveGameApi} from "../state/api";


interface IStartGameProps  {
  submit: (pin: string) => void
}

interface IGame {
  title: string,
  pinInputLabel: string,
  pinDisabled: boolean,
  passInputLabel: string,
  goBtnLabel: string,
  switchBtnLabel: string,
  switchBtnFn: () => void,
}

const StartGame: React.FC<IStartGameProps> = (props) => {
  const options: {[key: string]: IGame} = {
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
  
  
  function switchMode(isNewGame: boolean): void {
    setMode(isNewGame ? options.newGame : options.existingGame);
    setTempGamePin(isNewGame ? randomPin() : '');
  }
  
  function handleSubmit(event: FormEvent): void {
    event.preventDefault();
    const newGame = new Game(tempGamePin);
    saveGameApi(newGame.getGame());
    props.submit(tempGamePin);
  }
  
  return (
    <Card bg="light" text="dark" className="start-game-card">
      <Card.Body>
        <Card.Title className="mb-3"> {mode.title} </Card.Title>
        <Card.Text>
          <Form onSubmit={e => handleSubmit(e)}>
            <InputGroup className="mb-3">
              <InputGroup.Text className="start-game-card__label">{mode.pinInputLabel}</InputGroup.Text>
              <Form.Control
                disabled={mode.pinDisabled}
                onChange={e => setTempGamePin(e.target.value)}
                value={tempGamePin}/>
            </InputGroup>
          
            <InputGroup className="mb-3">
              <InputGroup.Text className="start-game-card__label">{mode.passInputLabel}</InputGroup.Text>
              <Form.Control
                onChange={e => setTempGamePass(e.target.value)}
                disabled
                value={tempGamePass}/>
            </InputGroup>
          
            <div className="start-game-card__buttons">
              <Button className="start-game-card__button mr-3"
                variant="primary"
                type="submit"
                disabled={!mode.pinDisabled}>{mode.goBtnLabel}
              </Button>
              <Button className="start-game-card__button"
                variant="outline-primary"
                type="button"
                disabled
                onClick={mode.switchBtnFn}>{mode.switchBtnLabel}
              </Button>
            </div>
          </Form>
        </Card.Text>
      </Card.Body>
    </Card>
  )
}

export default withRouter(StartGame);
