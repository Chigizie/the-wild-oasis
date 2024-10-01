import styled from "styled-components";
import MainNav from "./MainNav";
import Logo from "./Logo";

const SideBarr = styled.aside`
  background-color: var(--color-grey-0);
  border-bottom: var(--color-grey-100);
  padding: 3.2rem 4rem;
  grid-row: 1/ -1;
`;

function SideBar() {
  return (
    <SideBarr>
      <Logo />
      <MainNav />
    </SideBarr>
  );
}

export default SideBar;
