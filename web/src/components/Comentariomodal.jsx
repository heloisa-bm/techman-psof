// src/components/ComentarioModal.jsx
import React from "react";
import "./ComentarioModal.css";

export default function ComentarioModal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-btn" onClick={onClose}>
          ✖
        </button>
        {children}
      </div>
    </div>
  );
}
