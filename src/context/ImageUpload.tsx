import React, { createContext, useContext, useState } from 'react'



const ImageModal=createContext({});

const ImageModalContext = ({children}) => {

    const [isImageModalOpen, setIsImageModalOpen] = useState(false);
   

    return (
        <ImageModal.Provider value={{isImageModalOpen,setIsImageModalOpen}}>
            {children}
        </ImageModal.Provider>
    )
}

export default ImageModalContext

export const ImageModalState=()=>{
    return useContext(ImageModal);
}