export interface Course {
  id: string;
  name: string;
  credits: number;
  score: number; // 0-100
  grade: string; // A+, A, etc.
  points: number; // 4.0, 3.7, etc.
  semester: 1 | 2;
  isCustom?: boolean;
}

export interface GradingScaleRule {
  grade: string;
  points: number;
  min: number;
  max: number; // Exclusive for upper bound usually, inclusive for 100
}

export enum Tab {
  CALCULATOR = 'calculator',
  CHAT = 'chat',
  ANALYTICS = 'analytics'
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
  isError?: boolean;
}

export interface VideoGenerationConfig {
    // Placeholder for future video types if needed
}