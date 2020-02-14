import * as React from "react";
import styled from "styled-components";
import { colors } from "../../styles/variables";

interface IButtonProps {
  title?: string;
  children?: any;
  onClick: () => void;
}

const ButtonStyled = styled.button`
  display: flex;
  align-items: center;
  width: 100px;
  padding: 6px 8px;
  background: ${colors.white};
  border: 1px solid ${colors.lightGrey};
  border-radius: 3px;
  outline: none;
  text-align: left;
  line-height: 1;
  cursor: pointer;

  :hover {
    background: ${colors.hover};
  }
`;

export const Button = ({ children, title, onClick }: IButtonProps) => {
  const buttonContent = React.useMemo(() => children || title || "", [
    children,
    title
  ]);

  return <ButtonStyled onClick={onClick}>{buttonContent}</ButtonStyled>;
};
