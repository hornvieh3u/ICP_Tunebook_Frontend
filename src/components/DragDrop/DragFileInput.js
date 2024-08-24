import { useRef, useEffect, useState } from "react";
import alert from "../../utils/Alert";

export function DragFileInput({
  onUpload,
  formats
}) {
    const dropContainer = useRef(null);
    const [dragging, setDragging] = useState(false);
    const fileRef = useRef(null);
    const [filename, setFilename] = useState("");

    function handleDrop(e, type) {
        let files;
        if (type === "inputFile") {
        files = [...e.target.files];
        } else {
        e.preventDefault();
        e.stopPropagation();
        setDragging(false);
        files = [...e.dataTransfer.files];
        }

        let file = files[0];

        let isFileValid = false;

        isFileValid = formats.some((format) => file.type.endsWith(`${format}`))

        if(!isFileValid) {
            alert("warning", `Invalid file format. Please only upload ${formats
                .join(", ")
                .toUpperCase()}`);
            
            return;
        } 

        if(file.size > 10 * 1024 * 1024) {
            alert("warning", `Invalid file size. Please only upload the smaller than 10MB`);
            
            return;
        }

        setFilename(file.name);

        onUpload(file);
    }

    async function convertFileBase64(file) {
        return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            resolve(reader.result);
        };
        reader.onerror = (error) => {
            reject(error);
        };
        });
    }

    useEffect(() => {
        function handleDragOver(e) {
        e.preventDefault();
        e.stopPropagation();
        setDragging(true);
        }
        function handleDragLeave(e) {
        e.preventDefault();
        e.stopPropagation();
        setDragging(false);
        }
        dropContainer.current.addEventListener("dragover", handleDragOver);
        dropContainer.current.addEventListener("drop", handleDrop);
        dropContainer.current.addEventListener("dragleave", handleDragLeave);

        return () => {
        if (dropContainer.current) {
            dropContainer.current.removeEventListener("dragover", handleDragOver);
            dropContainer.current.removeEventListener("drop", handleDrop);
            dropContainer.current.removeEventListener("dragleave", handleDragLeave);
        }
        };
    }, []);

    return (
        <>
        {/* Container Drop */}
        <div
            className={`${
            dragging
                ? "border-dashed border-[#2B92EC] bg-primary-700"
                : "border-dashed border-[#e0e0e0]"
            } flex items-center justify-center w-full mx-auto text-center border-2 rounded-md mt-4 py-5`}
            ref={dropContainer}
        >
            <div className="flex-1 flex flex-col">
            <div className="text-[14px] font-normal text-gray-200">
                <input
                className="opacity-0 hidden"
                type="file"
                accept="audio/mp3, audio/wav, audio/aac, audio/ogg"
                ref={fileRef}
                onChange={(e) => handleDrop(e, "inputFile")}
                />
                <span
                className="text-blue-500 font-bold cursor-pointer"
                onClick={() => {
                    fileRef.current.click();
                }}
                >
                Click to upload
                </span>{" "}
                or drag and drop
            </div>
            <div className="text-[12px] px-2 font-normal text-gray-200">
                Only files MP3, WAV, FLAC (Can't upload the file bigger than 10MB)
            </div>
            <p className="text-[16px] font-normal text-green-500">{filename}</p>
            </div>
        </div>
        </>
    );
}
