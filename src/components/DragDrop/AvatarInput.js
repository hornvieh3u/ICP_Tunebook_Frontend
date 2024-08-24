import { useRef, useEffect, useState } from "react";
import alert from "../../utils/Alert";
import { Avatar } from "@windmill/react-ui";

import ImageUploading from "react-images-uploading";
import Cropper from "react-easy-crop";
import { cropImage } from "../../utils/cropUtils";
import { EditProfileIcon } from '../../icons';

const ImageCropper = ({
    open,
    image,
    onComplete,
    containerStyle,
    ...props
  }) => {
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  
    return (
        <dialog open={open} className="w-full py-4 px-8" style={{zIndex: "30"}}>
            <span className="font-bold text-[16px]">Crop Image</span>    
            <div style={containerStyle}>
                <Cropper
                image={image}
                crop={crop}
                zoom={zoom}
                cropShape={"round"}
                aspect={1}
                onCropChange={setCrop}
                onCropComplete={(_, croppedAreaPixels) => {
                    setCroppedAreaPixels(croppedAreaPixels);
                }}
                onZoomChange={setZoom}
                {...props}
                />
            </div>
            <span className="font-bold text-[16px] pt-2 mt-2 cursor-pointer"
                onClick={() =>
                onComplete(cropImage(image, croppedAreaPixels, console.log))
                }>
                Save & Done
            </span>
        </dialog>
    );
};

export function AvatarInput({avatar, setAvatar}) {
    const dropContainer = useRef(null);
    const [dragging, setDragging] = useState(false);
    const [filename, setFilename] = useState("");
    const [image, setImage] = useState([]);
    const [croppedImage, setCroppedImage] = useState(null);
    const [dialogOpen, setDialogOpen] = useState(false);

    function handleCroppedImage(image) {
        setCroppedImage(image);
        setAvatar(image);
    }

    const ImageUploadingButton = ({ value, onChange, ...props }) => {
        return (
          <ImageUploading value={value} onChange={onChange}>
            {({ onImageUpload, onImageUpdate }) => (
                <div className="flex px-4 py-4">
                    <div className="relative cursor-pointer flex justify-center items-center z-20">
                        <Avatar className="w-[100px] h-[100px] absolute rounded-md cursor-pointer" src={croppedImage? croppedImage : avatar? avatar : "/demo/assets/avatar.png"} 
                            {...props}
                            alt="blab"/>

                        <div className='absolute top-0 left-0 w-[100px] h-[100px]' style={{borderRadius:"50%", backgroundColor: "rgba(0, 0, 0, 0.45)"}} onClick={value ? onImageUpload : () => onImageUpdate(0)}></div>
                        <div className="absolute" style={{width:"30px", height:"30px", zIndex:"10"}} onClick={value ? onImageUpload : () => onImageUpdate(0)}>
                            <EditProfileIcon/>
                        </div>
                    </div>
                </div>
            )}
          </ImageUploading>
        );
    };

    return (
        <>
        {/* Container Drop */}
        <div
            className={`flex items-center justify-center mx-auto text-center mt-16 py-2 px-4 h-20`} style={{width:"400px"}}
            ref={dropContainer}
        >
            <div className="flex-1 flex flex-col">
            <div className="flex justify-around items-center flex-col  text-[14px] font-normal text-gray-200">
                <ImageUploadingButton
                    value={image}
                    onChange={(newImage) => {
                    setDialogOpen(true);
                    setImage(newImage);
                    }}
                />
                <ImageCropper
                    open={dialogOpen}
                    image={image.length > 0 && image[0].dataURL}
                    onComplete={(imagePromisse) => {
                    imagePromisse.then((image) => {
                        handleCroppedImage(image);
                        setDialogOpen(false);
                    });
                    }}
                    containerStyle={{
                    position: "relative",
                    width: "100%",
                    height: 300,
                    background: "#ffffff"
                    }}
                />
            </div>
            <p className="text-[16px] font-normal text-darkblue-300">{filename}</p>
            </div>
        </div>
        </>
    );
}


