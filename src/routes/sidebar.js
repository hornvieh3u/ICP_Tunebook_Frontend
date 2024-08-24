/**
 * ⚠ These are used just to render the Sidebar!
 * You can include any link here, local or external.
 *
 * If you're looking to actual Router routes, go to
 * `routes/index.js`
 */

const routes = [
  {
    path: "/app/home",
    icon: "./home.svg",
    name: "Home",
    role: "user",
  },
  {
    path: "/app/profile",
    icon: "./home.svg",
    name: "Profile",
    role: "user",
    auth: true, 
  }
];

export default routes;
