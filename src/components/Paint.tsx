import React, { FC, useState, useEffect } from 'react';
import Name from './Name';
import ColorPicker from './ColorPicker';
import randomcolor from 'randomcolor';

const Paint: FC = () => {
  const [colors, setColors] = useState([]);
  const [activeColor, setActiveColor] = useState('');
  const getColors = async () => {
    const baseColor = randomcolor().slice(1);
    const res = await fetch(
      `https://www.thecolorapi.com/scheme?hex=${baseColor}&mode=monochrome`,
    );
    const data = await res.json();
    setColors(data.colors.map((color: any) => color.hex.value));
    setActiveColor(data.colors[0].hex.value);
    console.log(data.colors[0].hex.value);
  };
  useEffect(() => {
    getColors();
  }, []);

  return (
    <header
      style={{
        borderTop: `10px solid ${activeColor}`,
        borderBottom: '1px solid black',
        padding: 15,
      }}
    >
      <Name />
      <ColorPicker
        colors={colors}
        activeColor={activeColor}
        setActiveColor={setActiveColor}
      />
    </header>
  );
};

export default Paint;
