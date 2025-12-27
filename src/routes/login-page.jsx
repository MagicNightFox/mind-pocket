import {Container, Box} from "@mui/material";
import LoginComponent from "../components/auth/login-component.jsx";
import {useState} from "react";
import RegisterComponent from "../components/auth/register-component.jsx";
import UnauthTopBar from "../components/topbar/unauth-top-bar.jsx";
const LoginPage = (props) => {
  const [hasAccount, setHasAccount] = useState(props.login || false);
return <Box>
    <UnauthTopBar />
    <Container maxWidth="100vw">
      <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" height="80vh" >
        {hasAccount ? <LoginComponent click={() => setHasAccount(!hasAccount)}/> : <RegisterComponent click={() => setHasAccount(!hasAccount)} />}
      </Box>
    </Container>
  </Box>

}

export default LoginPage;