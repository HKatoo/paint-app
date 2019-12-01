import React, { FC, useState, useEffect, useRef, useCallback } from 'react';

interface CanvasProps {
  width: number;
  height: number;
  color: string;
}

interface Coordinate {
  x: number;
  y: number;
}

const Canvas: FC<CanvasProps> = ({ width, height, color = undefined }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isPainting, setIsPainting] = useState(false);
  const [mousePosition, setMousePosition] = useState<Coordinate | undefined>(
    undefined,
  );

  const startPaint = useCallback((e: MouseEvent) => {
    const coordinate = getCoordinate(e);
    if (coordinate) {
      setMousePosition(coordinate);
      setIsPainting(true);
    }
  }, []);

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas: HTMLCanvasElement = canvasRef.current;
    canvas.addEventListener('mousedown', startPaint);
    return () => {
      canvas.removeEventListener('mousedown', startPaint);
    };
  }, [startPaint]);

  const drawLine = useCallback(
    (curr: Coordinate, next: Coordinate) => {
      if (!canvasRef.current) return;
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      if (context) {
        context.strokeStyle = color ? color : 'black';
        context.lineJoin = 'round';
        context.lineWidth = 5;
        context.beginPath();
        context.moveTo(curr.x, curr.y);
        context.lineTo(next.x, next.y);
        context.stroke();
      }
    },
    [color],
  );

  const paint = useCallback(
    (e: MouseEvent) => {
      if (isPainting) {
        const newMousePosition = getCoordinate(e);
        if (mousePosition && newMousePosition) {
          drawLine(mousePosition, newMousePosition);
          setMousePosition(newMousePosition);
        }
      }
    },
    [isPainting, mousePosition, drawLine],
  );

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas: HTMLCanvasElement = canvasRef.current;
    canvas.addEventListener('mousemove', paint);
    return () => {
      canvas.removeEventListener('mousemove', paint);
    };
  }, [paint]);

  const exitPaint = useCallback(() => {
    setIsPainting(false);
    setMousePosition(undefined);
  }, []);

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas: HTMLCanvasElement = canvasRef.current;
    canvas.addEventListener('mouseup', exitPaint);
    canvas.addEventListener('mouseleave', exitPaint);
    return () => {
      canvas.removeEventListener('mouseup', exitPaint);
      canvas.removeEventListener('mouseleave', exitPaint);
    };
  }, [exitPaint]);

  const getCoordinate = (e: MouseEvent): Coordinate | undefined => {
    if (!canvasRef.current) return;
    const canvas: HTMLCanvasElement = canvasRef.current;
    return { x: e.pageX - canvas.offsetLeft, y: e.pageY - canvas.offsetTop };
  };

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      style={{
        border: '3px solid black',
        margin: 10,
      }}
    />
  );
};

export default Canvas;
