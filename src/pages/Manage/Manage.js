import React, { useEffect, useRef, useState } from "react";

import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { dispatch, useDispatch, useSelector } from "../../store";
import { ShowModal } from "../../store/reducers/menu";
import UpgradeAccount from "./UpgradeAccount";
import UpgradeContent from "./UpgradeContent";

function Manage() {
  const history = useHistory();
  const [activeTab, setActiveTab] = useState('');

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };

  const TabContent = ({ id, activeTab, children }) => (
    <div
      style={{
        display: id === activeTab ? 'block' : 'none'
      }}
    >
      {id === activeTab && children}
    </div>
  );

  useEffect(() => {
    setActiveTab('Account')
  }, [])

  return (
    <>
      <div className="flex flex-col pt-16 font-plus pl-6 pr-6 text-white relative">
        <div className="absolute flex flex-row justify-start items-end z-index-1">
            <p className="text-24 font-normal leading-30 font-plus">Manage Canister</p>
            <img className="px-3" src="/demo/assets/right_arrow.svg"></img>
        </div>
        <div className="relative pt-[58px]">
            <div className="flex flex-col mx-auto">  
              <div>
                <ul className="tab-titles">
                  <li className={`${activeTab === 'Account' ? 'text-gray-200 border-gray-200' : 'text-gray-400 border-transparent'} inline-block cursor-pointer hover:text-gray-300 rounded-t-lg py-4 px-4 text-md font-medium text-center border-b-2`} onClick={() => handleTabClick('Account')}>Account</li>
                  <li className={`${activeTab === 'Content' ? 'text-gray-200 border-gray-200' : 'text-gray-400 border-transparent'} inline-block cursor-pointer hover:text-gray-300 rounded-t-lg py-4 px-4 text-md font-medium text-center border-b-2`} onClick={() => handleTabClick('Content')}>Content</li>
                </ul>
                <div className="tab-content">
                  <TabContent id="Account" activeTab={activeTab}>
                    <UpgradeAccount/>
                  </TabContent>
                  <TabContent id="Content" activeTab={activeTab}>
                    <UpgradeContent/>
                  </TabContent>
                </div>
              </div>     
            </div>
        </div>
      </div>
    </>
  );
}

export default Manage;
