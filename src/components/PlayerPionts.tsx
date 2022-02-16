import React, {useEffect, useState} from "react";
import {withRouter} from "react-router";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit, faTrash} from "@fortawesome/free-solid-svg-icons";

import "../styles/PlayerPoints.css";
import "../styles/PlayerCard.css"
import COLORS from "../model/colors";
import {Player} from "../model/player";


interface IPlayerPoints {
  player: Player,
  editPlayer: (player: Player) => void,
  deletePlayer: (player: Player) => void
}

const PlayerPoints: React.FC<IPlayerPoints> = (props) => {
  const points = [-50, -25, -10, -5, -3, -1, 1, 3, 5, 10, 25, 50];
  const [totalPoints, setTotalPoints] = useState(0);
  const [color, setColor] = useState('transparent');
  const [bcgColor, setBcgColor] = useState('transparent');
  
  useEffect(() => {
    setTotalPoints(0);
    setColor(COLORS[props.player.color].color);
    setBcgColor(COLORS[props.player.color].fontColor);
  }, [props.player])
  
  function setPoints(points) {
    props.player.addPoints(points);
    props.editPlayer(props.player);
    setTotalPoints(totalPoints + points);
  }
  
  return (
    <Card bg="light" text="dark" className="player-points-card">
      <Card.Body>
        <Card.Title className="mb-3">
          <div className="mb-3 player-points-title">
            <p>{props.player.name}</p>
            <div className="player-points-title__buttons">
              <span className=" m-1 player-points-card__total" style={{'border': `3px groove ${color}`}}>
                {totalPoints > 0 && '+'}{totalPoints}</span>
              <Button size="sm" className="m-1" variant="outline-secondary">
                <FontAwesomeIcon icon={faEdit}/>
              </Button>
              <Button size="sm" className="m-1" onClick={() => props.deletePlayer(props.player)} variant="outline-secondary">
                <FontAwesomeIcon icon={faTrash}/>
              </Button>
            </div>
          </div>
        </Card.Title>
        <Card.Text className="player-points-card__text">
          {points.map( el =>
            <Button
              type="button"
              className="player-points-card__points-box"
              key={el}
              style={{backgroundColor: `${color}`, color: `${bcgColor}`}}
              onClick={() => setPoints(el)}>{el > 0 && '+'}{el}
            </Button>
          )}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default withRouter(PlayerPoints);
