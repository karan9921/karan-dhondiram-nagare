
import React, { useRef } from 'react';

interface ImageUploaderProps {
  onImageSelect: (base64: string) => void;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageSelect }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onImageSelect(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div 
      className="w-full max-w-xl aspect-[4/3] border-2 border-dashed border-slate-700 rounded-3xl flex flex-col items-center justify-center p-8 bg-slate-900/50 hover:bg-slate-900 transition-all cursor-pointer group"
      onClick={() => fileInputRef.current?.click()}
    >
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleFileChange} 
        accept="image/*" 
        className="hidden" 
      />
      <div className="w-20 h-20 bg-slate-800 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
        <i className="fas fa-cloud-upload-alt text-3xl text-blue-400"></i>
      </div>
      <h3 className="text-xl font-bold mb-2">Upload your photo</h3>
      <p className="text-slate-500 text-center mb-6">
        Click or drag and drop. Best results with clear shots of people.
      </p>
      <button className="px-8 py-3 bg-blue-600 hover:bg-blue-500 rounded-full font-bold transition-colors shadow-lg shadow-blue-900/30">
        Select Photo
      </button>
    </div>
  );
};
