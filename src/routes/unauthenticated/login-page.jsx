import {Container, Box} from "@mui/material";
import LoginComponent from "../../components/unauthenticated/login-component.jsx";
import {useState} from "react";
import RegisterComponent from "../../components/unauthenticated/register-component.jsx";
import UnauthTopBar from "../../components/unauthenticated/unauth-top-bar.jsx";
const LoginPage = () => {
  const [hasAccount, setHasAccount] = useState(true);
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