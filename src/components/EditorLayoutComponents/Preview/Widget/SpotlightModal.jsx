import React, { useEffect, useState } from 'react';

const SpotlightModal = ({ isOpen, onClose, htmlData }) => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => setIsVisible(true), 10);
    } else {
      setIsVisible(false);
    }
  }, [isOpen]);
  
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 backdrop-blur-sm flex justify-center items-center transition-opacity duration-300 ease-in-out"
      style={{ opacity: isVisible ? 1 : 0 }}
      onClick={onClose}
    >
      <div 
        className="bg-white p-5 rounded-lg shadow-lg flex flex-col gap-5 transform transition-all duration-300 ease-in-out"
        style={{ 
          width: "600px", 
          transform: isVisible ? 'scale(1) translateY(0)' : 'scale(0.95) translateY(-16px)'
        }}
        onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-between items-center">
          <button 
            className="text-2xl cursor-pointer p-0 w-6 h-6 leading-6 hover:text-gray-500 transition-colors duration-200"
            onClick={onClose}
          >
            ×
          </button>
        </div>
        <div className="flex justify-center w-full">
          <img src={htmlData.coverImage.url} alt="placeholder" />
        </div>
      </div>
    </div>
  );
};

export default SpotlightModal;