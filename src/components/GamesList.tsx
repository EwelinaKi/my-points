import React from "react";
import { withRouter } from "react-router";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignInAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons'

import "../styles/GameList.css"
import {getGames, deleteGameApi} from "../state/api"


interface IGameListProps {
  submit: (arg: string) => void;
}

const GamesList: React.FC<IGameListProps> = (props) => {

  const [games, setGames] = React.useState(getGames() || null);
  
  function deleteGame(pin: string): void {
    deleteGameApi(pin);
    setGames(getGames());
  }
  
  function redirect(pin: string): void {
    props.submit(pin);
  }
  
  return (
      <Card bg="light" text="dark" className="game-list-card">
      <Card.Body>
        <Card.Title className="mb-3">{games && Object.keys(games).length ? "Recent games" : "No recent games"}</Card.Title>
        <Card.Text>
          { games && Object.keys(games).map(key =>
             <Card bg="light" text="dark" className="mb-2" key={key}>
               <Card.Body>
                 <Card.Title className="game-list-card__header">
                   <p>{key}</p>
                   <div>
                   <Button size="sm" variant="outline-primary" className="game-list-card__btn" onClick={() => redirect(key)}>
                     <FontAwesomeIcon icon={faSignInAlt} />
                   </Button>
                   <Button size="sm" variant="outline-danger" className="game-list-card__btn" onClick={() => deleteGame(key)}>
                     <FontAwesomeIcon icon={faTrashAlt} />
                   </Button>
                   </div>
                 </Card.Title>
                 <Card.Text   className="game-list-card__info">
                  Players: {games[key].players.length}
                 </Card.Text>
               </Card.Body>
             </Card>
            )
          }
        </Card.Text>
      </Card.Body>
    </Card>
  )
}

export default withRouter(GamesList);
