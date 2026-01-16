
import React, { useState, useEffect } from 'react';

const messages = [
  "Analyzing portrait details...",
  "Defying gravity...",
  "Painting the stratosphere...",
  "Consulting the clouds...",
  "Almost ready for takeoff...",
];

export const LoadingOverlay: React.FC = () => {
  const [msgIdx, setMsgIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMsgIdx((prev) => (prev + 1) % messages.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex flex-col items-center justify-center p-6 text-center">
      <div className="relative w-24 h-24 mb-8">
        <div className="absolute inset-0 border-4 border-blue-500/20 rounded-full"></div>
        <div className="absolute inset-0 border-4 border-t-blue-500 rounded-full animate-spin"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <i className="fas fa-plane-up text-3xl text-blue-400 animate-bounce"></i>
        </div>
      </div>
      <h2 className="text-2xl font-bold text-white mb-2">Gemini is working...</h2>
      <p className="text-blue-400 font-medium h-6">{messages[msgIdx]}</p>
      <p className="mt-8 text-slate-500 text-sm italic max-w-xs">
        Advanced image generation can take up to 20-30 seconds.
      </p>
    </div>
  );
};
