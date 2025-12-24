import {Button, TextField} from "@mui/material";
import {register} from "../../calls.js";
import {useAuth} from "../../context/AuthContext.jsx";

const RegisterComponent = () => {
  const {login} = useAuth();
  async function handleSubmit(event) {
    //event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());
     await register(formJson);
     await login(formJson);
  }
  return <form onSubmit={handleSubmit} id="register-form" style={{display: "flex", flexDirection: "column", gap: "16px", padding: "16px 0"}}>
    <TextField
      fullWidth
      required
      autoFocus
      type="text"
      label="Username"
      id="username"
      name="username"
    />
    <TextField
      fullWidth
      required
      autoFocus
      type="password"
      label="Password"
      id="password"
      name="password"
    />
    <Button variant="contained" type="submit" form="register-form">Register</Button>
  </form>
}

export default RegisterComponent