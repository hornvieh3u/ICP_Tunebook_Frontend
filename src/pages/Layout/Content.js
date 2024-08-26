import React from "react";
import { useSelector } from "../../store";
import Header from "./Header";

function Content({ children }) {
  const { isSports, isTable } = useSelector((state) => state.menu);
  return (
    <div className="h-full w-full relative">
      <Header/>
      <div className="w-full h-full pt-16">{children}</div>
    </div>
  );
}

export default Content;
