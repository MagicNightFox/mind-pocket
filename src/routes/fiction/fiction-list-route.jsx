import TopBar from "../../components/topbar/top-bar.jsx";
import Fiction from "../../subapps/fic-pocket/fiction.jsx";

const breadcrumbs = [
    {link: "/fiction", title: "Fiction Hub"},
    {link: "/fiction/list", title: "Fiction List"}
];

const FictionListRoute = (props) => {
    return <>
        <TopBar breadcrumbList={breadcrumbs}/>
        <Fiction />
    </>
}

export default FictionListRoute