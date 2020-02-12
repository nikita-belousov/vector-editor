import * as React from "react";
import styled from "styled-components";

interface IArtboardProps {
  width: number;
  height: number;
}

interface ICanvasProps {
  id: string;
  width: number;
  height: number;
}

const ArtboardStyled = styled.div`
  position: relative;
  width: ${(props: IArtboardProps) => props.width}px;
  height: ${(props: IArtboardProps) => props.height}px;
  border: 1px solid black;
  cursor: none;
`;

const Canvas = styled.canvas`
  position: absolute;
  z-index: ${(props: ICanvasProps) => (props.id === "cursor" ? 1 : 0)};
  width: ${(props: ICanvasProps) => props.width}px;
  height: ${(props: ICanvasProps) => props.height}px;
`;

export const Artboard = ({ width, height }: IArtboardProps) => {
  return (
    <ArtboardStyled width={width} height={height}>
      <Canvas id="cursor" width={width} height={height} />
      <Canvas id="artboard" width={width} height={height} />
    </ArtboardStyled>
  );
};
