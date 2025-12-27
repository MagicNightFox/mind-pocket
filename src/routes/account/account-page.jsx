import {Box, Container, Autocomplete, TextField, Tooltip} from "@mui/material";
import TopBar from "../../components/topbar/top-bar.jsx";
import Button from "@mui/material/Button";
import {useAuth} from "../../context/AuthContext.jsx";
import {SIDE_MENU_ITEMS} from "../../Constants.js";
import {update} from "../../calls.js";
import {useState} from "react";
import {useLang} from "../../lang/LanguageContext.jsx";


const MeniItemChooser = (userOptions, handleMenuItemChange) => {
  return <Tooltip title="What displays in your menu - your data will remain!">
    <Autocomplete
      multiple
      options={SIDE_MENU_ITEMS}
      defaultValue={userOptions}
      getOptionLabel={(option) => option.title}
      renderInput={(params) => <TextField {...params} label="Menu items" />}
      onChange={handleMenuItemChange}
    />
  </Tooltip>
}

const AccountPage = () => {
  const {user} = useAuth();
  const {lang, setLang, t} = useLang();

  const breadcrumbs = [
    {link: "/", title: t.Breadcrumbs.Personal},
    {link: "/account", title: t.Breadcrumbs.Account},
  ]

  const getLangPref = (userLang) => {
    switch(userLang){
      case "en": return {title: t.Lang.English, value: "en"}
      case "cs": return {title: t.Lang.Czech, value: "cs"}
    }
  }

  const [userNewPrefs, setUserNewPrefs] = useState(user);
  //let userOptions = SIDE_MENU_ITEMS.filter(item => user.subscribedSubAppsIdList.includes(item.id));
  async function handleSubmit() {
    setLang(userNewPrefs.language);
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
      <h1>{t.AccountPage.Settings}</h1>
      <Autocomplete
        options={[{title: t.Lang.English, value: "en"}, {title: t.Lang.Czech, value: "cs"}]}
        defaultValue={getLangPref(user.preferences.language)}
        getOptionLabel={(option) => getLangPref(option.value).title}
        renderInput={(params) => <TextField {...params} label={t.AccountPage.Language} />}
        onChange={(event, option) => handleMenuItemChange(event,option,"language")}
      />

      <Box alignSelf="end">
        <Button variant="contained" onClick={handleSubmit} >{t.AccountPage.SavePrefs}</Button>
      </Box>
    </Container>
  </Box>
}



export default AccountPage;