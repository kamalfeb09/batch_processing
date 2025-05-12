import React, { useState, useEffect } from 'react';
import './EmailModal.css';

const EmailModal = ({ onClose }) => {
 
  const {email,setImageExtension,setEmail,imageExtension} = useContext(ImageModal);
  const [isOpen, setIsOpen] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Email:', email);
    console.log('Image Extension:', imageExtension);
    setIsOpen(false);
    onClose();
  };

  const handleClose = () => {
    setIsOpen(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Enter Details</h2>
          <button className="close-button" onClick={handleClose}>×</button>
        </div>
        <form className="form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="imageExtension">Image Extension:</label>
            <input
              type="text"
              id="imageExtension"
              value={imageExtension}
              onChange={(e) => setImageExtension(e.target.value)}
              placeholder="Enter image extension (e.g., jpg, png)"
              required
            />
          </div>
          <div className="modal-footer">
            <button type="submit" className="submit-button">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmailModal; 