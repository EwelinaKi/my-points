import React from "react";
import {withRouter} from "react-router";
import "../styles/PlayerCard.css"
import PropTypes from "prop-types";
import COLORS from "../model/colors";


PlayerCard.propTypes = {
  player: PropTypes.object.isRequired,
}

function PlayerCard(props) {
  
  return (
     <div className="player-card__frame player-card__frame-outer" style={{ 'background-color': `${props.player.color}`}}>
        <div className="player-card__frame player-card__frame-inner">
          <div className="player-card__title" style={{ 'backgroundColor': `${props.player.color}`, 'color': `${COLORS[props.player.color].fontColor}`}}>
            <strong>{props.player.name}</strong>
          </div>
          <div className="player-card__points">{props.player.points}</div>
        </div>
    </div>
  );
}

export default withRouter(PlayerCard);
