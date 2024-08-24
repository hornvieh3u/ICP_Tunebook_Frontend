import React, { useEffect, useRef, useState, useContext } from "react";
import { APIContext } from "../../context/ApiContext";
import { useSelector } from "../../store";
import { WasmFileInput } from "../../components/DragDrop/WasmFileInput";
import loading from "../../utils/Loading";

function UpgradeContent() {
    const [arrayBuffer, setArrayBuffer] = useState(null);

    const uploadFiles = (file) => {
      const reader = new FileReader();

      // When the file has been read...
      reader.onload = () => {
        // Convert the file to an ArrayBuffer
        const buffer = reader.result;
        // Convert the ArrayBuffer to a Uint8Array
        const uint8Array = new Uint8Array(buffer);
        setArrayBuffer(uint8Array);

        // Log the Uint8Array to see its contents in the console
        console.log(uint8Array);
      };

      // Read the file as an ArrayBuffer
      reader.readAsArrayBuffer(file);
    }

    const updateContentCanister = () => {
      loading(true)
    } 

  return (<>
    <div className="flex flex-row justify-start items-end pt-[20px] mb-[150px]">
      <div className="w-full">
        <div className="overflow-x-auto x-scrollable-tag mt-4 flex flex-col items-center">
          <WasmFileInput
              onUpload={uploadFiles}
              formats={["wasm"]}
          />

          <a className="cursor-pointer fill-btn-primary text-14 px-4 py-2 mt-4 font-medium bg-darkblue-600 rounded-8 flex flex-row justify-center gap-45 items-center" onClick={() => updateContentCanister()} style={{textAlign: 'center', cursor: 'pointer', width:'120px'}}>
            <p>Upload</p>
            <img className="" src="/demo/assets/arrow-add.svg"/>
          </a>
        </div>
      </div>
    </div>
  </>)
}

export default UpgradeContent;