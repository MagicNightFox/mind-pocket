import './App.css'
import {lazy} from "react"
import {BrowserRouter, Route, Routes} from "react-router";
import SidePanel from "./components/side-panel/side-panel.jsx";
import {useAuth} from "./context/AuthContext.jsx";
import {CircularProgress, Box} from "@mui/material";

const LoginPage = lazy(() => import("./routes/unauthenticated/login-page.jsx"));
const AccountPage = lazy(() => import("./routes/account/account-page.jsx"));
const PersonalDashboardPage = lazy(() => import("./routes/personal-dashboard.jsx"));
const AboutUnAuthPage = lazy(() => import("./routes/unauthenticated/about-app.jsx"));
const AboutAuthPage = lazy(() => import("./routes/about.jsx"));
const PageNotFound = lazy(() => import("./routes/page-not-found.jsx"))
function App() {
  const {user, loading} = useAuth();

  if(loading) {
    return <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" height="80vh">
      <CircularProgress/>
    </Box>
  } else if(!user){
    return <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/about" element={<AboutUnAuthPage />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  }

  return <BrowserRouter>
    <Box sx={{display:"flex", minHeight: "100vh", overflowX:"hidden", bgcolor: "#FAFAFA"}} >
      <SidePanel/>
      <Box flexGrow={1} sx={{overflowX:"hidden"}} >
        <Routes>
          <Route path="/" element ={<PersonalDashboardPage />} />
          <Route path="/about" element={<AboutAuthPage />} />
          <Route path="/account" element ={<AccountPage />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Box>
    </Box>
  </BrowserRouter>
}

export default App
