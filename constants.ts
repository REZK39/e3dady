import { Course, GradingScaleRule } from './types';

export const GRADING_SCALE: GradingScaleRule[] = [
  { grade: 'A+', points: 4.0, min: 97, max: 101 },
  { grade: 'A', points: 4.0, min: 93, max: 97 },
  { grade: 'A-', points: 3.7, min: 89, max: 93 },
  { grade: 'B+', points: 3.3, min: 84, max: 89 },
  { grade: 'B', points: 3.0, min: 80, max: 84 },
  { grade: 'B-', points: 2.7, min: 76, max: 80 },
  { grade: 'C+', points: 2.3, min: 73, max: 76 },
  { grade: 'C', points: 2.0, min: 70, max: 73 },
  { grade: 'C-', points: 1.7, min: 67, max: 70 },
  { grade: 'D+', points: 1.3, min: 64, max: 67 },
  { grade: 'D', points: 1.0, min: 60, max: 64 },
  { grade: 'F', points: 0.0, min: 0, max: 60 },
];

export const PREP_YEAR_COURSES: Course[] = [
  // Semester 1
  { id: 'sci001', name: 'Mathematics (1)', credits: 3, score: 0, grade: 'F', points: 0, semester: 1 },
  { id: 'sci002', name: 'Mechanics (1)', credits: 3, score: 0, grade: 'F', points: 0, semester: 1 },
  { id: 'sci003', name: 'Physics (1)', credits: 3, score: 0, grade: 'F', points: 0, semester: 1 },
  { id: 'prd001', name: 'Production Technology', credits: 3, score: 0, grade: 'F', points: 0, semester: 1 },
  { id: 'prd002', name: 'Eng. Drawing & Projection (1)', credits: 3, score: 0, grade: 'F', points: 0, semester: 1 },
  { id: 'huu001', name: 'English Language', credits: 2, score: 0, grade: 'F', points: 0, semester: 1 },
  { id: 'huf001', name: 'History of Eng. & Tech', credits: 2, score: 0, grade: 'F', points: 0, semester: 1 },
  // Semester 2
  { id: 'sci005', name: 'Mathematics (2)', credits: 3, score: 0, grade: 'F', points: 0, semester: 2 },
  { id: 'sci006', name: 'Mechanics (2)', credits: 3, score: 0, grade: 'F', points: 0, semester: 2 },
  { id: 'sci007', name: 'Physics (2)', credits: 3, score: 0, grade: 'F', points: 0, semester: 2 },
  { id: 'sci004', name: 'Engineering Chemistry', credits: 3, score: 0, grade: 'F', points: 0, semester: 2 },
  { id: 'prd003', name: 'Eng. Drawing & Projection (2)', credits: 3, score: 0, grade: 'F', points: 0, semester: 2 },
  { id: 'cce001', name: 'Computer & Programming', credits: 3, score: 0, grade: 'F', points: 0, semester: 2 }, 
  { id: 'huu002', name: 'Human Rights', credits: 2, score: 0, grade: 'F', points: 0, semester: 2 },
];