import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";

import 'primereact/resources/themes/viva-light/theme.css';  // Choose a theme
import 'primereact/resources/primereact.min.css';
import 'react-languages-select/css/react-languages-select.css';

import "./assets/css/css/Plus.css";
import "./assets/css/tailwind.output.css";
import "./assets/css/global.css";
import "./assets/css/originals/games.css";

import { BrowserRouter as Router } from "react-router-dom";
import { Windmill } from "@windmill/react-ui";
import * as serviceWorker from "./serviceWorker.js";
import _theme from "./theme.js";
import Loadable from "react-loadable";
import { APIProvider } from "./context/ApiContext.jsx";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import AppLoader from "./components/Loader/AppLoader.js";
import { store, persister, useSelector, dispatch } from "./store";
import Application from "./App.js";
import { useTranslation, I18nextProvider } from 'react-i18next';
import { SidebarProvider } from "./context/SidebarContext.js";

import { ThemeProvider } from "@material-tailwind/react";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <SidebarProvider>
      <PersistGate loading={null} persistor={persister}>
        <Provider store={store}>
          <APIProvider>
            <Router>
              <Suspense fallback={<AppLoader isPercentage={false}/>}>
                <Windmill theme={_theme} dark>
                  <ThemeProvider>
                    <Application />
                  </ThemeProvider>
                </Windmill>
              </Suspense>
            </Router>
          </APIProvider>
        </Provider>
      </PersistGate>
  </SidebarProvider>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
