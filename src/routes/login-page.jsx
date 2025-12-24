import {Container, SvgIcon, TextField} from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import LoginComponent from "../components/auth/login-component.jsx";
import Button from "@mui/material/Button";
import {useState} from "react";
import RegisterComponent from "../components/auth/register-component.jsx";

const LoginPage = () => {
  const [hasAccount, setHasAccount] = useState(true);

  return <Container>
    <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" height="80vh">
      <Typography variant="h5" component="h2" textAlign="center">MindPocket</Typography>
      {hasAccount ? <LoginComponent /> : <RegisterComponent />}
      <Button variant="text" onClick={()=> setHasAccount(!hasAccount)}>
        {hasAccount ? "Don't have an account? Create one!" : "Already have an account? Log in!"}
      </Button>
    </Box>
  </Container>
}

export default LoginPage;