import { createContext, useContext, useState } from "react";

const DarkModeContexte = createContext();

function DarkModeContext({ children }) {
  const [isDarkMode, setDarkMode] = useState(false);

  function toggleDarkMode() {
    setDarkMode((darkMode) => !darkMode);
  }

  return (
    <DarkModeContexte.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </DarkModeContexte.Provider>
  );
}

export function useDarkMode() {
  const context = useContext(DarkModeContexte);

  if (!context)
    throw new Error(" dark-mode context is used outside its context");

  return context;
}

export default DarkModeContext;
