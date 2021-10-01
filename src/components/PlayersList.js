import React, {useState} from "react";
import {withRouter} from "react-router";
import PropTypes from "prop-types";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import PlayerCard from "./PlayerCard";
import PlayerModal from  "../components/PlayerModal";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUserPlus} from "@fortawesome/free-solid-svg-icons";
import {Player} from "../model/player";
import "../styles/PlayerList.css";


PlayersList.propTypes = {
  players: PropTypes.array.isRequired,
  setPlayers: PropTypes.func.isRequired
}

function PlayersList(props) {
  
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShowModal = () => setShow(true);
  
  const handleSave = (player) => {
    const newPlayersList = [...props.players, new Player(player.name, player.color)];
    props.setPlayers(newPlayersList);
    setShow(false);
  };
  
  return (
    <>
      <Card bg="light" text="dark" border="dark" className="game-list-card">
        <Card.Body>
          <Card.Title className="mb-3">
            Players
            <Button size="sm" variant="outline-secondary" className="game-list-card__btn" onClick={handleShowModal}>
              <FontAwesomeIcon icon={faUserPlus}/>
            </Button>
          </Card.Title>
          <Card.Text className="players-list">
            {props.players.map( player => <PlayerCard key={player.name} player={player}/>)}
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
