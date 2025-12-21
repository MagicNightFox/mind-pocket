import CharacterDataList from "../components/character-list.jsx";
import {Container} from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
const Characters = () => {
  return <Container>

    <Container>
      <Toolbar/>
      <h1 style={{padding:"16px"}}>Simp List</h1>

      <CharacterDataList />
    </Container>
  </Container>
}

export default Characters;