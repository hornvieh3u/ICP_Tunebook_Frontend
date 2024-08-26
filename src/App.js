import React, { lazy, useEffect, useMemo } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { Provider, useDispatch } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { I18nextProvider } from 'react-i18next';
import io from "socket.io-client";

import { Logout, UpdateBalance } from "./store/reducers/auth";
import { APIProvider } from "./context/ApiContext";
import { Toaster } from "react-hot-toast";
import { initFlowbite } from "flowbite";
import Alert from "./components/Alert/Alert";
import { AgentProvider } from "@ic-reactor/react"
import { useSelector } from "./store";
import { BASE_SOCKET_URL } from "./config";
import { authenticateSockets } from "./utils/socket";
import { NumberFix } from "./utils/format";
import alert from "./utils/Alert";

const Layout = lazy(() => import("./pages/Layout"));
const ModalLayout = lazy(() => import("./pages/Layout/Modal/ModalLayout"))

require("flowbite/dist/flowbite.js");

function App() {
  const history = useHistory();

  useEffect(() => {
    setTimeout(() => {
      initFlowbite();
    }, 2000);
  }, []);

  return (
    <>
      <ModalLayout/>
      <Switch>
        {/* Place new routes over this */}
        <Route index path="/app" component={Layout} />
        {/* If you have an index page, you can remothis Redirect */}
        <Redirect exact from="/" to="/app/login" />      
                
        <Route path="*" render={() => <Redirect to="/" />} />
      </Switch>
      <Alert/>
      <Toaster
        position="top-right"
        reverseOrder={false}
      />
    </>
  );
}

export default App;
