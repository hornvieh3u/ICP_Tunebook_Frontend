import React, { useContext, Suspense, useEffect, lazy } from "react";
import { Switch, Route, Redirect, useLocation } from "react-router-dom";
import routes from "../../routes";

import Sidebar from "../Sidebar";
import Main from "../Main/Main";
import { SidebarContext } from "../../context/SidebarContext";
import AudioPlayer from "../Player/AudioPlayer";
import { useState } from "react";
import PageLoader from "../../components/Loader/PageLoader";
import LoadingOverlay from "../../components/Loader/LoadingOverlay";
import { useSelector } from "../../store";

function Layout() {
  const { isLoggedIn } = useSelector(
    (state) => state.auth
  );
  const { isSidebarOpen, closeSidebar } = useContext(SidebarContext);
  const [delayed, setDelayed] = useState(true);
  const Page404 = lazy(() => import("../404"));

  let location = useLocation();

  useEffect(() => {
    // Simulating a delay of 2 seconds
    const timer = setTimeout(() => {
      setDelayed(false);
    }, 2000);

    return () => clearTimeout(timer); // Cleanup timer on component unmount
  }, []);

  useEffect(() => {
    closeSidebar();
  }, [location]);

  return (
    <div
      className={`flex h-screen bg-green-450 w-full flex-row text-white`}>
      <div className="flex flex-col flex-1 w-full h-full overflow-y-auto y-scrollable-tag">
        <Main>
          <LoadingOverlay/>
          <Suspense fallback={<PageLoader />}>
            <Switch>
              {routes.map((route, i) => {
                return route.component ? (
                  !isLoggedIn && route.auth ? (
                    <Route
                      key={i}
                      path={`/app${route.path}`}
                      render={() => <Redirect to="/" />}
                    />
                  ) : (
                    <Route
                      key={i}
                      path={`/app${route.path}`}
                      render={(props) => <route.component {...props} />}
                    />
                  )
                ) : null;
              })}
              <Route component={Page404} />
            </Switch>
          </Suspense>
        </Main>
      </div>

      <AudioPlayer/>
    </div>
  );
}

export default Layout;
