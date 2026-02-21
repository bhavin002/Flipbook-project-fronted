/**
 * Capacitor Utilities (JavaScript version)
 * 
 * Why: Centralizes Capacitor initialization and provides helper functions
 * for detecting mobile platform and accessing native features.
 */

import { Capacitor } from '@capacitor/core';
import { App } from '@capacitor/app';
import { StatusBar, Style } from '@capacitor/status-bar';
import { SplashScreen } from '@capacitor/splash-screen';
import { Device } from '@capacitor/device';
import { Browser } from '@capacitor/browser';
import { Share } from '@capacitor/share';
import { Haptics, ImpactStyle } from '@capacitor/haptics';

/**
 * Check if app is running on native platform (not web browser)
 */
export const isNative = () => {
  return Capacitor.isNativePlatform();
};

/**
 * Check if app is running on Android
 */
export const isAndroid = () => {
  return Capacitor.getPlatform() === 'android';
};

/**
 * Check if app is running on iOS
 */
export const isIOS = () => {
  return Capacitor.getPlatform() === 'ios';
};

/**
 * Initialize Capacitor plugins
 * Call this in main.jsx after app loads
 */
export const initializeCapacitor = async () => {
  if (!isNative()) {
    console.log('Running on web, skipping Capacitor initialization');
    return;
  }

  try {
    // Configure status bar
    if (isAndroid()) {
      await StatusBar.setStyle({ style: Style.Dark });
      await StatusBar.setBackgroundColor({ color: '#000000' });
    }

    // Hide splash screen after app is ready
    // You can delay this if you need to load data first
    await SplashScreen.hide();

    console.log('Capacitor initialized successfully');
  } catch (error) {
    console.error('Error initializing Capacitor:', error);
  }
};

/**
 * Get device information
 */
export const getDeviceInfo = async () => {
  if (!isNative()) {
    return null;
  }

  try {
    const info = await Device.getInfo();
    return info;
  } catch (error) {
    console.error('Error getting device info:', error);
    return null;
  }
};

/**
 * Open URL in system browser (not in-app browser)
 * Why: Play Store requires external links to open in system browser
 */
export const openInBrowser = async (url) => {
  if (!isNative()) {
    window.open(url, '_blank');
    return;
  }

  try {
    await Browser.open({ url, windowName: '_system' });
  } catch (error) {
    console.error('Error opening browser:', error);
    // Fallback to window.open
    window.open(url, '_blank');
  }
};

/**
 * Share content using native share dialog
 */
export const shareContent = async (options) => {
  if (!isNative()) {
    // Web fallback: copy to clipboard
    if (options.url) {
      await navigator.clipboard.writeText(options.url);
      alert('Link copied to clipboard!');
    }
    return;
  }

  try {
    await Share.share(options);
  } catch (error) {
    console.error('Error sharing:', error);
  }
};

/**
 * Trigger haptic feedback
 * Why: Provides tactile feedback for better UX
 */
export const triggerHaptic = async (style = ImpactStyle.Medium) => {
  if (!isNative()) {
    return;
  }

  try {
    await Haptics.impact({ style });
  } catch (error) {
    // Silently fail - haptics not critical
    console.debug('Haptics not available:', error);
  }
};

/**
 * Handle app state changes (foreground/background)
 */
export const setupAppStateListener = (callbacks) => {
  if (!isNative()) {
    return () => {}; // No-op cleanup
  }

  // Listen for app state changes
  const stateListener = App.addListener('appStateChange', ({ isActive }) => {
    callbacks.onAppStateChange?.(isActive);
  });

  // Listen for deep links
  const urlListener = App.addListener('appUrlOpen', (data) => {
    callbacks.onAppUrlOpen?.(data.url);
  });

  // Return cleanup function
  return () => {
    stateListener.then(listener => listener.remove());
    urlListener.then(listener => listener.remove());
  };
};

/**
 * Get app version
 */
export const getAppVersion = async () => {
  if (!isNative()) {
    return null;
  }

  try {
    const info = await App.getInfo();
    return info.version;
  } catch (error) {
    console.error('Error getting app version:', error);
    return null;
  }
};


