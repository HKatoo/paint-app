import React, { FC } from 'react';
import './ColorPicker.css';

interface ColorPickerProps {
  colors: string[];
  activeColor: string;
  setActiveColor: (str: string) => void;
}

const ColorPicker: FC<ColorPickerProps> = ({
  colors = [],
  activeColor = '',
  setActiveColor,
}) => {
  return (
    <fieldset className="color-picker">
      {colors.map((color, idx) => (
        <label key={idx}>
          <input
            name="color"
            type="radio"
            value={color}
            checked={activeColor === color}
            onChange={() => setActiveColor(color)}
          />
          <span style={{ backgroundColor: color }} />
        </label>
      ))}
    </fieldset>
  );
};

export default ColorPicker;
