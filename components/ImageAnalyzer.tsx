import React, { useState } from 'react';
import { analyzeImage } from '../services/geminiService';

const ImageAnalyzer: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [result, setResult] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyze = async () => {
    if (!selectedImage) return;
    setLoading(true);
    try {
        // Strip the prefix for the API if needed, or pass full data URI if supported by my service wrapper logic
        // My service wrapper expects base64 data, so let's split.
        const base64Data = selectedImage.split(',')[1];
        const text = await analyzeImage(base64Data, "Analyze this document. If it's a grade sheet, list the subjects and grades. If it's a problem, solve it. Provide the output in a clear, structured markdown format.");
        setResult(text);
    } catch (e) {
        setResult("Error analyzing image. Please try again.");
    } finally {
        setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden p-6">
      <div className="mb-6 text-center">
        <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="material-icons-round text-3xl text-blue-600">document_scanner</span>
        </div>
        <h2 className="text-2xl font-bold text-gray-800">Transcript & Doc Analysis</h2>
        <p className="text-gray-500 mt-2">Upload a photo of your grades or an engineering problem.</p>
      </div>

      <div className="mb-6">
        <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition">
            {!selectedImage ? (
                 <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <span className="material-icons-round text-gray-400 text-4xl mb-2">cloud_upload</span>
                    <p className="text-sm text-gray-500 font-semibold">Click to upload</p>
                    <p className="text-xs text-gray-400">PNG, JPG or JPEG</p>
                </div>
            ) : (
                <img src={selectedImage} alt="Preview" className="h-full object-contain" />
            )}
           
            <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
        </label>
      </div>

      {selectedImage && (
          <button 
            onClick={handleAnalyze}
            disabled={loading}
            className="w-full py-3 bg-psu-blue text-white rounded-lg hover:bg-blue-800 transition font-semibold flex justify-center items-center gap-2"
          >
            {loading ? (
                <>
                 <span className="material-icons-round animate-spin">refresh</span> Analyzing...
                </>
            ) : (
                <>
                <span className="material-icons-round">auto_awesome</span> Analyze with Gemini
                </>
            )}
          </button>
      )}

      {result && (
        <div className="mt-8 p-6 bg-gray-50 rounded-xl border border-gray-200">
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <span className="material-icons-round text-green-600">check_circle</span> Analysis Result
            </h3>
            <div className="prose prose-sm max-w-none text-gray-700">
                <pre className="whitespace-pre-wrap font-sans">{result}</pre>
            </div>
        </div>
      )}
    </div>
  );
};

export default ImageAnalyzer;
