import React, { useState, useEffect, useContext } from 'react';
import './EmailModal.css';
import { ImageModalState } from '../../context/ImageUpload';
import { CURRENT_SCREEN } from '../../common/utils';

const EmailModal = () => {
 
  const {email,setImageExtension,setEmail,imageExtension,setCurrentScreen} = ImageModalState();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Email:', email);
    console.log('Image Extension:', imageExtension);
  };


  const onSubmit = () => {
    setCurrentScreen(CURRENT_SCREEN.UPLOAD_SCREEN);
  }

  return (
    // <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Enter Details</h2>
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
            <button type="submit" className="submit-button" onClick={onSubmit}>Submit</button>
          </div>
        </form>
      </div>
    // </div>
  );
};

export default EmailModal; 