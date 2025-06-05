import React, { useEffect, useState } from 'react';

const LinkModal = ({ isOpen, onClose, content, buttonLabel, onButtonClick }) => {
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
      className={`fixed inset-0 backdrop-blur-sm flex justify-center items-center transition-opacity duration-300 ease-in-out ${isVisible ? 'opacity-100' : 'opacity-0'}`}
      onClick={onClose}
    >
      <div 
        className={`bg-white p-5 rounded-lg w-[300px] shadow-lg flex flex-col gap-5 transform transition-all duration-300 ease-in-out ${isVisible ? 'scale-100 translate-y-0' : 'scale-95 -translate-y-4'}`}
        onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-between items-center">
          <span className="text-base text-gray-800">{content?.text}</span>
          <button 
            className="text-2xl cursor-pointer p-0 w-6 h-6 leading-6 hover:text-gray-500 transition-colors duration-200"
            onClick={onClose}
          >
            ×
          </button>
        </div>
        <button 
          className="bg-black text-white p-2.5 rounded-full text-base cursor-pointer hover:bg-gray-700 w-full transition-colors duration-200"
          onClick={() => {
            onButtonClick();
            onClose();
          }}
        >
          {buttonLabel}
        </button>
      </div>
    </div>
  );
};

export default LinkModal;