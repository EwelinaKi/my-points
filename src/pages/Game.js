import React from "react";
import {useLocalStorage} from "../hooks/useLocalStorage"
import { withRouter } from "react-router";
import {useHistory} from "react-router-dom";

function Game() {
  const history = useHistory();
  const [gamePin, setGaamePin] = useLocalStorage('pin', '')
  
  React.useEffect(() => {
    if (!gamePin) {
      history.push("/");
    }
  })
  
  
  return (
      <div>GAME</div>
  
  );
}

export default withRouter(Game);
