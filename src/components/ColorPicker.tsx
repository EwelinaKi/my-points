import React from "react";
import {withRouter} from "react-router";

import "../styles/GameList.css"
import "../styles/ColorPicker.css";
import COLORS from "../model/colors";


interface IColorPickerProps {
  onSelect: (arg: string) => void;
}

const ColorPicker: React.FC<IColorPickerProps> = ({onSelect}) => {

  const [ selectedColor, setSelectedColor ] = React.useState<string>('');

  const selectColor = (color: string): void => {
    if (isOccupied(color)) {
      return;
    }
    setSelectedColor(color);
    console.log(selectedColor, color);
  }

  const getStyle = (colorName: string) => ({
    backgroundColor: `${COLORS[colorName].color}`,
    color: `${COLORS[colorName].fontColor}`
  })

  const isOccupied = (color: string): boolean => {
    return false;
  }

  const getClassName = (color: string) => {
    const className =  isOccupied(color) ?
      'disabled' : selectedColor === color ?
        'color-picker-item__box--selected' : 'color-picker-item__box'

    return 'color-picker-item__box ' + className;
  }

  React.useEffect(() => {
    onSelect(selectedColor);
  }, [ selectedColor ])


  return (
    <div className='color-picker-item'>
      {Object.keys(COLORS).map((key) =>
        <div className='color-picker-item__wrapper'
             key={key}
             onClick={() => selectColor(key)}
        ><div className={getClassName(key)} style={getStyle(key)}/>
        </div>
      )}
    </div>
  )
}

export default withRouter(ColorPicker);
