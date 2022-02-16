import React from "react";
import {withRouter} from "react-router";
import {useHistory} from "react-router-dom";

import GamesList from "../components/GamesList"
import StartGame from "../components/StartGame";


interface IStartProps {
  setPin: (pin: string) => void
}

const Start: React.FC<IStartProps> = (props) => {
  const history = useHistory();
  
  function handleSubmit(gamePin) {
    props.setPin(gamePin);
    history.push(`/game/${gamePin}`);
  }
  
  return (
      <div>
        <StartGame setPin={props.setPin} submit={handleSubmit}/>
        <GamesList setPin={props.setPin} submit={handleSubmit}/>
      </div>
  )
}

export default withRouter(Start);
