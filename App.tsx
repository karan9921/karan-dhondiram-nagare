
import React, { useState, useRef, useCallback } from 'react';
import { GoogleGenAI } from "@google/genai";
import { Header } from './components/Header';
import { ImageUploader } from './components/ImageUploader';
import { LoadingOverlay } from './components/LoadingOverlay';
import { ResultView } from './components/ResultView';

const App: React.FC = () => {
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleProcessImage = async (base64Data: string) => {
    setIsProcessing(true);
    setError(null);
    setOriginalImage(base64Data);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
      
      // We use gemini-2.5-flash-image for image editing/generation tasks
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
          parts: [
            {
              inlineData: {
                data: base64Data.split(',')[1],
                mimeType: 'image/jpeg',
              },
            },
            {
              text: "Edit this image so the man is flying or floating in a beautiful, cinematic sky with soft clouds. Maintain his appearance but place him in a majestic aerial scene.",
            },
          ],
        },
        config: {
          imageConfig: {
            aspectRatio: "3:4"
          }
        }
      });

      let foundImage = false;
      if (response.candidates && response.candidates[0]?.content?.parts) {
        for (const part of response.candidates[0].content.parts) {
          if (part.inlineData) {
            setResultImage(`data:image/png;base64,${part.inlineData.data}`);
            foundImage = true;
            break;
          }
        }
      }

      if (!foundImage) {
        throw new Error("The AI didn't return an image. Please try again with a different prompt or photo.");
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message || "An unexpected error occurred while processing the image.");
    } finally {
      setIsProcessing(false);
    }
  };

  const reset = () => {
    setOriginalImage(null);
    setResultImage(null);
    setError(null);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow flex flex-col items-center justify-center mt-8">
        {!originalImage ? (
          <ImageUploader onImageSelect={handleProcessImage} />
        ) : (
          <ResultView 
            original={originalImage} 
            result={resultImage} 
            onReset={reset}
            error={error}
          />
        )}
      </main>

      {isProcessing && <LoadingOverlay />}

      <footer className="mt-12 text-center text-slate-500 text-sm py-4">
        Powered by Gemini 2.5 Flash Image • AI Photo Manipulation
      </footer>
    </div>
  );
};

export default App;
