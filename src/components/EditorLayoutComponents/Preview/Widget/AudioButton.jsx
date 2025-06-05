import React, { useState, useRef, useEffect } from 'react';

export default function AudioButton({ shape }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  
  useEffect(() => {
    if (shape.htmlData?.audioData?.url) {
      audioRef.current = new Audio(shape.htmlData.audioData.url);
      
      audioRef.current.addEventListener('ended', () => {
        setIsPlaying(false);
      });
      
      return () => {
        if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current.removeEventListener('ended', () => {
            setIsPlaying(false);
          });
        }
      };
    }
  }, [shape.htmlData?.audioData?.url]);
  
  const handleClick = () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    
    setIsPlaying(!isPlaying);
  };
  
  const commonStyle = {
    width: `${shape.width}px`,
    height: `${shape.height}px`,
    position: "absolute",
    left: `${shape.x}px`,
    top: `${shape.y}px`,
    transformOrigin: "0 0",
    transform: `rotate(${shape.rotation || 0}deg)
      scaleX(${shape.scaleX})
      scaleY(${shape.scaleY})
      skewX(${shape.skewX || 0}deg)
      skewY(${shape.skewY || 0}deg)
      translate(${shape.offsetX || 0}px, ${shape.offsetY || 0}px)`,
    display: shape.visible ? "block" : "none"
  };
  
  return (
    <div 
      className="cursor-pointer" 
      title={shape.htmlData.audioButtonTooltip}
      onClick={handleClick}
    >
      <div
        style={{
          ...commonStyle,
          backgroundColor: shape.fill,
          opacity: shape.opacity
        }}
      />
      
      <img
        src="/src/assets/icons/AudioButton.svg"
        alt={shape.title}
        style={{
          ...commonStyle,
          display: shape.visible && !isPlaying ? "block" : "none"
        }}
      />
      
      <img
        src="/src/assets/icons/PauseAudioButton.svg"
        alt={`${shape.title}-pause`}
        style={{
          ...commonStyle,
          display: shape.visible && isPlaying ? "block" : "none"
        }}
      />
    </div>
  );
}