/**
 * usePullToRefresh Hook
 * 
 * Why: Provides native pull-to-refresh gesture for better mobile UX.
 * This is a common mobile pattern that users expect.
 */

import { useEffect, useRef, useState } from 'react';
import { App } from '@capacitor/app';
import { isNative } from '@/utils/capacitor';

/**
 * Hook to enable pull-to-refresh on mobile
 * 
 * @param onRefresh - Function to call when user pulls to refresh
 * @param enabled - Whether pull-to-refresh is enabled (default: true)
 * 
 * Usage:
 * ```tsx
 * const { refreshing, triggerRefresh } = usePullToRefresh(async () => {
 *   await fetchData();
 * });
 * 
 * return (
 *   <div className={refreshing ? 'opacity-50' : ''}>
 *     {/* Your content */}
 *   </div>
 * );
 * ```
 */
export const usePullToRefresh = (
  onRefresh: () => Promise<void> | void,
  enabled: boolean = true
) => {
  const [refreshing, setRefreshing] = useState(false);
  const touchStartY = useRef<number | null>(null);
  const touchCurrentY = useRef<number | null>(null);
  const isPulling = useRef(false);
  const pullDistance = useRef(0);

  // Manual trigger
  const triggerRefresh = async () => {
    if (refreshing) return;
    
    setRefreshing(true);
    try {
      await onRefresh();
    } finally {
      // Small delay for better UX
      setTimeout(() => {
        setRefreshing(false);
      }, 300);
    }
  };

  useEffect(() => {
    if (!enabled || !isNative()) {
      return;
    }

    const container = document.body;
    let startY = 0;
    let currentY = 0;
    let isDragging = false;

    const handleTouchStart = (e: TouchEvent) => {
      // Only trigger if at top of page
      if (window.scrollY === 0) {
        startY = e.touches[0].clientY;
        isDragging = true;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragging) return;

      currentY = e.touches[0].clientY;
      const distance = currentY - startY;

      // Only allow downward pull
      if (distance > 0 && window.scrollY === 0) {
        e.preventDefault();
        pullDistance.current = distance;
        
        // Visual feedback (optional - you can add a refresh indicator)
        if (distance > 80 && !isPulling.current) {
          isPulling.current = true;
          // You can add visual indicator here
        }
      }
    };

    const handleTouchEnd = async (e: TouchEvent) => {
      if (!isDragging) return;

      isDragging = false;
      const distance = currentY - startY;

      // Trigger refresh if pulled far enough
      if (distance > 100 && window.scrollY === 0) {
        await triggerRefresh();
      }

      isPulling.current = false;
      pullDistance.current = 0;
      startY = 0;
      currentY = 0;
    };

    container.addEventListener('touchstart', handleTouchStart, { passive: false });
    container.addEventListener('touchmove', handleTouchMove, { passive: false });
    container.addEventListener('touchend', handleTouchEnd);

    return () => {
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchmove', handleTouchMove);
      container.removeEventListener('touchend', handleTouchEnd);
    };
  }, [enabled, onRefresh, refreshing]);

  return {
    refreshing,
    triggerRefresh,
    pullDistance: pullDistance.current,
  };
};

/**
 * Simple pull-to-refresh component wrapper
 * 
 * Usage:
 * ```tsx
 * <PullToRefresh onRefresh={fetchData}>
 *   <YourContent />
 * </PullToRefresh>
 * ```
 */
export const PullToRefresh: React.FC<{
  onRefresh: () => Promise<void> | void;
  children: React.ReactNode;
  enabled?: boolean;
}> = ({ onRefresh, children, enabled = true }) => {
  const { refreshing } = usePullToRefresh(onRefresh, enabled);

  return (
    <div className={`relative ${refreshing ? 'opacity-75' : ''}`}>
      {refreshing && (
        <div className="absolute top-0 left-0 right-0 flex justify-center items-center py-2 z-50">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-900"></div>
        </div>
      )}
      {children}
    </div>
  );
};


