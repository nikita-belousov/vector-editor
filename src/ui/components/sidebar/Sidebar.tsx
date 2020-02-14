import * as React from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { ChromePicker } from "react-color";
import { sizes, colors } from "../../styles/variables";
import { SidebarSection } from "./SidebarSection";
import { Button } from "../button";
import { getArtboardBackgroundColor } from "../../model/artboard/selectors";
import { SetBackgroundColor } from "../../model/artboard/actions";

interface IColorIconProps {
  color: string;
}

const SidebarStyled = styled.div`
  z-index: 2;
  width: ${sizes.sidebarWidth}px;
  max-height: calc(100vh - ${sizes.topBarHeight}px);
  border-left: 1px solid ${colors.lightGrey};
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

export const Sidebar = () => {
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
    <SidebarStyled>
      <SidebarSection title="Background">
        <Button onClick={togglePicker}>
          <ColorIcon color={backgroundColor} />
          {backgroundTitle}
        </Button>
        {picking ? (
          <PickerWrapper>
            <ChromePicker
              color={backgroundColor}
              onChange={setBackgroundColor}
            />
          </PickerWrapper>
        ) : null}
      </SidebarSection>
    </SidebarStyled>
  );
};
