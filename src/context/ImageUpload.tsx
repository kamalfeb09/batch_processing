import React, { createContext, useContext, useState } from 'react'



const ImageModal=createContext({});

const ImageModalContext = ({children}) => {

    const [isImageModalOpen, setIsImageModalOpen] = useState(false);
    const [email, setEmail] = useState('');
  const [imageExtension, setImageExtension] = useState('');

    return (
        <ImageModal.Provider value={{
                email,setImageExtension,setEmail,imageExtension,
            isImageModalOpen,setIsImageModalOpen}}>
            {children}
        </ImageModal.Provider>
    )
}

export default ImageModalContext

export const ImageModalState=()=>{
    return useContext(ImageModal);
}