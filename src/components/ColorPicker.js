import React from "react";
import "../styles/GameList.css"
import { withRouter } from "react-router";
import PropTypes from "prop-types";
import DropdownButton from "react-bootstrap/DropdownButton";
import COLORS from "../model/colors";
import Dropdown from "react-bootstrap/Dropdown";
import "../styles/ColorPicker.css";


ColorPicker.propTypes = {
  onSelect: PropTypes.func.isRequired
}

function ColorPicker(props) {
  
  return (
    <DropdownButton variant="outline-secondary" title="Pick color">
      {Object.keys(COLORS).map((key) =>
          <Dropdown.Item  key={key}>
            <div className="color-picker-item" onClick={() => props.onSelect(key)}>
              <div className="color-picker-item__box" style={{backgroundColor: `${COLORS[key].color}`}}/>
              <span>{key}</span>
            </div>
          </Dropdown.Item >)}
    </DropdownButton>
  )
}

export default withRouter(ColorPicker);
