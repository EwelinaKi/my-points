import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { withRouter } from "react-router";
import DropdownButton from "react-bootstrap/DropdownButton";

import "../styles/GameList.css"
import "../styles/ColorPicker.css";
import COLORS from "../model/colors";


interface IColorPickerProps {
  onSelect: (arg: string) => void;
}

const ColorPicker: React.FC<IColorPickerProps> = (props) => {
  
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
