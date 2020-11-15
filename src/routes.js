/*!

=========================================================
* Argon Dashboard React - v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Index from "views/Index.js";
import Profile from "views/examples/Profile.js";
import PublicProfile from "views/examples/PublicProfile";
// import Maps from "views/examples/Maps.js";
import Login from "views/examples/Login.js";
import Logout from "views/examples/Logout";
import SupportCentre from "views/examples/SupportCentre";
import SupportAdmin from "views/examples/ManagerAbsence"
// import Tables from "views/examples/Tables.js";
// import Icons from "views/examples/Icons.js";

var routes = [
  {
    path: "/index",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: Index,
    layout: "/dash"
  },
  // {
  //   path: "/icons",
  //   name: "Icons",
  //   icon: "ni ni-planet text-blue",
  //   component: Icons,
  //   layout: "/dash"
  // },
  // {
  //   path: "/maps",
  //   name: "Maps",
  //   icon: "ni ni-pin-3 text-orange",
  //   component: Maps,
  //   layout: "/dash"
  // },
  {
    path: "/user-profile",
    name: "User Profile",
    icon: "ni ni-single-02 text-yellow",
    component: Profile,
    layout: "/dash"
  },
  {
    path: "/user/:id",
    name: "User Profile",
    icon: "ni ni-single-02 text-yellow",
    component: PublicProfile,
    layout: "/dash",
    invisible: true
  },
  // {
  //   path: "/tables",
  //   name: "Tables",
  //   icon: "ni ni-bullet-list-67 text-red",
  //   component: Tables,
  //   layout: "/dash"
  // },
  {
    path: "/login",
    name: "Login",
    icon: "ni ni-key-25 text-info",
    component: Login,
    layout: "/auth",
    invisible: true
  },
  {
    path: "/logout",
    name: "Logout",
    icon: "ni ni-key-25 text-info",
    component: Logout,
    layout: "/auth",
    invisible: true
  },
  {
    path: "/support",
    name: "Support Centre",
    icon: "ni ni-app text-info",
    component: SupportCentre,
    layout: "/dash"
  },
  {
    path: "/support-admin",
    name: "Support Admin",
    icon: "ni ni-app text-info",
    component: SupportAdmin,
    layout: "/dash",
    invisible: true
  }
];
export default routes;
