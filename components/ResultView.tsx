
import React from 'react';

interface ResultViewProps {
  original: string;
  result: string | null;
  onReset: () => void;
  error: string | null;
}

export const ResultView: React.FC<ResultViewProps> = ({ original, result, onReset, error }) => {
  return (
    <div className="w-full space-y-8 animate-in fade-in duration-700">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        <div className="space-y-3">
          <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Original</p>
          <div className="rounded-2xl overflow-hidden border border-slate-800 bg-slate-900 shadow-xl">
            <img src={original} alt="Original" className="w-full object-cover max-h-[500px]" />
          </div>
        </div>

        <div className="space-y-3">
          <p className="text-sm font-semibold text-blue-400 uppercase tracking-wider">Skybound Result</p>
          <div className="rounded-2xl overflow-hidden border border-blue-900/30 bg-slate-900 shadow-2xl relative min-h-[300px] flex items-center justify-center">
            {result ? (
              <img src={result} alt="Result" className="w-full object-cover max-h-[500px]" />
            ) : error ? (
              <div className="p-8 text-center">
                <i className="fas fa-exclamation-triangle text-red-500 text-4xl mb-4"></i>
                <p className="text-red-400 font-medium">{error}</p>
              </div>
            ) : (
              <div className="flex flex-col items-center">
                 <div className="animate-pulse text-blue-400 flex flex-col items-center">
                   <i className="fas fa-magic text-4xl mb-4"></i>
                   <p>Generating your wings...</p>
                 </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-4 py-4">
        <button 
          onClick={onReset}
          className="px-8 py-3 bg-slate-800 hover:bg-slate-700 rounded-full font-bold transition-colors flex items-center gap-2"
        >
          <i className="fas fa-redo"></i> Try Another
        </button>
        {result && (
          <a 
            href={result} 
            download="skybound-photo.png"
            className="px-8 py-3 bg-blue-600 hover:bg-blue-500 rounded-full font-bold transition-colors flex items-center gap-2 shadow-lg shadow-blue-900/30"
          >
            <i className="fas fa-download"></i> Download Result
          </a>
        )}
      </div>
    </div>
  );
};
