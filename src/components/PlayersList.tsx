import React, {useEffect, useState} from "react";
import {withRouter} from "react-router";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import PlayerCard from "./PlayerCard";
import PlayerModal from "./PlayerModal";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUserPlus} from "@fortawesome/free-solid-svg-icons";

import "../styles/PlayerList.css";
import {Player} from "../model/player";


interface IPlayersListProps {
  players: Player[],
  setPlayers: (players: Player[]) => void,
  activePlayer: (player: Player | null) => void
}

const PlayersList: React.FC<IPlayersListProps> = (props) => {
  
  const [show, setShow] = useState(false);
  const [activePlayer, setActivePlayer] = useState(findActivePlayer(props.players));
  const handleClose = () => setShow(false);
  const handleShowModal = () => setShow(true);
  
  // const previousActivePlayer = usePrevious(activePlayer); /
  const previousActivePlayer = activePlayer;

  
  const handleSave = (player: Player) => {
    const newPlayersList = [...props.players, new Player(player.name, player.color)];
    props.setPlayers(newPlayersList);
    setShow(false);
  };
  
  function findActivePlayer(players: Player[]): Player | null{
    return players.find(player => player.isActive) || null;
  }
  
  useEffect(() => {
    if (activePlayer) {
      activePlayer.setActive(true);
    }
    if (previousActivePlayer) {
      previousActivePlayer.setActive(false);
    }
    props.activePlayer(activePlayer);
  }, [activePlayer]);
  
  function togglePlayer(player: Player): void {
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
          <div className="players-list" >
            {props.players.map( player => <PlayerCard key={player.name} player={player} togglePlayer={() => togglePlayer(player)}/>)}
            {props.players.length ? null :
              <FontAwesomeIcon style={{ width: '90px', height: '90px' }} icon={faUserPlus}/>
            }
          </div>
        </Card.Body>
      </Card>
      
      <PlayerModal show={show} onClose={handleClose} onSave={handleSave} edit={false}/>
    </>
  );
}

export default withRouter(PlayersList);
