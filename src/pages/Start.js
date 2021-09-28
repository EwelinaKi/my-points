import PropTypes from "prop-types";
import React from "react";
import GamesList from "../components/GamesList"
import {withRouter} from "react-router";
import {useHistory} from "react-router-dom";
import StartGame from "../components/StartGame";


Start.propTypes = {
  setPin: PropTypes.func.isRequired
}

function Start(props) {
  const history = useHistory();
  
  function handleSubmit(pin) {
    props.setPin(pin);
  }
  
  return (
      <div>
        <StartGame setPin={props.setPin} submit={handleSubmit}/>
        <GamesList setPin={props.setPin} submit={handleSubmit}/>
      </div>
  )
}

export default Start;
// export default withRouter(Start);
