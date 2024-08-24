import React, { useEffect, useRef, useState } from "react";
import * as Icon from "../../icons";

function StarredList() {
    const [favouriteList, setFavouriteList] = useState([]); 

    function changeFavourite(index) {
      let items = [...favouriteList];
  
      items[index] = {...items[index], "isFavourite" : !items[index]?.isFavourite};
      setFavouriteList(items);
    } 
  
    useEffect(() => {
      let list = [{"index" : 0, "isFavourite" : false},
                  {"index" : 1, "isFavourite" : false},
                  {"index" : 2, "isFavourite" : false},
                  {"index" : 3, "isFavourite" : false},
                  {"index" : 4, "isFavourite" : false}]
  
      setFavouriteList(list)
    }, [])

    return (<>
      <div className="px-6 grid grid-cols-1 md:grid-cols-1 xl:grid-cols-3 pt-[70px] gap-[40px] pb-[120px]">
        <div className="col-span-1 md:col-span-1 xl:col-span-2">
          <div className="flex flex-col gap-[24px]">
            <div className="flex flex-row justify-start items-end">
                <p className="text-16 font-normal leading-30 font-plus">Starred songs</p>
            </div>
            <div className="overflow-x-auto  x-scrollable-tag mt-4">
              <table className="w-full table-auto text-sm text-left rtl:text-right text-gray-500 dark:text-gray-800 min-w-[385px]">
                <thead className="border-b dark:border-gray-700 text-sm text-gray-700 bg-transparent dark:bg-primary" style={{color: "white"}}>
                  <tr>
                      <th scope="col" className="px-4 pb-5 text-center">
                          # 
                      </th>
                      <th scope="col" className="px-4 pb-5 text-center">
                          Title
                      </th>
                      <th scope="col" className="px-4 pb-5 text-center">
                      </th>
                      <th scope="col" className="px-4 pb-5 text-center">                    
                      </th>
                      <th scope="col" className="px-4 pb-5 text-center">                    
                      </th>
                  </tr>
              </thead>
              <tbody>
                  {favouriteList.map((item, index) => { 
                    return ((
                    <tr style={{color: "white"}} className="group font-normal border-b bg-transparent border-gray-700 cursor-pointer group hover:bg-primary-800 transition-all duration-200 ease-in-out dark" key={index}>
                      <td className="text-center relative flex justify-center w-full items-center">
                        <img className="opacity-0 group-hover:opacity-100 absolute top-3 right-0" style={{width: "43px", height:"34px"}} src="/demo/assets/list_player.svg"/>
                        <span className="opacity:100 group-hover:opacity-0 absolute top-5 right-4">1</span>
                      </td>
                      <td className="px-4 py-3 text-center group-hover:text-darkblue-500 align-middle">
                        <div className="flex justify-center w-full items-center flex-row">
                          <img className="rounded-2" src="/demo/assets/avatar_list.png"/>
                          <p className="pl-2">Lorem ipsum dolor sit amet</p>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-center group-hover:text-darkblue-500">3:03</td>
                      <td className="px-4 py-3 text-center" onClick={() => changeFavourite(index)}> {item?.isFavourite? (<Icon.FullStarIcon/>) : (<Icon.StarIcon/>)} </td>
                      <td className="px-4 py-3 text-center"><img className="rounded-2" src="/demo/assets/option.svg"/></td>
                    </tr>
                  )) } )}
                </tbody>
              </table>
            </div>
            <a className="outline-btn text-12 px-4 py-2 font-medium rounded-[20px] w-full" 
                style={{border: '2px solid white', textAlign: 'center', cursor: 'pointer', width:"124px"}}>Show more</a>
          </div>
        </div>
        <div className="col-span-1 md:col-span-1 xl:col-span-1 pt-[10px] md:pt-[10px] xl:pt-[80px] gap-[6px]">
          <div className="flex flex-row">
            <div className="font-plus text-16 font-normal leading-[20px] pr-2">Starred songs</div>
            <Icon.FullStarIcon/>
          </div>
          <div className="flex flex-col w-full items-center pt-[6px]">
            <div className="flex flex-row w-full items-center justify-around gap-[10px] p-[10px]">
              <img className="w-[36px] h-[36px]" src="/demo/assets/starred_icon.png"/>
              <p className="font-plus text-center font-normal text-14 leading-[17px] text-white">Rock classic</p>
              <img src="/demo/assets/option.svg"/>
            </div>
            <div className="flex flex-row w-full items-center justify-around gap-[10px] p-[10px]">
              <img className="w-[36px] h-[36px]" src="/demo/assets/starred_icon.png"/>
              <p className="font-plus text-center font-normal text-14 leading-[17px] text-white">Rock classic</p>
              <img src="/demo/assets/option.svg"/>
            </div>
            <div className="flex flex-row w-full items-center justify-around gap-[10px] p-[10px]">
              <img className="w-[36px] h-[36px]" src="/demo/assets/starred_icon.png"/>
              <p className="font-plus text-center font-normal text-14 leading-[17px] text-white">Rock classic</p>
              <img src="/demo/assets/option.svg"/>
            </div>
            <div className="flex flex-row w-full items-center justify-around gap-[10px] p-[10px]">
              <img className="w-[36px] h-[36px]" src="/demo/assets/starred_icon.png"/>
              <p className="font-plus text-center font-normal text-14 leading-[17px] text-white">Rock classic</p>
              <img src="/demo/assets/option.svg"/>
            </div>
            <div className="flex flex-row w-full items-center justify-around gap-[10px] p-[10px]">
              <img className="w-[36px] h-[36px]" src="/demo/assets/starred_icon.png"/>
              <p className="font-plus text-center font-normal text-14 leading-[17px] text-white">Rock classic</p>
              <img src="/demo/assets/option.svg"/>
            </div>
          </div>
        </div>
      </div>
    </>)
}

export default StarredList;