import React, { createContext, useContext, useState } from "react";
import { CURRENT_SCREEN } from "../common/utils";

const ImageModal = createContext({});

const ImageModalContext = ({ children }) => {
  const [currentScreen, setCurrentScreen] = useState(
    CURRENT_SCREEN.BULK_PROCESS_SCREEN
  );
  const [email, setEmail] = useState("");
  const [imageExtension, setImageExtension] = useState("");
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [inputImages, setInputImages] = useState([
    // "https://strapi-wasabi-bucket-prod-cdn.phot.ai/AI_Shadow_Generator_f1ee08ba88.png",
    // "https://strapi-wasabi-bucket-prod-cdn.phot.ai/AI_Shadow_Generator_f1ee08ba88.png",
    // "https://strapi-wasabi-bucket-prod-cdn.phot.ai/AI_Shadow_Generator_f1ee08ba88.png",
    // "https://strapi-wasabi-bucket-prod-cdn.phot.ai/AI_Shadow_Generator_f1ee08ba88.png",
    // "https://strapi-wasabi-bucket-prod-cdn.phot.ai/AI_Shadow_Generator_f1ee08ba88.png",
    // "https://strapi-wasabi-bucket-prod-cdn.phot.ai/AI_Shadow_Generator_f1ee08ba88.png",
    // "https://strapi-wasabi-bucket-prod-cdn.phot.ai/AI_Shadow_Generator_f1ee08ba88.png",
    // "https://strapi-wasabi-bucket-prod-cdn.phot.ai/AI_Shadow_Generator_f1ee08ba88.png",
    // "https://strapi-wasabi-bucket-prod-cdn.phot.ai/AI_Shadow_Generator_f1ee08ba88.png",
    // "https://strapi-wasabi-bucket-prod-cdn.phot.ai/AI_Shadow_Generator_f1ee08ba88.png",
    // "https://strapi-wasabi-bucket-prod-cdn.phot.ai/AI_Shadow_Generator_f1ee08ba88.png",
    // "https://strapi-wasabi-bucket-prod-cdn.phot.ai/AI_Shadow_Generator_f1ee08ba88.png",
  ]);

  return (
    <ImageModal.Provider
      value={{
        email,
        setImageExtension,
        setEmail,
        imageExtension,
        isImageModalOpen,
        setIsImageModalOpen,
        currentScreen,
        setCurrentScreen,
        inputImages,
        setInputImages,
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
