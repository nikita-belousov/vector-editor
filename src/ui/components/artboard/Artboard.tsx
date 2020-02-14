import * as React from "react";
import styled from "styled-components";
import { Dispatch } from "redux";
import { useSelector, useDispatch } from "react-redux";
import {
  EnterArtboard,
  LeaveArtboard,
  ArtboardAction
} from "../../model/artboard/actions";
import {
  getArtboardWidth,
  getArtboardHeight
} from "../../model/artboard/selectors";

interface IArtboardProps {
  width: number;
  height: number;
}

interface ICanvasProps {
  id: string;
  zIndex: number;
  width: number;
  height: number;
}

const ArtboardStyled = styled.div`
  position: relative;
  z-index: 1;
  width: ${(props: IArtboardProps) => props.width}px;
  height: ${(props: IArtboardProps) => props.height}px;
  cursor: none;
`;

const Canvas = styled.canvas`
  position: absolute;
  z-index: ${(props: ICanvasProps) => props.zIndex};
  width: ${(props: ICanvasProps) => props.width}px;
  height: ${(props: ICanvasProps) => props.height}px;
`;

export const Artboard = () => {
  const width = useSelector(getArtboardWidth);
  const height = useSelector(getArtboardHeight);
  const dispatch = useDispatch<Dispatch<ArtboardAction>>();

  const enterArtboard = React.useCallback(() => {
    dispatch(new EnterArtboard());
  }, [dispatch]);

  const leaveArtboard = React.useCallback(() => {
    dispatch(new LeaveArtboard());
  }, [dispatch]);

  if (width === null || height === null) return null;

  return (
    <ArtboardStyled
      width={width}
      height={height}
      onMouseEnter={enterArtboard}
      onMouseLeave={leaveArtboard}
    >
      <Canvas id="cursor" zIndex={3} width={width} height={height} />
      <Canvas id="selection" zIndex={2} width={width} height={height} />
      <Canvas id="artboard" zIndex={1} width={width} height={height} />
      <Canvas id="background" zIndex={0} width={width} height={height} />
    </ArtboardStyled>
  );
};
