// admin routes
// import {
//   Dashboard,
//   AdminProfile
// } from "views/admin/";

// canvas routes
import Assets from "views/canvas/UserProfile.jsx";
import UserProfile from "views/canvas/UserProfile.jsx";
import * as DS from "views/canvas/UserProfile.jsx";
import * as ADMIN from "./views/admin";


var routes = [{
    path: "/dashboard",
    name: "Dashboard",
    icon: "tim-icons icon-chart-pie-36",
    component: ADMIN.Dashboard,
    layout: "/admin"
  },
  {
    path: "/profile",
    name: "Admin Profile",
    icon: "tim-icons icon-single-02",
    component: ADMIN.UserProfile,
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