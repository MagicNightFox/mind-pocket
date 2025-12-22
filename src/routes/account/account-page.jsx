import {Box, Container, Autocomplete, TextField, Tooltip} from "@mui/material";
import TopBar from "../../components/topbar/top-bar.jsx";
import Button from "@mui/material/Button";
import {useAuth} from "../../context/AuthContext.jsx";
import {SIDE_MENU_ITEMS} from "../../Constants.js";
import {update} from "../../calls.js";
import {useState} from "react";

const AccountPage = () => {
  const {user} = useAuth();
  const [userMenuItems, setUserMenuItems] = useState([]);
  let userOptions = SIDE_MENU_ITEMS.filter(item => user.subscribedSubAppsIdList.includes(item.id));
  async function handleSubmit() {
    await update({
      menuList: userMenuItems,
    });
  }
  function handleMenuItemChange(event, value) {
    let ids = value.map(item => item.id);
    setUserMenuItems(ids);
  }
  return <Box>
    <TopBar title="Account" />
    <Container maxWidth="lg">
      <h1>Account settings</h1>
        <Tooltip title="What displays in your menu - your data will remain!">
          <Autocomplete
            multiple
            options={SIDE_MENU_ITEMS}
            defaultValue={userOptions}
            getOptionLabel={(option) => option.title}
            renderInput={(params) => <TextField {...params} label="Menu items" />}
            onChange={handleMenuItemChange}
          />
        </Tooltip>

      <Button onClick={handleSubmit} >Save preferences</Button>
    </Container>
  </Box>
}

export default AccountPage;