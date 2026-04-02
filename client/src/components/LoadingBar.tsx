import React from 'react';

interface LoadingBarProps {
  progress: number;
}

/**
 * Loading progress bar component
 * Displays a full-screen overlay with progress bar and percentage
 */
export const LoadingBar: React.FC<LoadingBarProps> = ({ progress }) => {
  if (progress >= 100) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-950">
      {/* Progress Bar */}
      <div className="w-full h-1 bg-slate-800">
        <div
          className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Loading Percentage Text */}
      <div className="mt-8 text-center">
        <p className="text-white text-sm font-medium">
          Loading {Math.round(progress)}%
        </p>
      </div>
    </div>
  );
};
