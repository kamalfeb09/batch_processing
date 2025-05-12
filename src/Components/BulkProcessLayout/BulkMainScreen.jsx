import React from "react";
import classes from "./styles.module.css";
import ImageUploadModal from "../ImageUploadModal/ImageUploadModal";
import { ImageModalState } from "../../context/ImageUpload";
 const BulkMainScreen = () => {
  const {isImageModalOpen,setIsImageModalOpen}=ImageModalState();
  return (
  <>
<ImageUploadModal isOpen={isImageModalOpen} onClose={setIsImageModalOpen} />
  </>
  );
};

export default BulkMainScreen;
