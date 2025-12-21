import {createContext} from "react";
import {useAuth} from "../../context/AuthContext.jsx";
const LIGHT_THEME = {
  primaryColor: "#FFFFFF",
  secondaryColor: "#FFFFFF",
  sidePanelColor: "#FFFFFF",
}

const DARK_THEME = {
  primaryColor: "#FFFFFF",
  secondaryColor: "#FFFFFF",
  sidePanelBackgroundColor: "#252525",
}


const ThemeProvider = (props) => {
  const {user} = useAuth()
  const {children} = props;
  const theme= user.userData?.preferences?.theme === "light" ? LIGHT_THEME : DARK_THEME;
  return <>
  </>
}

export default ThemeProvider;