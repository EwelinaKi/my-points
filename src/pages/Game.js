import React from "react";
import { withRouter } from "react-router";
import {useHistory} from "react-router-dom";
import PropTypes from "prop-types";


Game.propTypes = {
  gamePin: PropTypes.func.isRequired
}

function Game(props) {
  const history = useHistory();
  
  React.useEffect(() => {
    if (!props.gamePin) {
      history.push("/");
    }

  },[props.gamePin]);
  
  
  return (
      <div>GAME</div>
  );
}

export default withRouter(Game);
