import TopBar from "../../components/topbar/top-bar.jsx";
const breadcrumbs = [
    {link: "/fiction", title: "Fiction"}
];
const FictionDashboardRoute = () => {
    return <>
        <TopBar breadcrumbList={breadcrumbs}/>
    </>
}

export default FictionDashboardRoute;