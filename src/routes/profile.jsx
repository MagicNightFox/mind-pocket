import {Card, Container, Grid} from "@mui/material";
import TopBar from "../components/topbar/top-bar.jsx";
import {useAuth} from "../context/AuthContext.jsx";

const ProfilePage = props => {
  const {user} = useAuth();

  return <>
    <TopBar title="Profile"/>
  <Container maxWidth="lg">
    <h1>Profile</h1>
    <Grid container spacing={2}>
      <Grid size={4}><Card>Note</Card></Grid>
      <Grid size={8}><Card>Note</Card></Grid>
    </Grid>
    <Card>Note</Card>
  </Container>
  </>
}

export default ProfilePage;