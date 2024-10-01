import styled, { css } from "styled-components";

const Row = styled.div`
  display: flex;
  ${(props) =>
    props.type === "horizontal" &&
    css`
      justify-content: space-between;
    `}

  ${(props) =>
    props.typ === "vertical" &&
    css`
      flex-direction: column;
      gap: 5px;
    `}
`;

Row.defaultProps = "vertical";
export default Row;
