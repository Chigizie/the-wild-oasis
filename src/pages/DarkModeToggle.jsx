import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi";
import ButtonIcon from "../ui/ButtonIcon";
import { useDarkMode } from "../features/context/DarkModeContext";
import { useEffect } from "react";

function DarkModeToggle() {
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  useEffect(() => {
    localStorage.setItem("dark", "dark-mode");
    if (isDarkMode) {
      document.documentElement.classList.add(localStorage.getItem("dark"));
    } else {
      document.documentElement.classList.remove(localStorage.getItem("dark"));
    }
  }, [isDarkMode]);

  return (
    <ButtonIcon onClick={() => toggleDarkMode()}>
      {isDarkMode ? <HiOutlineMoon /> : <HiOutlineSun />}
    </ButtonIcon>
  );
}

export default DarkModeToggle;
