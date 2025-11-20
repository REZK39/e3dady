import React, { useState, useMemo, useEffect } from 'react';
import { Course } from '../types';
import { PREP_YEAR_COURSES } from '../constants';
import CourseRow from './CourseRow';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const GPACalculator: React.FC = () => {
  // Load from local storage or use default
  const [courses, setCourses] = useState<Course[]>(() => {
      const saved = localStorage.getItem('psu-courses');
      return saved ? JSON.parse(saved) : PREP_YEAR_COURSES;
  });

  useEffect(() => {
      localStorage.setItem('psu-courses', JSON.stringify(courses));
  }, [courses]);

  const handleUpdateCourse = (id: string, field: keyof Course, value: any) => {
    setCourses(prev => prev.map(c => c.id === id ? { ...c, [field]: value } : c));
  };

  const handleDeleteCourse = (id: string) => {
    if(confirm('Are you sure you want to remove this course?')) {
        setCourses(prev => prev.filter(c => c.id !== id));
    }
  };

  const handleAddCourse = (semester: 1 | 2) => {
    const newCourse: Course = {
      id: Date.now().toString(),
      name: 'New Course',
      credits: 3,
      score: 0,
      grade: 'F',
      points: 0,
      semester: semester,
      isCustom: true
    };
    setCourses([...courses, newCourse]);
  };

  const resetToDefault = () => {
      if(confirm('Reset all courses to default Preparatory Year curriculum? This will erase your changes.')){
          setCourses(PREP_YEAR_COURSES);
      }
  };

  const { gpa, cgpa, totalCredits, totalPoints } = useMemo(() => {
    // Simple calculation assuming all courses shown are taken
    const totalPts = courses.reduce((sum, c) => sum + (c.points * c.credits), 0);
    const totalCr = courses.reduce((sum, c) => sum + c.credits, 0);
    return {
      gpa: totalCr === 0 ? 0 : totalPts / totalCr, 
      cgpa: totalCr === 0 ? 0 : totalPts / totalCr, 
      totalCredits: totalCr,
      totalPoints: totalPts
    };
  }, [courses]);

  // Chart Data
  const chartData = courses.map(c => ({
      name: c.name.substring(0, 10) + (c.name.length>10 ? '...' : ''),
      score: c.score,
      points: c.points,
      full: c
  }));

  const sem1Courses = courses.filter(c => c.semester === 1);
  const sem2Courses = courses.filter(c => c.semester === 2);

  return (
    <div className="space-y-8">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-psu-blue to-blue-800 text-white rounded-2xl p-6 shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 opacity-10 transform translate-x-4 -translate-y-4">
                <span className="material-icons-round text-9xl">school</span>
            </div>
            <h3 className="text-blue-200 font-medium mb-1">Cumulative GPA</h3>
            <div className="text-5xl font-bold">{cgpa.toFixed(2)}</div>
            <p className="mt-4 text-sm text-blue-200">Total Points: {totalPoints.toFixed(1)}</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <h3 className="text-gray-500 font-medium mb-1">Total Credits</h3>
            <div className="text-4xl font-bold text-gray-800">{totalCredits}</div>
            <div className="mt-4 w-full bg-gray-100 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: `${Math.min(100, (totalCredits/170)*100)}%` }}></div>
            </div>
            <p className="mt-2 text-xs text-gray-400">Progress to graduation (~170 hrs)</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 flex flex-col justify-center items-center">
            <button onClick={resetToDefault} className="w-full py-3 bg-gray-100 text-gray-600 font-bold rounded-lg hover:bg-red-50 hover:text-red-500 transition flex items-center justify-center gap-2">
                <span className="material-icons-round">restart_alt</span>
                Reset to Default
            </button>
        </div>
      </div>

      {/* Semester 1 */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <span className="material-icons-round text-blue-600">looks_one</span> Semester 1
            </h2>
            <button onClick={() => handleAddCourse(1)} className="bg-blue-50 text-blue-600 hover:bg-blue-100 px-4 py-2 rounded-lg font-medium transition flex items-center gap-1">
                <span className="material-icons-round text-sm">add</span> Add Subject
            </button>
          </div>
          
          <div className="space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 px-4 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider hidden md:grid">
                <div className="md:col-span-4">Subject Name</div>
                <div className="md:col-span-2">Credits</div>
                <div className="md:col-span-2">Score (%)</div>
                <div className="md:col-span-3">Grade & Points</div>
                <div className="md:col-span-1 text-right">Actions</div>
            </div>
            {sem1Courses.length > 0 ? sem1Courses.map((course) => (
                <CourseRow 
                    key={course.id} 
                    course={course} 
                    onUpdate={handleUpdateCourse} 
                    onDelete={handleDeleteCourse}
                />
            )) : (
                <div className="p-8 text-center text-gray-400 bg-gray-50 rounded-lg border border-dashed border-gray-200">
                    No courses in Semester 1
                </div>
            )}
          </div>
      </div>

      {/* Semester 2 */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <span className="material-icons-round text-blue-600">looks_two</span> Semester 2
            </h2>
            <button onClick={() => handleAddCourse(2)} className="bg-blue-50 text-blue-600 hover:bg-blue-100 px-4 py-2 rounded-lg font-medium transition flex items-center gap-1">
                <span className="material-icons-round text-sm">add</span> Add Subject
            </button>
          </div>
          
          <div className="space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 px-4 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider hidden md:grid">
                <div className="md:col-span-4">Subject Name</div>
                <div className="md:col-span-2">Credits</div>
                <div className="md:col-span-2">Score (%)</div>
                <div className="md:col-span-3">Grade & Points</div>
                <div className="md:col-span-1 text-right">Actions</div>
            </div>
            {sem2Courses.length > 0 ? sem2Courses.map((course) => (
                <CourseRow 
                    key={course.id} 
                    course={course} 
                    onUpdate={handleUpdateCourse} 
                    onDelete={handleDeleteCourse}
                />
            )) : (
                <div className="p-8 text-center text-gray-400 bg-gray-50 rounded-lg border border-dashed border-gray-200">
                    No courses in Semester 2
                </div>
            )}
          </div>
      </div>

      {/* Analytics Chart */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <span className="material-icons-round text-purple-600">insights</span> Performance Analytics
          </h2>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                    <XAxis dataKey="name" hide />
                    <YAxis domain={[0, 4]} />
                    <Tooltip 
                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                        cursor={{ fill: '#f9fafb' }}
                    />
                    <Bar dataKey="points" radius={[4, 4, 0, 0]}>
                        {chartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.points >= 3.0 ? '#4ade80' : entry.points >= 2.0 ? '#60a5fa' : '#f87171'} />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="text-center text-sm text-gray-400 mt-2">GPA Points per Subject</p>
      </div>
    </div>
  );
};

export default GPACalculator;