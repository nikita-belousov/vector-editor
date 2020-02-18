import * as React from "react";
import styled from "styled-components";

interface ITextInputProps {
  value?: string;
  onChange: (e: React.FormEvent<HTMLInputElement>) => void;
}

const TextInputStyled = styled.input`
  border: none;
`;

export const TextInput = ({ value = "", onChange }: ITextInputProps) => {
  return <TextInputStyled type="text" value={value} onChange={onChange} />;
};
