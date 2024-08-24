import React, { useContext, useEffect, useState } from "react";
import { SidebarContext } from "../../context/SidebarContext";
import {
  NotificationIcon, ProfileIcon, LogoutIcon, MenuIcon,
  MusicIcon
} from "../../icons";
import { Avatar} from "@windmill/react-ui";
import { useDispatch, useSelector } from "../../store";
import { Logout, SetBalances, UpdateBalances } from "../../store/reducers/auth";
import { Menu } from '@headlessui/react';
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { ShowModal } from "../../store/reducers/menu";

function Header() {
  const history = useHistory();
  const { toggleSidebar } = useContext(SidebarContext);
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const { headerTitle } = useSelector((state) => state.auth);
  // eslint-disable-next-line no-unused-vars
  const [avatar, setAvatar] = useState('');
  const [title, setTitle] = useState('Celtic Crossroads')

  const [displayName, setDisplayName] = useState('');

  const logout = () => {
    history.push("/");
    dispatch(Logout({}))
  }

  useEffect(() => {
    if (auth.isLoggedIn) {
    }
  }, [auth.isLoggedIn]);

  useEffect(() => {
    setDisplayName(auth.user.displayname);

    setAvatar(auth.user.avatar);
  }, [auth.user]);

  useEffect(() => {
    if(headerTitle)
      setTitle(headerTitle);
  }, [headerTitle]);


  return (
    <>
      <div className={`absolute z-40 bg-white px-4 flex justify-between h-16 flex flex-row items-center w-full`}>
        <div className="flex flex-row justify-start items-center gap-2">
            <MusicIcon className="w-24 h-24 pl-8" aria-hidden="true" />
            <p className="text-darkblue-800 text-[20px]">{title}</p>
        </div>
        <div className="flex flex-row justify-end items-center gap-3">
          {auth.isLoggedIn && (
            <p className="text-darkblue-800 text-[16px] font-bold cursor-pointer" onClick={() => {history.push("/app/profile")}}>Profile</p> 
          )}
          <p className="text-darkblue-800 text-[16px] font-bold cursor-pointer" onClick={() => {history.push("/app/tunes")}}>Browse Tunes</p>
          {/* <p className="text-darkblue-800 text-[16px] font-bold cursor-pointer">Browse People</p> */}
          <p className="text-darkblue-800 text-[16px] font-bold cursor-pointer">Sessions</p>
          {auth.isLoggedIn && (
            <p className="text-darkblue-800 text-[16px] font-bold cursor-pointer" onClick={() => {logout()}}>Log out</p>
          )}
        </div>
      </div>
    </>
  );
}

export default Header;
