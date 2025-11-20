import React from 'react';
import { Course } from '../types';
import { GRADING_SCALE } from '../constants';

interface CourseRowProps {
  course: Course;
  onUpdate: (id: string, field: keyof Course, value: any) => void;
  onDelete: (id: string) => void;
}

const CourseRow: React.FC<CourseRowProps> = ({ course, onUpdate, onDelete }) => {

  const handleScoreChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Math.min(100, Math.max(0, Number(e.target.value)));
    
    // Auto-calculate Grade and Points based on Score
    const rule = GRADING_SCALE.find(r => val >= r.min && val < r.max) || GRADING_SCALE[GRADING_SCALE.length - 1];
    
    onUpdate(course.id, 'score', val);
    onUpdate(course.id, 'grade', rule.grade);
    onUpdate(course.id, 'points', rule.points);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center bg-white p-4 rounded-lg shadow-sm border border-gray-100 mb-2 transition hover:shadow-md">
      {/* Course Name */}
      <div className="md:col-span-4">
        <label className="block text-xs text-gray-400 md:hidden">Subject</label>
        <input
          type="text"
          value={course.name}
          onChange={(e) => onUpdate(course.id, 'name', e.target.value)}
          className="w-full font-medium text-slate-700 bg-transparent border-b border-transparent focus:border-blue-500 focus:outline-none p-1"
          placeholder="Course Name"
        />
      </div>

      {/* Credits */}
      <div className="md:col-span-2">
        <label className="block text-xs text-gray-400 md:hidden">Credits</label>
        <div className="flex items-center">
           <span className="text-gray-400 mr-2 text-sm">Hrs:</span>
           <input
            type="number"
            value={course.credits}
            onChange={(e) => onUpdate(course.id, 'credits', Number(e.target.value))}
            className="w-16 text-center bg-gray-50 rounded border border-gray-200 focus:ring-2 focus:ring-blue-200 outline-none p-1"
          />
        </div>
      </div>

      {/* Score Input */}
      <div className="md:col-span-2">
        <label className="block text-xs text-gray-400 md:hidden">Score (0-100)</label>
        <div className="relative">
            <input
            type="number"
            value={course.score}
            onChange={handleScoreChange}
            className="w-full text-center font-bold text-blue-600 bg-blue-50 rounded border border-blue-100 focus:ring-2 focus:ring-blue-300 outline-none p-2"
            placeholder="0"
            />
            <span className="absolute right-2 top-2 text-xs text-blue-300">%</span>
        </div>
      </div>

      {/* Grade & Points Display */}
      <div className="md:col-span-3 flex justify-between md:justify-start md:space-x-4 items-center">
        <div>
             <label className="block text-xs text-gray-400 md:hidden">Grade</label>
            <span className={`inline-block px-3 py-1 rounded-full text-sm font-bold ${
                course.grade.startsWith('A') ? 'bg-green-100 text-green-700' :
                course.grade.startsWith('B') ? 'bg-blue-100 text-blue-700' :
                course.grade.startsWith('C') ? 'bg-yellow-100 text-yellow-700' :
                course.grade.startsWith('D') ? 'bg-orange-100 text-orange-700' :
                'bg-red-100 text-red-700'
            }`}>
            {course.grade}
            </span>
        </div>
        <div>
            <label className="block text-xs text-gray-400 md:hidden">Points</label>
            <span className="text-gray-500 font-mono">{course.points.toFixed(1)}</span>
        </div>
      </div>

      {/* Actions */}
      <div className="md:col-span-1 text-right">
        <button onClick={() => onDelete(course.id)} className="text-gray-400 hover:text-red-500 transition p-2">
          <span className="material-icons-round">delete</span>
        </button>
      </div>
    </div>
  );
};

export default CourseRow;