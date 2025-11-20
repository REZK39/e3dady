import { GoogleGenAI, Modality } from "@google/genai";
import { decode, decodeAudioData } from "../utils/audioUtils";

const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateChatResponse = async (prompt: string, history: string[]) => {
  try {
    const ai = getAI();
    // Using gemini-3-pro-preview for advanced reasoning
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: [
        { role: 'user', parts: [{ text: `Context: You are an academic assistant for Port Said University Faculty of Engineering students. History: ${history.join('\n')} \n User: ${prompt}` }] }
      ],
      config: {
        systemInstruction: "Be helpful, encouraging, and concise. Help with GPA questions, study tips, and engineering concepts.",
      }
    });
    return response.text;
  } catch (error) {
    console.error("Chat Error", error);
    throw error;
  }
};

export const analyzeImage = async (base64Image: string, prompt: string) => {
  try {
    const ai = getAI();
    // Using gemini-3-pro-preview for multimodal
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: 'image/jpeg', // Assuming jpeg for simplicity
              data: base64Image
            }
          },
          { text: prompt }
        ]
      }
    });
    return response.text;
  } catch (error) {
    console.error("Vision Error", error);
    throw error;
  }
};

export const speakText = async (text: string) => {
  try {
    const ai = getAI();
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-preview-tts",
      contents: [{ parts: [{ text: text }] }],
      config: {
        responseModalities: [Modality.AUDIO],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: 'Kore' },
          },
        },
      },
    });

    const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
    if (!base64Audio) throw new Error("No audio data returned");

    const outputAudioContext = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
    const outputNode = outputAudioContext.createGain();
    outputNode.connect(outputAudioContext.destination);

    const audioBuffer = await decodeAudioData(
      decode(base64Audio),
      outputAudioContext,
      24000,
      1,
    );

    const source = outputAudioContext.createBufferSource();
    source.buffer = audioBuffer;
    source.connect(outputNode);
    source.start();
    
  } catch (error) {
    console.error("TTS Error", error);
    throw error;
  }
};
