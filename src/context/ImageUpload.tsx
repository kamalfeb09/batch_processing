import React, { createContext, useContext, useState } from "react";
import { CURRENT_SCREEN } from "../common/utils";

const ImageModal = createContext({});

const ImageModalContext = ({ children }) => {
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [currentScreen, setCurrentScreen] = useState(
    CURRENT_SCREEN.UPLOAD_SCREEN
  );

  return (
    <ImageModal.Provider
      value={{
        isImageModalOpen,
        setIsImageModalOpen,
        currentScreen,
        setCurrentScreen,
      }}
    >
      {children}
    </ImageModal.Provider>
  );
};

export default ImageModalContext;

export const ImageModalState = () => {
  return useContext(ImageModal);
};
