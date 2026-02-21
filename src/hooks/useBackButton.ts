/**
 * useBackButton Hook
 * 
 * Why: Android devices have a hardware/software back button that should
 * navigate within the app, not exit the app. This hook handles that.
 * 
 * Play Store Requirement: Apps must handle back button properly.
 */

import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { App } from '@capacitor/app';
import { isNative } from '@/utils/capacitor';

/**
 * Hook to handle Android back button
 * 
 * @param onBack - Optional callback when back button is pressed
 * @param canGoBack - Function that returns true if navigation is possible
 * 
 * Usage:
 * ```tsx
 * useBackButton(() => {
 *   // Custom back handler
 * });
 * ```
 */
export const useBackButton = (
  onBack?: () => void,
  canGoBack?: () => boolean
) => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Only handle on native platforms
    if (!isNative()) {
      return;
    }

    // Register back button listener
    const backButtonListener = App.addListener('backButton', ({ canGoBack: nativeCanGoBack }) => {
      // If custom handler provided, use it
      if (onBack) {
        const shouldHandle = canGoBack ? canGoBack() : true;
        if (shouldHandle) {
          onBack();
        }
        return;
      }

      // Default behavior: navigate back in history
      if (window.history.length > 1) {
        navigate(-1);
      } else {
        // If no history, exit app (Android default behavior)
        App.exitApp();
      }
    });

    // Cleanup
    return () => {
      backButtonListener.then(listener => listener.remove());
    };
  }, [navigate, location, onBack, canGoBack]);
};

/**
 * Hook to prevent back button (e.g., on login screen)
 * 
 * Usage:
 * ```tsx
 * usePreventBackButton(); // Prevents back navigation
 * ```
 */
export const usePreventBackButton = () => {
  useEffect(() => {
    if (!isNative()) {
      return;
    }

    const backButtonListener = App.addListener('backButton', () => {
      // Do nothing - prevent back navigation
      // Optionally show a message
      // toast.info('Please complete this step first');
    });

    return () => {
      backButtonListener.then(listener => listener.remove());
    };
  }, []);
};

/**
 * Hook to exit app on back button (e.g., on home screen)
 * 
 * Usage:
 * ```tsx
 * useExitOnBackButton(); // Exits app when back pressed
 * ```
 */
export const useExitOnBackButton = () => {
  useEffect(() => {
    if (!isNative()) {
      return;
    }

    const backButtonListener = App.addListener('backButton', () => {
      App.exitApp();
    });

    return () => {
      backButtonListener.then(listener => listener.remove());
    };
  }, []);
};


