import React, { useState, useEffect, useContext } from 'react';
import './EmailModal.css';
import { ImageModalState } from '../../context/ImageUpload';
import { getSignedUrls } from '../../services/api';

const EmailModal = ({ onClose }) => {
  const {email, setImageExtension, setEmail, imageExtension} = ImageModalState();
  const [isOpen, setIsOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      setError(null);
      
      // Get signed URLs before closing the modal
      const signedUrls = await getSignedUrls(20);
      console.log('Signed URLs:', signedUrls);
      
      // Handle form submission here
      console.log('Email:', email);
      console.log('Image Extension:', imageExtension);
      setIsOpen(false);
      onClose();
    } catch (err) {
      setError(err.message);
      console.error('Error in form submission:', err);
    } finally {
      setIsLoading(false);
    }
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
            <button 
              type="submit" 
              className="submit-button"
              disabled={isLoading}
            >
              {isLoading ? 'Loading...' : 'Submit'}
            </button>
          </div>
          {error && <div className="error-message">{error}</div>}
        </form>
      </div>
    </div>
  );
};

export default EmailModal; 