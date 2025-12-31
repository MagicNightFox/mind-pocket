import {createContext, useContext} from "react";

export const CustomThemeContext = createContext(null);
export const useCustomTheme = () => {
  const context = useContext(CustomThemeContext);
  if (!context) {
    throw new Error("Must be used with CustomThemeProvider");
  }
  return context;
}