import React, { useState } from "react";
import routes from "../../../routes/sidebar";
import { NavLink, Route, Link } from "react-router-dom";
import * as Icon from "../../../icons";
import { useDispatch, useSelector } from "../../../store";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import AuthComponent from "../../Auth/AuthComponent";

function SidebarContent() {
  const dispatch = useDispatch();
  const history = useHistory();

  const { isLoggedIn, user } = useSelector((state) => state.auth);
  const [isWalletMenuOpen, setIsWalletMenuOpen] = useState(false);

  return (
    <div className="text-gray-500 dark:text-gray-400 font-normal font-plus text-16 h-full" style={{padding: "20px 10px"}}>
      <div className="flex flex-col 
      h-full">
        <div className="py-2 px-8">
          <img src="/demo/assets/logo.png" alt="Tuned AI"/>
        </div>
        <div className="flex flex-row justify-start items-center pt-5 px-3 gap-45">
          <ul className="w-full gap-45 flex flex-col" key={isLoggedIn}>
            {routes.map((route) =>
              (route.icon? 
              ((!route.auth || isLoggedIn) && (route.role == "user" || (route.role == "admin" && user.role == "admin")) && 
              <li className="navli relative rounded-2 text-white hover:bg-primary-700 active:bg-primary-700" key={route.name}>
                <NavLink
                  exact
                  to={`${route.path}`}
                  isActive={(match, location) =>
                    location.pathname === `${route.path}` || location.pathname.startsWith(`${route.path}`)
                  }
                  className="parent-navlink inline-flex gap-45 rounded-2 py-45 px-4 items-center w-full"
                  activeClassName="parent-navlink-active bg-primary-700">
                    <Route path={`${route.path}`}/>
                      <span className="nav-border absolute inset-y-0 left-0 w-1 rounded-tl-2 rounded-bl-2"></span>                    
                      {route.name == "Home" && <Icon.HomeIcon/>}
                      {route.name == "Genres" && <Icon.GenresIcon/>}
                      {route.name == "Profile" && <Icon.ProfileSidebarIcon/>}
                      {route.name == "Manage" && <Icon.ManageIcon/>}
                      <span className="leading-20">{route.name}</span>
                </NavLink>
              </li>) : ("")))}
          </ul>
        </div>
        
        <div className="pt-6 text-white flex flex-row justify-center items-end px-3 w-full h-full gap-1 pb-8">
          <AuthComponent width={'247px'} height={'284px'}/>
        </div>

        {/* <div className="flex flex-col justify-end items-center text-white font-plus h-full px-3 pt-4" style={{paddingBottom: "120px"}}>          
            <div className="flex flex-col p-4 bg-primary-900 rounded-4 gap-4">
              <p className="text-16 font-semibold leading-20">You can receive part of the royalties of a song, just by listening it</p>
              <p className="text-14 font-light leading-18">All the royalties will be distributed using our own TunedCoin token</p>
              <a className="fill-btn-primary text-14 px-4 py-2 font-medium bg-darkblue-600 rounded-8 w-full flex flex-row justify-center gap-45 items-center" style={{textAlign: 'center', cursor: 'pointer'}}>Connect Wallet
                <img className="" src="/demo/assets/arrow-right.svg"/>
              </a>
            </div>

            <p className="text-14 font-light leading-18 pt-2">Loremipsu © 2022 Versión 1.1</p>            
        </div> */}
        
      </div>
    </div>
  );
}

export default SidebarContent;
