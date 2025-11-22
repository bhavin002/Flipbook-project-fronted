import React, { useEffect, useRef, useState } from 'react';
import { VolumeX, Volume2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const useBackgroundAudio = (visibilitySettings) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    if (visibilitySettings.backgroundAudioLink) {
      audioRef.current = new Audio(visibilitySettings.backgroundAudioLink);

      audioRef.current.addEventListener('ended', () => {
        if (visibilitySettings.isAudioLoop) {
          audioRef.current.play();
        } else {
          setIsPlaying(false);
        }
      });

      if (visibilitySettings.isAutoPlay) {
        audioRef.current.play()
          .then(() => setIsPlaying(true))
          .catch(error => {
            console.error('Autoplay failed:', error);
          });
      }

      return () => {
        if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current.removeEventListener('ended', () => { });
        }
      };
    }
  }, [visibilitySettings.backgroundAudioLink, visibilitySettings.isAudioLoop, visibilitySettings.isAutoPlay]);

  const toggleAudio = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(error => {
          console.error('Playback failed:', error);
        });
    }
  };

  return { isPlaying, toggleAudio };
};

const BackgroundAudioPlayer = ({ isPlaying, toggleAudio, visibilitySettings, isMobile, onMobileClose, iconColor }) => {
  if (!visibilitySettings.backgroundAudioLink) return null;

  if (isMobile) {
    return (
      <button
        className="flex items-center gap-3 px-4 py-2 text-sm text-white hover:opacity-70 w-full text-left transition-colors"
        onClick={() => {
          toggleAudio();
          if (onMobileClose) onMobileClose();
        }}
      >
        {!isPlaying ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />} Sound {!isPlaying ? "On" : "Off"}
      </button>
    );
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      className="hover:bg-transparent hover:opacity-70 transition-colors [&_svg]:size-5"
      style={{ color: iconColor || 'black' }}
      onClick={toggleAudio}
    >
      {isPlaying ? <Volume2 /> : <VolumeX />}
    </Button>
  );
};

export default BackgroundAudioPlayer; 