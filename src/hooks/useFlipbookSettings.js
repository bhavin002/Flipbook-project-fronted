import { useMemo } from 'react';

export const useFlipbookSettings = (settings) => {

  const visibilitySettings = useMemo(() => {
    if (!settings) return {};

    return {
      showFullscreen: settings.allowFullScreen == true,
      showShare: settings.shareOptions == true,
      showNavigationBar: settings.navigationBar == true,
      showControlBar: settings.controlInNormalMode == true,
      showNavigationArrow: settings.navigationArrow == true,
      brandLogo: settings.brandLogoLink
    };
  }, [settings]);

  return visibilitySettings;
}; 