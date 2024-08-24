import React, { useEffect, useRef, useState, memo, Suspense } from "react";

import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { dispatch, useDispatch, useSelector } from "../../store/index.js";
import { AvatarInput } from "../../components/DragDrop/AvatarInput.js";
import loading from "../../utils/Loading.js";
import { base64ToBlob, convertToDataURL, getBinaryFileSizeFromBase64 } from "../../utils/format.js";
import alert from "../../utils/Alert.js";
import { UpdateInfo } from '../../store/reducers/auth.js';
import Select from "react-tailwindcss-select";
import { instruments } from "../../const/variable.js";
import HttpAgentInit from "../../context/HttpAgentInit.js";

function Profile() {
  const history = useHistory();
  const [activeTab, setActiveTab] = useState('');
  const {user} = useSelector((state) => (state.auth));
  const [avatarData, setAvatarData] = useState("");
  const [username, setUsername] = useState("");
  const [placeOfBirth, setPlaceOfBirth] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [instrument, setInstrument] = useState([]);

  const { isLoggedIn } = useSelector(
    (state) => state.auth
  );

  const handleAvatar = async (image) => {   
    setAvatarData(image);
  }

  const goBack = async() => {
    history.goBack();
  }

  const saveProfile = async () => {
    try{
      if(!username || !avatarData || !placeOfBirth) {
        alert("warning", "Please input profile info exactly")
      } else if(instrument == null || instrument.length == 0) {
        alert("warning", "Please input profile info exactly")
      } else {            
        loading();

        if(getBinaryFileSizeFromBase64(avatarData) > 512000) {
            loading(false);

            alert('info', "File size shouldn't be bigger than 500Kb");

            return;
        }  
        
        let matches = avatarData.match(/data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+);base64,/);
        
        let avatarImage = avatarData.replace(/^data:(.*,)?/, '');
        if ((avatarImage.length % 4) > 0) {
            avatarImage += '='.repeat(4 - (avatarImage.length % 4));
        }
        
        const imageBlob = base64ToBlob(avatarImage, matches[1]);
        
        let bsf = await imageBlob.arrayBuffer();     
        
        const byteArray= new Uint8Array(bsf);

        const actor = await HttpAgentInit();

        await actor.update_profile(user.principal, username, placeOfBirth, instrument.map(value => value.value).join(", "), byteArray);
        let avatarUrl = '';

        const chunks = [];
        chunks.push(new Uint8Array(byteArray).buffer);
    
        const blob = new Blob(chunks, {type : "image/jpeg"});

        const result = await convertToDataURL(blob);

        avatarUrl = result;    

        let userInfo = {
          username: username,
          avatar:avatarUrl,
          instruments: instrument.map(value => value.value).join(", "),
          placeOfBirth: placeOfBirth,
          isInitialized: true
        }
          
        alert('success', "Success on updating profile")
        dispatch(UpdateInfo({userInfo : userInfo}));    
        loading(false)
      }
    } catch (err) {
      console.log(err.message);
      loading(false);
      alert('warning', "failure on updating profile")
    }
  }
  
  useEffect(() => {
    setUsername(user.username);
    setAvatarData(user.avatar);
    setPlaceOfBirth(user.placeOfBirth);
    
    const items = user.instruments.split(',').map(item => item.trim());

    
    if(items.length > 0 && items[0]!= '') {
      // console.log("aa", items[0])
      // Map each item to an object with value and label
      const resultArray = items.map(item => ({
          value: item,
          label: item
      }));

      setInstrument(resultArray);
    }
  }, [user])

  return (
    <>
      <div className="flex font-plus flex-row py-8 font-plus px-10 gap-8 text-darkblue-800 h-full">
        <div className="w-full h-full bg-white rounded-4 flex flex-row py-8 px-16">
            <div className="w-full h-full flex flex-col gap-4">
             {(!user.username || isEdit) && 
                (<>
                 <p className=" font-plus font-bold text-18 leading-22">Profile details</p>
                  <div className="flex flex-col justify-center items-center w-full">
                      <div className="relative cursor-pointer flex justify-center items-center z-20">
                          <AvatarInput avatar={user.avatar} setAvatar={handleAvatar}/>
                      </div>                                
                  </div>
                  <div className="flex flex-col justify-start w-full gap-[5px]">
                      <div className="flex flex-row justify-start items-center">
                          <p className="font-plus font-normal text-14 leading-20">User name</p>
                          <p className="text-14 text-coral-500">*</p>
                      </div>

                      <input className="py-2 pl-4 px-4 rounded-2 w-full font-light focus:border-transparent focus:outline-none" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)}  style={{
                          border: '1.5px solid #e5e7eb', // Set the border color to blue
                          height: '42px', // Adjust the font size as needed
                      }}/>
                  </div>
                  <div className="flex flex-col justify-start w-full gap-[5px]">
                      <div className="flex flex-row justify-start items-center">
                          <p className="font-plus font-normal text-14 leading-20">Place of Birth</p>
                          <p className="text-14 text-coral-500">*</p>
                      </div>

                      <input className="py-2 pl-4 px-4 font-light rounded-2 w-full font-light focus:border-transparent focus:outline-none font-bold" placeholder="Place of birth" value={placeOfBirth} onChange={(e) => setPlaceOfBirth(e.target.value)}  style={{
                          border: '1.5px solid #e5e7eb', // Set the border color to blue
                          height: '42px', // Adjust the font size as needed
                      }}/>
                  </div>
                  <div className="flex flex-col justify-start w-full gap-[5px]">
                      <div className="flex flex-row justify-start items-center">
                          <p className="font-plus font-normal text-14 leading-20">Instruments</p>
                          <p className="text-14 text-coral-500">*</p>
                      </div>

                      <Select
                          isMultiple={true}
                          placeholder="Select Instruments..."
                          value={instrument}
                          onChange={(value) => setInstrument(value)}
                          options={instruments}
                      />
                  </div>
                  <div className="flex flex-col justify-start w-full gap-[5px]">
                      <div className="flex flex-row justify-start items-center">
                          <p className="font-plus  font-normal text-14 leading-20">Principal</p>
                          <p className="text-14 text-coral-500">*</p>
                      </div>

                      <input readOnly className="py-2 pl-4 px-4 rounded-2 w-full font-normal focus:border-transparent focus:outline-none" placeholder="Username" value={user.principal}  style={{
                          border: '1.5px solid #e5e7eb', // Set the border color to blue
                          height: '42px', // Adjust the font size as needed
                      }}/>
                  </div>
                  <div className="flex flex-row justify-between items-center w-full gap-[30px] w-[231px] pt-2">
                      <a className="fill-btn-primary text-white text-12 px-4 py-2 font-medium bg-green-450 rounded-8 w-full flex flex-row justify-center gap-45 items-center" onClick={() => saveProfile()}
                          style={{textAlign: 'center', cursor: 'pointer'}}>
                          <img className="" src="/demo/assets/save.svg"/>
                          <p className='font-medium'>Save</p>
                      </a>
                      {(user.username) && (
                        <a className="fill-btn-primary text-white text-12 px-4 py-2 font-medium bg-green-450 rounded-8 w-full flex flex-row justify-center gap-45 items-center" onClick={() => setIsEdit(false)}
                            style={{textAlign: 'center', cursor: 'pointer'}}>
                            <p className='font-medium'>Back</p>
                        </a>
                      )}
                  </div>
                </>)}

                {(user.username && !isEdit) && (<>
                  <div className="w-full flex flex-row justify-start items-center gap-6">
                    <img className="rounded-[120px] w-40 h-40" src={avatarData}
                      style={{
                        border: '3px solid #faca15'
                      }}/>
                      <div className="flex flex-col justify-start items-start">
                        <p className="font-plus-bold text-24">{user.username}</p>
                        <p className="font-plus text-16 font-bold">{user.placeOfBirth}</p>
                        <p className="font-plus text-16 font-bold">Instruments: {instrument.map(value => value.value).join(", ")}</p>
                      </div>
                  </div>
                  <div className="w-full flex flex-row gap-4">
                      <a className="fill-btn-secondary text-12 w-36 px-4 py-2 text-white font-medium bg-green-450 rounded-8 flex flex-row justify-center gap-45 items-center"
                          style={{textAlign: 'center', cursor: 'pointer'}}>
                          <p className='text-white font-bold'> Friends List</p>
                      </a>
                      <a className="fill-btn-secondary text-12 w-36 px-4 py-2 text-white font-medium bg-green-450 rounded-8 flex flex-row justify-center gap-45 items-center"
                          style={{textAlign: 'center', cursor: 'pointer'}}
                          onClick={() => {history.push("/app/my_tunes")}}>
                          <p className='text-white font-bold'>My Tunebook</p>
                      </a>
                      <a className="fill-btn-secondary text-12 w-36 px-4 py-2 text-white font-medium bg-green-450 rounded-8 flex flex-row justify-center gap-45 items-center"
                          style={{textAlign: 'center', cursor: 'pointer'}}
                          onClick={() => {setIsEdit(true)}}>
                          <p className='text-white font-bold'> Edit Profile</p>
                      </a>
                  </div>
                </>)}
            </div>                    
            <div className="w-full h-full rounded-4 flex flex-col gap-4 p-8">
              <p className="font-plus-bold text-24">Newly Added Tunes by Friends</p>
              <div className="flex flex-row w-full justify-start items-center gap-4">                
                <p className="font-plus font-bold text-20">Sean just added 'The Mooncoin Jig' to their tunebook</p>
              </div>
              <div className="flex flex-row w-full justify-start items-center gap-4">                
                <p className="font-plus font-bold text-20">Maeve just added 'The Rights of Man' to their tunebook</p>
              </div>
              <div className="flex flex-row w-full justify-start items-center gap-4">                
                <p className="font-plus font-bold text-20">Liam just added 'The Banshee' to their tunebook</p>
              </div>
              <div className="flex flex-row w-full justify-start items-center gap-4">                
                <p className="font-plus font-bold text-20">Sean just added 'The Mooncoin Jig' to their tunebook</p>
              </div>
            </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
