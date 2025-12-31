import {useAuth} from "../../context/AuthContext.jsx";
import {CustomThemeContext} from "../../context/CustomThemeContext.jsx";
import {useMemo, useState} from "react";

const themes = {
  light: {
    primaryColor: "#FFFFFF",
    secondaryColor: "#FFFFFF",
    sidePanelColor: "#FFFFFF",
  },
  dark: {
    primaryColor: "#FFFFFF",
    secondaryColor: "#FFFFFF",
    sidePanelBackgroundColor: "#252525",
  }
}
const CustomThemeProvider = ({children}) => {
  const {user} = useAuth()
  const [theme, setTheme] = useState(themes[user?.preferences?.theme] || themes["light"]);
  const value = useMemo(() => ({
    theme, setTheme
  }),[theme]);

  return <CustomThemeContext.Provider value={value}>
    {children}
  </CustomThemeContext.Provider>
}

export default CustomThemeProvider;