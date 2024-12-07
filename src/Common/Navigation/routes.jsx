

import HomeIcon from "@mui/icons-material/Home";
import PostAddIcon from "@mui/icons-material/PostAdd";
import MailIcon from "@mui/icons-material/Mail";
import PeopleIcon from "@mui/icons-material/People";
import NotificationsIcon from "@mui/icons-material/Notifications";
import GroupsIcon from "@mui/icons-material/Groups";
import PagesIcon from "@mui/icons-material/Pages";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import SettingsIcon from "@mui/icons-material/Settings";
import Home from "../../Pages/Home";

const routes = [

    {
        text: "Home",
        icon: <HomeIcon />,
        path: 'home',
        element:<Home/>
    },


    // { text: "Post", icon: <PostAddIcon /> },

    // { text: "Messages", icon: <MailIcon /> },

    // { text: "Friends", icon: <PeopleIcon /> },

    // { text: "Notifications", icon: <NotificationsIcon /> },

    // { text: "Group", icon: <GroupsIcon /> },

    // { text: "Pages", icon: <PagesIcon /> },

    // { text: "Games", icon: <SportsEsportsIcon /> },

    // { text: "Setting", icon: <SettingsIcon /> },
]

export default routes;