import TopBar from "../../components/topbar/top-bar.jsx";
import {Container} from "@mui/material";
import Box from "@mui/material/Box";
import CharacterDataList from "../../subapps/fic-pocket/character-list.jsx";

const breadcrumbs = [
    {link: "/fiction", title: "Fiction Hub"},
    {link: "/fiction/character/list", title: "Simp List"}
];

const CharacterListPage = () => {
    return <Box>
        <TopBar breadcrumbList={breadcrumbs}/>
        <Container>
            <h1 style={{padding:"16px"}}>Simp List</h1>
            <Box>
                <CharacterDataList />
            </Box>
        </Container>
    </Box>
}

export default CharacterListPage;