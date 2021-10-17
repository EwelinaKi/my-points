import React from "react";
import {withRouter} from "react-router";
import "../styles/PlayerCard.css"
import PropTypes from "prop-types";
import COLORS from "../model/colors";
import {faChessPawn} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";


PlayerCard.propTypes = {
  player: PropTypes.object.isRequired,
  togglePlayer: PropTypes.func.isRequired
}

function PlayerCard(props) {
  
  const color = COLORS[props.player.color].color;
  const fontColor = COLORS[props.player.color].fontColor;
  
  return (
     <div
         className={`player-card__frame player-card__frame-outer ${props.player.isActive ? 'player-card__frame-outer--marked' : ''}`}
         onClick={() => props.togglePlayer(!props.player.isActive)}
         style={{ 'background-color': `${color}`}}>
        <div className="player-card__frame player-card__frame-inner">
          {props.player.isActive && <FontAwesomeIcon fill={color} size="xl" color="black" icon={faChessPawn} className="player-card__pawn"/>}
          <div
            className="player-card__title"
            style={{'backgroundColor': `${color}`, 'color': `${fontColor}`}}>
            <strong>{props.player.name}</strong>
          </div>
          <div className="player-card__points" >
            <span>{props.player.points}</span>
          </div>
        </div>
    </div>
  );
}

export default withRouter(PlayerCard);
