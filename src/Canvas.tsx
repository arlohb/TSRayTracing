import React, { useRef, useEffect, useCallback } from "react";

// the props of the native canvas element
type CanvasProps = React.DetailedHTMLProps<
React.CanvasHTMLAttributes<HTMLCanvasElement>, HTMLCanvasElement
>;

const Canvas = ({ draw, ...nativeProps }
: CanvasProps & {
  draw: (ctx: CanvasRenderingContext2D) => void,
}) => {
  const ref = useRef<HTMLCanvasElement>(null);

  const reDraw = useCallback(() => {
    const canvas = ref.current;
    // the canvas will be initialised at this point
    const context = (canvas as HTMLCanvasElement).getContext("2d") as CanvasRenderingContext2D;

    draw(context);
  }, [draw]);

  useEffect(() => {
    reDraw();
  }, [reDraw]);

  return (
    <canvas
      tabIndex={0}
      ref={ref}
      onClick={(() => reDraw())}
      style={{
        userSelect: "none", // allows the user to double click without selecting everything
      }}
      {...nativeProps}
    />
  );
};

export default Canvas;
