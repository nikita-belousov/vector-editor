import * as React from "react";
import styled from "styled-components";
import { sizes, colors } from "../../styles/variables";

interface INumberInputProps {
  value?: number;
  onChange: (e: React.FormEvent<HTMLInputElement>) => void;
}

const TextInputStyled = styled.input`
  display: flex;
  align-items: center;
  width: 50px;
  height: ${sizes.inputHeight}px;
  background: ${colors.white};
  border: 1px solid transparent;
  border-radius: 3px;
  outline: none;
  text-align: left;
  line-height: 1;
  text-indent: 6px;

  :hover {
    border: 1px solid ${colors.lightGrey};
  }

  :focus {
    border: 2px solid ${colors.primary};
    text-indent: 5px;
  }
`;

export const NumberInput = ({ value = 0, onChange }: INumberInputProps) => {
  return <TextInputStyled type="number" value={value} onChange={onChange} />;
};
