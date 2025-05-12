import React, { createContext, useContext, useState } from "react";
import { CURRENT_SCREEN } from "../common/utils";

const ImageModal = createContext({});

const ImageModalContext = ({children}) => {
    const [currentScreen, setCurrentScreen] = useState(
        CURRENT_SCREEN.UPLOAD_SCREEN
      );
      const [email, setEmail] = useState('');
  const [imageExtension, setImageExtension] = useState('');
    const [isImageModalOpen, setIsImageModalOpen] = useState(false);
   

    return (
        <ImageModal.Provider value={{ email,setImageExtension,setEmail,imageExtension,
            isImageModalOpen,setIsImageModalOpen,currentScreen,setCurrentScreen}}>
            {children}
        </ImageModal.Provider>
    )
}

export default ImageModalContext;

export const ImageModalState = () => {
  return useContext(ImageModal);
};
