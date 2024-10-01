import styled from "styled-components";

const StyledFormRom = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  padding: 1.2rem 0;
`;

const Label = styled.label`
  font-weight: 500;
`;

const Error = styled.span`
  font-size: 1.4rem;
`;

function FormRowVertical({ children, label, error }) {
  return (
    <StyledFormRom>
      {label && <Label htmlFor={children.props.id}>{label}</Label>}
      {children}
      {error && <Error>{error}</Error>}
    </StyledFormRom>
  );
}

export default FormRowVertical;
