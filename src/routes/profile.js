/**
 * ⚠ These are used just to render the Sidebar!
 * You can include any link here, local or external.
 *
 * If you're looking to actual Router routes, go to
 * `routes/index.js`
 */
import { lazy } from "react";


const profile = lazy(() => import("../pages/Profile"));

const routes = [
  {
    path: "/",
    auth: true,
    component: profile,
  }
];

export default routes;
