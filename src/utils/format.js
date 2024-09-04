import path from 'path-browserify';

export const formatDuration = (duration) => {
    const minutes = Math.floor(duration / 60);
    const seconds = Math.floor(duration % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};

export const stringToBlob = (text) => {
    const blob = new Blob([text], { type: 'text/plain' });
    return blob;
}

export const blobToString = (blob) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = function() {
            resolve(reader.result);
        };
        reader.onerror = reject;
        reader.readAsText(blob);
    });
}

export const base64ToBlob = (base64, contentType = '', sliceSize = 512) => {
    const byteCharacters = atob(base64); // Decode base64 to binary string
    const byteArrays = [];

    // Create byte arrays from the binary string
    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        const slice = byteCharacters.slice(offset, offset + sliceSize);

        const byteNumbers = new Array(slice.length);
        for (let i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
        }

        const byteArray = new Uint8Array(byteNumbers);
        byteArrays.push(byteArray);
    }

    // Create a blob from the byte arrays
    const blob = new Blob(byteArrays, {type: contentType});
    return blob;
}

export const base64ToStreamBlob = (base64) => {
  const binaryString = atob(base64);
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return new Blob([bytes], { type: 'application/octet-stream' });
}

export const convertToDataURL = (blob) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);  // Resolve the promise with the data URL on success
        reader.onerror = () => reject(reader.error);   // Reject the promise on error
        reader.readAsDataURL(blob);
    });
}

export const convertImageToBase64 = async (imageUrl) => {
  try {
    if(!imageUrl)
      return null

    const response = await fetch(imageUrl);

    const blob = await response.blob();

    if(blob.size == 0)
      return null

    const base64 = await new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(blob);
      fileReader.onload = () => {
        resolve(fileReader.result)
      } ;
      fileReader.onerror = (error) => reject(error);
    });

    return base64;
  } catch (error) {
    console.error('Error converting image to base64:', error);
  }
};

export const encodeArrayBuffer = (file) => {
    return Array.from(new Uint8Array(file));
}

export const getBinaryFileSizeFromBase64 = (base64String) => {
    // Remove any Data URL prefix (optional)
    const base64Data = base64String.replace(/^data:image\/[a-z]+;base64,/, '');

    // Calculate the file size in bytes
    const byteLength = (base64Data.length * 3) / 4; // Exclude padding characters from base64 ('=')
    
    // Adjust calculations for padding characters
    if (base64Data.endsWith('==')) {
        return byteLength - 2;
    } else if (base64Data.endsWith('=')) {
        return byteLength - 1;
    }

    return byteLength;
}

export const getReverseFileExtension = (type)=> {
    switch(Object.keys(type)[0]) {
      case 'jpeg':
        return  'image/jpeg';
      case 'gif':
        return  'image/gif'; 
      case 'jpg':
        return  'image/jpg';       
      case 'png':
        return  'image/png';
      case 'svg':
        return  'image/svg';
      case 'avi':
        return  'video/avi';
      case 'mp4':
        return  'video/mp4';
      case 'aac':
        return  'video/aac';
      case 'wav':
        return  'audio/wav';
      case 'mp3':
        return  'audio/mp3';                                                                                                              
      default :
      return "";
    }
  };
  
export const getFileExtension = (type) => {
  switch(type) {
    case 'image/jpeg':
      return { 'jpeg' : null };
    case 'image/gif':
      return { 'gif' : null };
    case 'image/jpg':
      return { 'jpg' : null };
    case 'image/png':
      return { 'png' : null };          
    case 'image/svg':
      return { 'svg' : null };          
    case 'video/avi':
      return { 'avi' : null };                            
    case 'video/aac':
      return { 'aac' : null };
    case 'video/mp4':
      return { 'mp4' : null };        
    case 'audio/wav':
      return { 'wav' : null };                         
    case 'audio/mp3':
      return { 'mp3' : null };
    default :
    return null;
  }
};

export const formatDate = (timestamp) => {
  const dateObject = new Date(timestamp);

  const options = {
    year: 'numeric',   // e.g., "2020"
    month: 'long',     // "January" through "December"
    day: 'numeric',    // 1, 2, 3, ..., 31
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  };

  const formattedDateTime = dateObject.toLocaleString('en-US', options);
  return formattedDateTime;
}

export const isAdmin = (principal) => {
  const manager = ['efgt6-hgbiw-3ufoz-quje7-knvpa-fd7h5-pitrf-5fzqj-oclaa-mzpiz-nqe', ''];

  return manager.includes(principal);
}

export const getSuffleNumber = (min, max, currentValue) => {
  let randomNumber;
  do {
    randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  } while (randomNumber === currentValue);
  return randomNumber;
}

export const encodeToBase64 = (data) => {
  return btoa(data);
}

export const decodeFromBase64 = (base64Data) => {
  return atob(base64Data);
}

export const getFileNameWithoutExtension = (filePath) => {
  return path.basename(filePath, path.extname(filePath));
}

export const convertUInt8ArrToImageData = async Uint8Arr => {
  
  if (!Uint8Arr) return;

  const chunks = [];
  chunks.push(new Uint8Array(Uint8Arr).buffer);

  const blob = new Blob(chunks, {type : "image/jpeg"});
  return await convertToDataURL(blob);
}

export const convertImageDataToUInt8Arr = async imageData => {

  if (!imageData) return new Uint8Array();

  let matches = imageData.match(/data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+);base64,/);
  let avatarImage = imageData.replace(/^data:(.*,)?/, '');
  if ((avatarImage.length % 4) > 0) {
      avatarImage += '='.repeat(4 - (avatarImage.length % 4));
  }
  
  const imageBlob = base64ToBlob(avatarImage, matches[1]);
  let bsf = await imageBlob.arrayBuffer();     
  
  return new Uint8Array(bsf);
}