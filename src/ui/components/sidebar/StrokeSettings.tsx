import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { ChromePicker } from "react-color";
import { sizes } from "../../styles/variables";
import { Button } from "../button";
import { NumberInput } from "../input/NumberInput";
import {
  getStrokeColor,
  getStrokeWidth
} from "../../model/object-settings/selectors";
import {
  SetStrokeColor,
  SetStrokeWidth
} from "../../model/object-settings/actions";

interface IColorIconProps {
  color: string;
}

const StrokeSettingsStyled = styled.div``;

const SettingsRow = styled.div`
  display: flex;
`;

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

const WidthInputWrapper = styled.div`
  margin-left: 10px;
`;

export const StrokeSettings = () => {
  const dispatch = useDispatch();
  const strokeColor = useSelector(getStrokeColor);
  const strokeWidth = useSelector(getStrokeWidth);
  const [picking, setPicking] = React.useState<boolean>(false);

  const setStrokeColor = React.useCallback(
    color => {
      dispatch(new SetStrokeColor(color.hex));
    },
    [dispatch]
  );

  const setStrokeWidth = React.useCallback(
    (e: React.FormEvent<HTMLInputElement>) => {
      dispatch(new SetStrokeWidth(e.currentTarget.value));
    },
    [dispatch]
  );

  const strokTitle = React.useMemo(
    () => strokeColor.substring(1).toUpperCase(),
    [strokeColor]
  );

  const togglePicker = React.useCallback(() => {
    setPicking(active => !active);
  }, []);

  return (
    <StrokeSettingsStyled>
      <SettingsRow>
        <Button onClick={togglePicker}>
          <ColorIcon color={strokeColor} />
          {strokTitle}
        </Button>
        <WidthInputWrapper>
          <NumberInput value={strokeWidth} onChange={setStrokeWidth} />
        </WidthInputWrapper>
      </SettingsRow>
      {picking ? (
        <PickerWrapper>
          <ChromePicker color={strokeColor} onChange={setStrokeColor} />
        </PickerWrapper>
      ) : null}
    </StrokeSettingsStyled>
  );
};
