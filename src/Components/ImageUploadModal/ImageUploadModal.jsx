// ImageUploadModal.jsx
import { useState, useRef, useEffect } from 'react';
import styles from './styles.module.css';

function UploadIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
      <polyline points="17 8 12 3 7 8"></polyline>
      <line x1="12" y1="3" x2="12" y2="15"></line>
    </svg>
  );
}

function CloudUploadIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"></path>
      <polyline points="9 15 12 12 15 15"></polyline>
      <line x1="12" y1="12" x2="12" y2="18"></line>
    </svg>
  );
}

const ImageUploadModal=({ isOpen, onClose })=> {
  const [isDragActive, setIsDragActive] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const fileInputRef = useRef(null);
  const modalRef = useRef(null);
  const [variations, setVariations] = useState('2');

  const handleInputChange = (e) => {
    setVariations(e.target.value);
  };

  const handleStartBatch = () => {
    // Add batch process logic here
    console.log(`Starting batch process with ${variations} variations`);
  };
  
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (modalRef.current && !modalRef.current.contains(event.target)) {
//         onClose();
//       }
//     };
    
//     if (isOpen) {
//       document.addEventListener('mousedown', handleClickOutside);
//     }
    
//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, [isOpen, onClose]);

//   if (!isOpen) return null;
  
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
      console.log("File dropped:", e.dataTransfer.files[0]);
      // You would typically process the file here
    }
  };
  
  const handleUrlChange = (e) => {
    setImageUrl(e.target.value);
  };
  
  const handleFileInputChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      // Handle the file upload
      console.log("File selected:", e.target.files[0]);
      // You would typically process the file here
    }
  };
  
  const handleUploadClick = () => {
    fileInputRef.current.click();
  };
  
  return (
    <div className={styles.modaloverlay}>
      <div className={styles.modalcontainer} ref={modalRef}>
            <div className={styles.textcontainer}>
                
            <span className={styles.uploadfiles}>Upload files</span>
            <span>Add folder,images or drag and drop</span>
            </div>
            <div className={styles.uppersection}>

            <div className={styles.box}>
            Upload Images
            </div>
            <div className={styles.box}>
            Upload Folder
            </div>
            </div>
            <div className={styles.container}>
      <div className={styles.wrapper}>
        <span>No of variations</span>
        <div className={styles.inputContainer}>
          <input 
            type="text" 
            value={variations}
            onChange={handleInputChange}
            placeholder="Type number variations for each images you want"
            className={styles.input}
          />
          <button 
            onClick={handleStartBatch}
            className={styles.button}
          >
            Start Batch Process
          </button>
        </div>
        <p className={styles.description}>
          Type number variations for each images you want
        </p>
      </div>
    </div>
      </div>
    </div>
  );
}

// App.jsx example showing how to use the modal
export default ImageUploadModal;