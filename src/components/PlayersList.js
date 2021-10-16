import React, {useEffect, useState} from "react";
import {withRouter} from "react-router";
import PropTypes from "prop-types";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import PlayerCard from "./PlayerCard";
import PlayerModal from  "../components/PlayerModal";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUserPlus} from "@fortawesome/free-solid-svg-icons";
import {Player} from "../model/player";
import {usePrevious} from "../hooks/usePrevious";
import "../styles/PlayerList.css";


PlayersList.propTypes = {
  players: PropTypes.array.isRequired,
  setPlayers: PropTypes.func.isRequired
}

function PlayersList(props) {
  
  const [show, setShow] = useState(false);
  const [activePlayer, setActivePlayer] = useState(findActivePlayer(props.players));
  const handleClose = () => setShow(false);
  const handleShowModal = () => setShow(true);
  
  const previousActivePlayer = usePrevious(activePlayer);

  
  const handleSave = (player) => {
    const newPlayersList = [...props.players, new Player(player.name, player.color, false)];
    props.setPlayers(newPlayersList);
    setShow(false);
  };
  
  function findActivePlayer(players) {
    return players.find(player => player.isActive);
  }
  
  useEffect(() => {
    if (activePlayer) {
      activePlayer.setActive(true);
    }
    if (previousActivePlayer) {
      previousActivePlayer.setActive(false);
    }
  }, [activePlayer]);
  
  function togglePlayer(player) {
    if (activePlayer && player.name !== activePlayer.name || !activePlayer) {
      setActivePlayer(player);
    } else {
      setActivePlayer(null);
    }
  }
  
  return (
    <>
      <Card bg="light" text="dark" className="game-list-card">
        <Card.Body>
          <Card.Title className="mb-3">
            Players
            <Button size="sm" variant="outline-secondary" className="game-list-card__btn" onClick={handleShowModal}>
              <FontAwesomeIcon icon={faUserPlus}/>
            </Button>
          </Card.Title>
          <Card.Text className="players-list">
            {props.players.map( player => <PlayerCard key={player.name} player={player} togglePlayer={(e) => togglePlayer(player, e)}/>)}
            {props.players.length ? null :
              <FontAwesomeIcon style={{ width: '90px', height: '90px' }} icon={faUserPlus}/>
            }
          </Card.Text>
        </Card.Body>
      </Card>
      
      <PlayerModal show={show} onClose={handleClose} onSave={handleSave} edit={false}/>
    </>
  );
}

export default withRouter(PlayersList);
