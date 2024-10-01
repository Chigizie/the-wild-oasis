import styled from "styled-components";
import Logout from "../features/authentication/Logout";

import ButtonIcon from "./ButtonIcon";
import { HiUser } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import DarkModeToggle from "../pages/DarkModeToggle";

const StyledHeader = styled.ul`
  display: flex;
  gap: 0.4rem;
`;

function HeaderMenu() {
  const navigate = useNavigate();
  return (
    <StyledHeader>
      <li>
        <ButtonIcon onClick={() => navigate("/account")}>
          <HiUser />
        </ButtonIcon>
      </li>
      <li>
        <DarkModeToggle />
      </li>
      <li>
        <Logout />
      </li>
    </StyledHeader>
  );
}

export default HeaderMenu;
