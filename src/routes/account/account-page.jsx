import {Box, Container, Autocomplete, TextField, Button} from "@mui/material";
import TopBar from "../../components/topbar/top-bar.jsx";
import {useAuth} from "../../context/AuthContext.jsx";
import {update} from "../../calls.js";
import {useState} from "react";
const AccountPage = () => {
  const {user} = useAuth();

  const breadcrumbs = [
    {link: "/", title: "Personal"},
    {link: "/account", title: "Account"},
  ]

  const getLangPref = (userLang) => {
    switch(userLang){
      case "en": return {title: "English", value: "en"}
      case "cs": return {title: "Czech", value: "cs"}
    }
  }

  const [userNewPrefs, setUserNewPrefs] = useState(user);
  async function handleSubmit() {
    await update({
      preferences: {...userNewPrefs}
    });
  }
  function handleMenuItemChange(event, option) {
    setUserNewPrefs({...userNewPrefs, language: option.value});
  }
  return <Box>
    <TopBar breadcrumbList={breadcrumbs} />
    <Container maxWidth="100%" sx={{display: "flex", flexDirection: "column", gap: "16px"}}>
      <h1>Settings</h1>
      <Autocomplete
        options={[{title: "English", value: "en"}, {title: "Czech", value: "cs"}]}
        defaultValue={getLangPref(user.preferences.language)}
        getOptionLabel={(option) => getLangPref(option.value).title}
        renderInput={(params) => <TextField {...params} label="Language" />}
        onChange={(event, option) => handleMenuItemChange(event,option,"language")}
      />

      <Box alignSelf="end">
        <Button variant="contained" onClick={handleSubmit} >Save preferences</Button>
      </Box>
    </Container>
  </Box>
}



export default AccountPage;