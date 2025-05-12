import React from "react";
import classes from "./styles.module.css";
import ImageUploadModal from "../ImageUploadModal/ImageUploadModal";
import { ImageModalState } from "../../context/ImageUpload";

const BulkMainScreen = () => {
  const { inputImages } = ImageModalState();
  return (
    <div className={classes.mainScreenContainer}>
      <div className={classes.imageContainer}>
      {inputImages.map((image) => (
        <div className={classes.eachImage}>
          <img src={image} alt="Bulk Process" height="100%" width="100%" style={{objectFit: "contain", border: "1px solid #000", borderRadius: '8px'}} />
        </div>
      ))}
      </div>
    </div>
  );
};

export default BulkMainScreen;
