import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { ChromePicker } from "react-color";
import { sizes } from "../../styles/variables";
import { Button } from "../button";
import { getArtboardBackgroundColor } from "../../model/artboard/selectors";
import { SetBackgroundColor } from "../../model/artboard/actions";

interface IColorIconProps {
  color: string;
}

const PickerWrapper = styled.div`
  position: absolute;
  left: -${sizes.colorPickerWidth + 20}px;
  margin-top: -32px;
`;

const ColorIcon = styled.div`
  width: 16px;
  height: 16px;
  margin-right: 4px;
  background: ${(props: IColorIconProps) => props.color};
`;

export const BackgroundSettings = () => {
  const dispatch = useDispatch();
  const backgroundColor = useSelector(getArtboardBackgroundColor) || "#FFF";
  const [picking, setPicking] = React.useState<boolean>(false);

  const setBackgroundColor = React.useCallback(
    color => {
      dispatch(new SetBackgroundColor(color.hex));
    },
    [dispatch]
  );

  const backgroundTitle = React.useMemo(
    () => backgroundColor.substring(1).toUpperCase(),
    [backgroundColor]
  );

  const togglePicker = React.useCallback(() => {
    setPicking(active => !active);
  }, []);

  return (
    <>
      <Button onClick={togglePicker}>
        <ColorIcon color={backgroundColor} />
        {backgroundTitle}
      </Button>
      {picking ? (
        <PickerWrapper>
          <ChromePicker color={backgroundColor} onChange={setBackgroundColor} />
        </PickerWrapper>
      ) : null}
    </>
  );
};
