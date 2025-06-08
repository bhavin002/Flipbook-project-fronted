import React, { useState, useRef, useEffect } from 'react';

export default function AudioButton({ shape }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  
  useEffect(() => {
    if (shape.htmlData?.audioFile?.url) {
      audioRef.current = new Audio(shape.htmlData.audioFile.url);
      
      if (shape.htmlData.trimEnabled) {
        audioRef.current.currentTime = shape.htmlData.startTime;
      }
      
      audioRef.current.addEventListener('timeupdate', () => {
        if (shape.htmlData.trimEnabled && audioRef.current.currentTime >= shape.htmlData.endTime) {
          audioRef.current.pause();
          audioRef.current.currentTime = shape.htmlData.startTime;
          setIsPlaying(false);
        }
      });
      
      audioRef.current.addEventListener('ended', () => {
        if (shape.htmlData.trimEnabled) {
          audioRef.current.currentTime = shape.htmlData.startTime;
        }
        setIsPlaying(false);
      });
      
      return () => {
        if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current.removeEventListener('timeupdate', () => {});
          audioRef.current.removeEventListener('ended', () => {});
        }
      };
    }
  }, [shape.htmlData?.audioFile?.url, shape.htmlData?.trimEnabled, shape.htmlData?.startTime, shape.htmlData?.endTime]);
  
  const handleClick = () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      if (shape.htmlData.trimEnabled) {
        audioRef.current.currentTime = shape.htmlData.startTime;
      }
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
    display: shape.visible ? "block" : "none",
    borderRadius: shape.effect?.individualCorners ? `${shape.effect?.topLeftRadius / 1.5 || 0}px ${shape.effect?.topRightRadius / 1.5 || 0}px ${shape.effect?.bottomRightRadius / 1.5 || 0}px ${shape.effect?.bottomLeftRadius / 1.5 || 0}px` : `${shape.effect?.cornerRadius / 1.5 || 0}px`,
  };
  
  return (
    <div 
      className="cursor-pointer" 
      title={shape.htmlData.tooltip}
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