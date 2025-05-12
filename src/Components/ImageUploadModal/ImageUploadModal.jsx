// ImageUploadModal.jsx
import { useState, useRef, useEffect } from "react";
import styles from "./styles.module.css";
import { getSignedUrls, uploadImageToS3 } from "../../common/api";
import { ImageModalState } from "../../context/ImageUpload";
import { CURRENT_SCREEN } from "../../common/utils";

function UploadIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
      <polyline points="17 8 12 3 7 8"></polyline>
      <line x1="12" y1="3" x2="12" y2="15"></line>
    </svg>
  );
}

function CloudUploadIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="48"
      height="48"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"></path>
      <polyline points="9 15 12 12 15 15"></polyline>
      <line x1="12" y1="12" x2="12" y2="18"></line>
    </svg>
  );
}

const ImageUploadModal = ({ isOpen, onClose }) => {
  const [isDragActive, setIsDragActive] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const fileInputRef = useRef(null);
  const modalRef = useRef(null);
  const [variations, setVariations] = useState("2");
  const { setInputImages, setCurrentScreen } = ImageModalState();
  const handleInputChange = (e) => {
    setVariations(e.target.value);
  };

  const handleStartBatch = () => {
    // Add batch process logic here
    console.log(`Starting batch process with ${variations} variations`);
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      // Handle the file upload
      console.log("File dropped:", e.dataTransfer.files);
      // You would typically process the file here
    }
  };

  const handleFileInputChange = async (e) => {
    if (e.target.files && e.target.files.length > 0) {
      console.log("File selected:", e.target.files.length);
      handleFiles(e.target.files)
    }
  };

  const handleFiles = async(files) => {
    try {
      // Get signed URLs for the files
      const data = await getSignedUrls(files.length);
      const signedUrls = data.data.preSignedUrls;
      const uploadResult = await uploadImageToS3(signedUrls, files);
      setInputImages(uploadResult?.urls);
      setCurrentScreen(CURRENT_SCREEN.BULK_PROCESS_SCREEN);
      // You can now use the signed URLs to upload the files
    } catch (error) {
      console.error("Error getting signed URLs:", error);
    }
  }

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className={styles.modalcontainer} ref={modalRef}>
      <div className={styles.textcontainer}>
        <span className={styles.uploadfiles}>Upload files</span>
        <span>Add images or drag and drop</span>
      </div>
      <div
        className={styles.uppersection}
        onClick={handleUploadClick}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <div className={styles.box}>
          {isDragActive ? (
            <span>Drop files here</span>
          ) : (
            <>
              Upload Images
              <span>OR</span>
              <span>Drag and drop</span>
            </>
          )}
        </div>
        <input
          type="file"
          multiple
          ref={fileInputRef}
          onChange={handleFileInputChange}
          className={styles.hiddeninput}
          accept="image/*"
        />
        {/* <div className={styles.box}>Upload Folder</div> */}
      </div>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <spna>No of variations</spna>
          <div className={styles.inputContainer}>
            <input
              type="text"
              value={variations}
              onChange={handleInputChange}
              placeholder="Type number variations for each images you want"
              className={styles.input}
            />
            <button onClick={handleStartBatch} className={styles.button}>
              Start Batch Process
            </button>
          </div>
          <p className={styles.description}>
            Type number variations for each images you want
          </p>
        </div>
      </div>
    </div>
  );
};

// App.jsx example showing how to use the modal
export default ImageUploadModal;
