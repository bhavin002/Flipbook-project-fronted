import React, { useEffect, useRef, useState } from 'react';
import { VolumeX, Volume2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const useBackgroundAudio = (visibilitySettings) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
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

  const handleFirstClick = () => {
    if (!hasInteracted && visibilitySettings.isAutoPlay && audioRef.current) {
      setHasInteracted(true);
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(error => {
          console.error('First click playback failed:', error);
        });
    }
  };

  return { isPlaying, toggleAudio, handleFirstClick, hasInteracted };
};

const BackgroundAudioPlayer = ({ isPlaying, toggleAudio, visibilitySettings, iconColor }) => {
  if (!visibilitySettings.backgroundAudioLink) return null;

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