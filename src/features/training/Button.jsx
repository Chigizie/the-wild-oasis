import styled, { css } from "styled-components";

const Button = styled.button`
  background-color: green;
  color: white;
  font-size: large;
  margin: 4px 6px;
  padding: 8px;
  border-radius: 9px;
  outline: none;
  border: none;
  opacity: 0.7;
  ${({ yellow }) =>
    yellow &&
    css`
      background-color: yellow;
      color: white;
      border-radius: 7px;
      outline: none;
      border: none;
      opacity: 0.9;
    `};

  ${({ blue }) =>
    blue &&
    css`
      background-color: blue;
      color: white;
      font-size: large;
      font-weight: 900;
      font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
        "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
      font-style: italic;
    `}
`;

export default Button;
