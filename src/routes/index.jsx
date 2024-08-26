/**
 * ⚠ These are used just to render the Sidebar!
 * You can include any link here, local or external.
 *
 * If you're looking to actual Router routes, go to
 * `routes/index.js`
 */
import { lazy } from "react";

const Login = lazy(() => import("../pages/LogIn"));
const Home = lazy(() => import("../pages/Home"));
const Tunes = lazy(() => import("../pages/Tunes"));
const Playground = lazy(() => import("../pages/Playground"));
const Profile = lazy(() => import("../pages/Profile"));
const MyTunes = lazy(() => import("../pages/Profile/MyTune"));
const Friends = lazy(() => import("../pages/Profile/Friends"));
const Sessions = lazy(() => import("../pages/Sessions"));

const Page404 = lazy(() => import("../pages/404"));
const Blank = lazy(() => import("../pages/Blank"));

const routes = [
  {
    path: "/home",
    icon: "./home.svg",
    name: "Home",
    role: "user",
    component: Home,
  },
  {
    path: "/tunes",
    icon: "./home.svg",
    name: "Home",
    role: "user",
    component: Tunes,
  },
  {
    path: "/my_tunes",
    icon: "./home.svg",
    name: "Home",
    role: "user",
    component: MyTunes,
  },
  {
    path: "/playground",
    icon: "./home.svg",
    name: "Home",
    role: "user",
    component: Playground,
  },
  {
    path: "/login",
    icon: "./home.svg",
    name: "Home",
    role: "user",
    component: Login,
  },
  {
    path: "/profile",
    icon: "LibarayIcon",
    name: "Profile",
    auth: false,
    role: "user",
    component: Profile,
  },
  {
    path: "/sessions",
    icon: "./home.svg",
    name: "Sessions",
    auth: false,
    role: "user",
    component: Sessions,
  },
  {
    path: "/friends",
    icon: "./home.svg",
    name: "Friends",
    auth: false,
    role: "user",
    component: Friends,
  },
];

export default routes;
