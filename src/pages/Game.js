import React, {useState, useEffect} from "react";
import {withRouter} from "react-router";
import {useHistory} from "react-router-dom";
import PropTypes from "prop-types";
import PlayersList from "../components/PlayersList"
import {getPlayersApi, savePlayersApi} from "../state/api";


Game.propTypes = {
  gamePin: PropTypes.func.isRequired
}

function Game(props) {
  const history = useHistory();
  const [players, setPlayers] = useState([]);
  
  useEffect(() => {
    (!props.gamePin) ? history.push("/") : setPlayers(getPlayersApi(props.gamePin));
  },[props.gamePin]);
  
  useEffect(() => {
    savePlayersApi(props.gamePin, players);
  },[players]);
  
  return (
      <PlayersList players={players} setPlayers={(newPlayers) => setPlayers(newPlayers)}/>
  );
}

export default withRouter(Game);
