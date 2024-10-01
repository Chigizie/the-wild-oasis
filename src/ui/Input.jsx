import styled from "styled-components";

const Input = styled.input`
  font-size: medium;
  padding: 4px 6px;
  border: 1px solid grey;
  border-radius: 5px;
  background-color: rgba(223, 227, 227, 0.2);
  &:hover {
    background-color: rgba(223, 227, 227, 0.8);
  }

  &:active {
    background-color: rgba(2, 227, 227, 0.8);
  }
`;

export default Input;
