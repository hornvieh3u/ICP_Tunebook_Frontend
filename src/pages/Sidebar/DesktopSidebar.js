import React from "react";

import SidebarContent from "./SidebarContent";

function DesktopSidebar(props) {
  return (
    <aside className="z-30 flex-shrink-0 hidden overflow-y-auto w-65 bg-primary-800 lg:block">
      <SidebarContent />
    </aside>
  );
}

export default DesktopSidebar;
