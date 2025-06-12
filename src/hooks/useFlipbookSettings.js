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
      brandLogo: settings.brandLogoLink,
      logoLink: settings.logoLink,
      backgroundColorHash: settings.backgroundColorHash,
      backgroundColor: settings.backgroundColor,
      backgroundImage: settings.backgroundImage == null ? "" : settings.backgroundImageURL,
      backgroundImageType: settings.backgroundImageType,
      playerAccentColorHash: settings.playerAccentColorHash,
      showPageOverview: settings.pageOverview,
      showSearch: settings.search
    };
  }, [settings]);

  return visibilitySettings;
}; 