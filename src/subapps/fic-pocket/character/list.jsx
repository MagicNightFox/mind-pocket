import CharacterDataList from "../character-list.jsx";
import {Container} from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import TopBar from "../../../components/topbar/top-bar.jsx";
import Button from "@mui/material/Button";
const CharacterList = () => {
  return <Box>
    <TopBar title="Goon Cave"/>
    <Container>
      <h1 style={{padding:"16px"}}>Simp List</h1>
      <Box>

        <CharacterDataList />
      </Box>
    </Container>
  </Box>
}

export default CharacterList;