import { useEffect, useRef, useState } from 'react';

const LOADING_CONFIG = {
  UPDATE_INTERVAL: 300,
  PROGRESS_INCREMENT: 30,
  TITLE_DELAY: 500,
} as const;

/**
 * Custom hook for managing loading progress and title visibility
 */
export function useLoadingProgress() {
  const [progress, setProgress] = useState(0);
  const [titleVisible, setTitleVisible] = useState(false);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const titleTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    let currentProgress = 0;

    progressIntervalRef.current = setInterval(() => {
      currentProgress += Math.random() * LOADING_CONFIG.PROGRESS_INCREMENT;
      if (currentProgress > 100) currentProgress = 100;

      setProgress(currentProgress);

      if (currentProgress === 100) {
        if (progressIntervalRef.current) {
          clearInterval(progressIntervalRef.current);
        }

        // Show title after progress completes
        titleTimeoutRef.current = setTimeout(() => {
          setTitleVisible(true);
        }, LOADING_CONFIG.TITLE_DELAY);
      }
    }, LOADING_CONFIG.UPDATE_INTERVAL);

    return () => {
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
      if (titleTimeoutRef.current) clearTimeout(titleTimeoutRef.current);
    };
  }, []);

  return { progress, titleVisible };
}
