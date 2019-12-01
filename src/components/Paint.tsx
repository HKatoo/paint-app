import React, { FC, useState, useEffect, useRef, useCallback } from 'react';
import Name from './Name';
import ColorPicker from './ColorPicker';
import Canvas from './Canvas';
import randomcolor from 'randomcolor';
import { IconButton } from '@material-ui/core';
import RefreshIcon from '@material-ui/icons/Refresh';

const Paint: FC = () => {
  const [colors, setColors] = useState([]);
  const [activeColor, setActiveColor] = useState('');
  const headerRef = useRef<HTMLHeadElement>(null);
  const getColors = useCallback(async () => {
    const baseColor = randomcolor().slice(1);
    const res = await fetch(
      `https://www.thecolorapi.com/scheme?hex=${baseColor}&mode=monochrome`,
    );
    const data = await res.json();
    setColors(data.colors.map((color: any) => color.hex.value));
    setActiveColor(data.colors[0].hex.value);
    console.log(data.colors[0].hex.value);
  }, []);
  useEffect(() => {
    getColors();
  }, [getColors]);

  return (
    <>
      <header
        ref={headerRef}
        style={{
          padding: 15,
        }}
      >
        <div>
          <Name />
        </div>
        <div style={{ display: 'flex' }}>
          <ColorPicker
            colors={colors}
            activeColor={activeColor}
            setActiveColor={setActiveColor}
          />
          <IconButton
            size="medium"
            color="primary"
            style={{ marginLeft: 50 }}
            onClick={getColors}
          >
            <RefreshIcon fontSize="large" />
          </IconButton>
        </div>
      </header>
      <div>
        <Canvas
          color={activeColor}
          height={
            headerRef.current
              ? window.innerHeight - headerRef.current.offsetHeight - 50
              : window.innerHeight
          }
          width={window.innerWidth - 30}
        />
      </div>
    </>
  );
};

export default Paint;
