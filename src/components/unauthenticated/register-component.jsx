import {useState} from "react";
import {Button, TextField, Box, Typography} from "@mui/material";
import {register} from "../../calls.js";
import {useAuth} from "../../context/AuthContext.jsx";
import {useLang} from "../../lang/LanguageContext.jsx";
import {useViewport} from "../../context/ViewportContext.jsx";
import ReportProblemIcon from '@mui/icons-material/ReportProblem';

const RegisterComponent = ({click}) => {
  const {login} = useAuth();
  const viewport = useViewport();
  const {t, lang} = useLang();
  const [error, setError] = useState(null);
  async function handleSubmit(event) {
    event.preventDefault();
    setError(null);
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());
    const data = {...formJson, preferences: {
      language: lang
      }}
    const result = await register(data);
     if(result.error){
       setError(result.error);
     } else {
       await login(data);
     }
  }
  return <Box padding="16px" borderRadius="16px" bgcolor="white" width={viewport === "phone" ? "100%" : "512px"}>
    <Typography variant="h5" component="h2" textAlign="center">{t.LoginComponent.RegisterTitle}</Typography>
    <form onSubmit={handleSubmit} id="register-form" style={{display: "flex", flexDirection: "column", gap: "16px", padding: "16px 0"}}>
      {error && <Box display="flex" gap="16px" color="red" bgcolor="#FFF5F5" padding="8px" borderRadius="8px"> <ReportProblemIcon color="error"/> {error.message} </Box>}
      <TextField
        fullWidth
        required
        autoFocus
        type="text"
        label={t.LoginComponent.Username}
        id="username"
        name="username"
      />
      <TextField
        fullWidth
        required
        autoFocus
        type="password"
        label={t.LoginComponent.Password}
        id="password"
        name="password"
      />
      <Box display="flex" flexDirection={viewport === "phone" ? "column-reverse" : "row"} gap="16px" justifyContent={viewport==="phone"? "flex-end" : "space-between"} alignItems="center" >
        <Button onClick={click} variant="text" style={viewport === "phone" ? {whiteSpace: "pre-line"} : undefined}>
          {t.LoginComponent.LoginPrompt}
        </Button>
        <Button variant="contained" type="submit" form="register-form">{t.LoginComponent.Register}</Button>
      </Box>
    </form>
  </Box>
}

export default RegisterComponent