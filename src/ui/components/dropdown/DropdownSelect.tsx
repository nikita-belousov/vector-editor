import * as React from "react";
import styled from "styled-components";
import { colors, sizes } from "../../styles/variables";
import { IDropdownSelectItemProps } from "./DropdownSelectItem";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";

type Children = React.ReactElement<IDropdownSelectItemProps>[];

interface IDropdownSelectProps<T = any> {
  children: Children;
  open: boolean;
  selected: T;
  onItemClick?: (value: {
    title: string;
    value: T;
    icon: IconDefinition;
  }) => void;
  onClose?: () => void;
}

const DropdownSelectStyled = styled.div`
  position: absolute;
  z-index: 100;
  margin-top: 5px;
  margin-left: 6px;
  padding: 6px 0;
  background: ${colors.darkGrey};
  width: ${sizes.dropdownWidth}px;
  border: 1px solid black;
  border-radius: 2px;
  box-shadow: 0px 3px 35px 0px rgba(0, 0, 0, 0.4);

  ::after {
    content: "";
    position: absolute;
    top: -6px;
    left: 24px;
    display: block;
    width: 0;
    height: 0;
    border-bottom: 6px solid ${colors.darkGrey};
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
  }
`;

export const DropdownSelect: React.FC<IDropdownSelectProps> = ({
  children,
  open,
  selected,
  onItemClick,
  onClose
}) => {
  const [elements, setElements] = React.useState<Children | null>(null);

  const close = React.useCallback(() => {
    if (onClose) onClose();
  }, [onClose]);

  const handleClick = React.useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      e.nativeEvent.stopPropagation();
      e.stopPropagation();
    },
    []
  );

  React.useEffect(() => {
    if (!open) return;

    window.document.addEventListener("click", close);
    return () => {
      window.document.removeEventListener("click", close);
    };
  }, [open]);

  React.useEffect(() => {
    const childrenArr = React.Children.toArray(children) as Children;

    const elements = childrenArr.map(child => {
      const { title, value, icon, onClick } = child.props;

      return React.cloneElement(child, {
        selected: value === selected,
        onClick: (e: React.MouseEvent) => {
          e.nativeEvent.stopPropagation();
          e.stopPropagation();

          if (onClick) onClick({ title, value, icon });
          if (onItemClick) onItemClick({ title, value, icon });
        }
      });
    });
    setElements(elements);
  }, [children, onItemClick]);

  if (!open || elements === null) return null;

  return (
    <DropdownSelectStyled onClick={handleClick}>
      {elements}
    </DropdownSelectStyled>
  );
};
