import React from 'react'
import styles from "./UploadModal.module.css";
import { ImageModalState } from '../context/ImageUpload';


const UploadModal = () => {
  const {setIsImageModalOpen}=ImageModalState();
  return (
    <div>
      <div className={styles.uploadboxcontainer}>
        <span>No Input Image Selected. Upload An Image To Get Started</span>
        <button onClick={()=>{
setIsImageModalOpen(true);          
        }} className={styles.uploadbuttoncta}>Upload Image</button>
      </div>
    </div>
  )
}

export default UploadModal