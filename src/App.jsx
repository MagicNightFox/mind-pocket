import './App.css'
import {BrowserRouter, Route, Routes} from "react-router";
import Box from "@mui/material/Box";
import Character from "./subapps/fic-pocket/character.jsx";
import Fiction from "./subapps/fic-pocket/fiction.jsx";
import FictionDetailPage from "./subapps/fic-pocket/fiction-detail.jsx";
import Profile from "./routes/profile.jsx";
import RecipePage from "./subapps/cook-pocket/recipes.jsx";
import LoginPage from "./routes/login-page.jsx";
import SidePanel from "./components/side-panel/side-panel.jsx";
import CharacterList from "./subapps/fic-pocket/character/list.jsx";
import AccountPage from "./routes/account/account-page.jsx";
import PersonalDashboard from "./routes/personal-dashboard.jsx";
import NotePocket from "./subapps/note-pocket/index.jsx";
import {useViewport} from "./context/ViewportContext.jsx";

function App() {
  const viewport = useViewport();
  const drawerWidth = viewport === "phone" ? 0 : 256;
  return (
      <BrowserRouter>
        <Box sx={{display:"flex", minHeight: "100vh", overflowX:"hidden", bgcolor: "#FAFAFA"}} >
          <SidePanel drawerWidth={drawerWidth} />
          <Box flexGrow={1} sx={{overflowX:"hidden"}} >
            <Routes>
              <Route path="/" element ={<PersonalDashboard />} />
              <Route path="/characters" element ={<CharacterList />} />
              <Route path="/character/:id" element ={<Character/>} />
              <Route path="/fiction" element ={<Fiction/>} />
              <Route path="/fiction/:id" element ={<FictionDetailPage />} />
              <Route path="/profile" element ={<Profile/>} />
              <Route path="/account" element ={<AccountPage />} />
              <Route path="/recipes" element={<RecipePage />} />
              <Route path="/login" element={<LoginPage />} />
            </Routes>
            <NotePocket/>
          </Box>
        </Box>
      </BrowserRouter>
  )
}

export default App
