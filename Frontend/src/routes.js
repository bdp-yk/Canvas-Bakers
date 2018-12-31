// admin routes
import Dashboard from "views/admin/Dashboard.jsx";
import AdminProfile from "views/admin/UserProfile.jsx";

// canvas routes
import Assets from "views/canvas/UserProfile.jsx";
import UserProfile from "views/canvas/UserProfile.jsx";
import * as DS from "views/canvas/UserProfile.jsx";


var routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "tim-icons icon-chart-pie-36",
    component: Dashboard,
    layout: "/admin"
  },
  {
    path: "/profile",
    name: "Admin Profile",
    icon: "tim-icons icon-single-02",
    component: AdminProfile,
    layout: "/admin"
  },
  {
    path: "/Dashboard",
    name: "Dashboard",
    icon: "tim-icons icon-vector",
    component: DS,
    layout: "/canvas"
  },
  {
    path: "/assets",
    name: "Assets Work",
    icon: "tim-icons icon-components",
    component: Assets,
    layout: "/canvas"
  },
  {
    path: "/userprofile",
    name: "Profile",
    icon: "tim-icons icon-single-02",
    component: UserProfile,
    layout: "/canvas"
  }
];
export default routes;
