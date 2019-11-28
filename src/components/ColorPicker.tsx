import React, { FC, useState, useEffect } from 'react';
import Name from './Name';
import randomcolor from 'randomcolor';

const ColorPicker: FC = () => {
  const [color, setColor] = useState([]);
  const [activeColor, setActiveColor] = useState(null);
  const getColors = async (): Promise<void> => {
    const baseColor = randomcolor().slice(1);
    const res = await fetch(
      `https://www.thecolorapi.com/scheme?hex=${baseColor}&mode=monochrome`,
    );
  };

  return (
    <header style={{ borderTop: `10px solid ${color}` }}>
      <Name />
    </header>
  );
};

export default ColorPicker;
