import React, { useEffect, useRef, useState } from 'react';
import { VolumeX, Volume2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

const BackgroundAudioPlayer = ({ visibilitySettings }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    if (visibilitySettings.backgroundAudioLink) {
      audioRef.current = new Audio(visibilitySettings.backgroundAudioLink);
      
      // Set up audio event listeners
      audioRef.current.addEventListener('ended', () => {
        if (visibilitySettings.isAudioLoop) {
          audioRef.current.play();
        } else {
          setIsPlaying(false);
        }
      });

      // Auto play if enabled
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
          audioRef.current.removeEventListener('ended', () => {});
        }
      };
    }
  }, [visibilitySettings.backgroundAudioLink, visibilitySettings.isAudioLoop, visibilitySettings.isAutoPlay]);

  const handlePlayPause = () => {
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

  if (!visibilitySettings.backgroundAudioLink) return null;

  return (
    <Button
      variant="ghost"
      size="icon"
      className="text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground rounded-full transition-colors"
      onClick={handlePlayPause}
    >
      {isPlaying ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
    </Button>
  );
};

export default BackgroundAudioPlayer; 