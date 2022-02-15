import React, {useState, useEffect} from "react";
import {withRouter} from "react-router";
import {useHistory} from "react-router-dom";
import PropTypes from "prop-types";
import PlayersList from "../components/PlayersList"
import {getPlayersApi, savePlayersApi, updatePlayerApi, deletePlayerApi} from "../state/api";
import PlayerPoints from "../components/PlayerPionts";


Game.propTypes = {
  gamePin: PropTypes.string.isRequired
}

function Game(props) {
  const history = useHistory();
  const [players, setPlayers] = useState([]);
  const [activePlayer, setActivePlayer] = useState(null);
  
  useEffect(() => {
    (!props.gamePin) ? history.push("/") : setPlayers(getPlayersApi(props.gamePin));
  },[props.gamePin]);
  
  useEffect(() => {
    savePlayersApi(props.gamePin, players);
  },[players]);
  
  function editPlayer(player) {
    setPlayers(players.map(el => el.name === player.name ? player : el));
    updatePlayerApi(props.gamePin, player);
  }
  
  function deletePlayer(player) {
    // TODO CONFIRM MODAL
    setPlayers(players.filter( el => player.name !== el.name));
    setActivePlayer(null);
    deletePlayerApi(props.gamePin, player);
  }
  
  return (
    <>
      <PlayersList className="game-container"
         players={players}
         activePlayer={(player) => setActivePlayer(player)}
         setPlayers={(newPlayers) => setPlayers(newPlayers)}
      />
      {activePlayer &&
        <PlayerPoints className="points-container"
           player={activePlayer}
           deletePlayer={(player) => deletePlayer(player)}
           editPlayer={(player) => editPlayer(player)}
        />
      }
    </>
  );
}

export default withRouter(Game);
