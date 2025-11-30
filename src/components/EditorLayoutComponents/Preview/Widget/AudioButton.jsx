import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';

export default function AudioButton({ shape, visibilitySettings, currentPages }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [animationClass, setAnimationClass] = useState('');
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0, visible: false });
  const audioRef = useRef(null);

  useEffect(() => {
    if (visibilitySettings.showAnimateInteraction) {
      setAnimationClass('ping-initial');
      const timer = setTimeout(() => {
        setAnimationClass('ping-hover');
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [visibilitySettings.showAnimateInteraction, currentPages]);

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
          audioRef.current.removeEventListener('timeupdate', () => { });
          audioRef.current.removeEventListener('ended', () => { });
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

  const handleMouseMove = (e) => {
    if (!shape.htmlData?.tooltip) return;
    setTooltipPos({
      x: e.clientX + 15,
      y: e.clientY + 5,
      visible: true
    });
  };

  const handleMouseLeave = () => {
    setTooltipPos(prev => ({ ...prev, visible: false }));
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
    <>
      <div
        className={`cursor-pointer ${visibilitySettings.showAnimateInteraction ? animationClass : ""}`}
        onClick={handleClick}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
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
          '--ping-color': shape.fill || '#ff0000',
          '--ping-radius': shape.effect?.individualCorners ? `${shape.effect?.topLeftRadius / 1.5 || 0}px ${shape.effect?.topRightRadius / 1.5 || 0}px ${shape.effect?.bottomRightRadius / 1.5 || 0}px ${shape.effect?.bottomLeftRadius / 1.5 || 0}px` : `${shape.effect?.cornerRadius / 1.5 || 0}px`,
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            backgroundColor: shape.fill,
            opacity: shape.opacity,
            position: "absolute",
            borderRadius: shape.effect?.individualCorners ? `${shape.effect?.topLeftRadius / 1.5 || 0}px ${shape.effect?.topRightRadius / 1.5 || 0}px ${shape.effect?.bottomRightRadius / 1.5 || 0}px ${shape.effect?.bottomLeftRadius / 1.5 || 0}px` : `${shape.effect?.cornerRadius / 1.5 || 0}px`,
          }}
        />

        <img
          src="/assets/icons/AudioButton.svg"
          alt={shape.title}
          style={{
            width: "100%",
            height: "100%",
            position: "absolute",
            display: !isPlaying ? "block" : "none",
          }}
        />

        <img
          src="/assets/icons/PauseAudioButton.svg"
          alt={`${shape.title}-pause`}
          style={{
            width: "100%",
            height: "100%",
            position: "absolute",
            display: isPlaying ? "block" : "none",
          }}
        />
      </div>
      {shape.htmlData?.tooltip && tooltipPos.visible && createPortal(
        <div
          className="bg-white text-black text-sm px-2 py-1 rounded-lg shadow-md border-none font-medium z-[9999]"
          style={{
            position: 'fixed',
            left: tooltipPos.x,
            top: tooltipPos.y,
            pointerEvents: 'none',
          }}
        >
          <p>{shape.htmlData.tooltip}</p>
        </div>,
        document.body
      )}
    </>
  );
}