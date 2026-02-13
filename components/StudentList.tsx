
import React, { useState, useMemo } from 'react';
import { Student, StudentStatus } from '../types';
import { Link } from 'react-router-dom';
import { getStudentInsights } from '../services/geminiService';

interface StudentListProps {
  students: Student[];
  onDelete: (id: string) => void;
}

export const StudentList: React.FC<StudentListProps> = ({ students, onDelete }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [gradeFilter, setGradeFilter] = useState<string>('all');
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [insight, setInsight] = useState<string | null>(null);
  const [loadingInsight, setLoadingInsight] = useState(false);

  const filteredStudents = useMemo(() => {
    return students.filter(s => {
      const matchesSearch = `${s.firstName} ${s.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            s.email.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesGrade = gradeFilter === 'all' || s.grade.toString() === gradeFilter;
      return matchesSearch && matchesGrade;
    });
  }, [students, searchTerm, gradeFilter]);

  const handleShowInsight = async (student: Student) => {
    setSelectedStudent(student);
    setLoadingInsight(true);
    const data = await getStudentInsights(student);
    setInsight(data);
    setLoadingInsight(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Student Directory</h2>
          <p className="text-slate-500">Manage and view student information.</p>
        </div>
        <Link 
          to="/students/add" 
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-indigo-700 transition-colors inline-flex items-center gap-2"
        >
          <span>➕</span> Add New Student
        </Link>
      </div>

      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">🔍</span>
          <input 
            type="text" 
            placeholder="Search by name or email..."
            className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <select 
          className="px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 min-w-[150px]"
          value={gradeFilter}
          onChange={(e) => setGradeFilter(e.target.value)}
        >
          <option value="all">All Grades</option>
          <option value="9">Grade 9</option>
          <option value="10">Grade 10</option>
          <option value="11">Grade 11</option>
          <option value="12">Grade 12</option>
        </select>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Student</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Grade</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">GPA</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Attendance</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Status</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredStudents.length > 0 ? filteredStudents.map((s) => (
                <tr key={s.id} className="hover:bg-slate-50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center font-bold text-indigo-600 uppercase">
                        {s.firstName[0]}{s.lastName[0]}
                      </div>
                      <div>
                        <p className="font-semibold text-slate-900">{s.firstName} {s.lastName}</p>
                        <p className="text-xs text-slate-500">{s.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">Grade {s.grade}</td>
                  <td className="px-6 py-4">
                    <span className={`font-semibold ${s.gpa >= 3.5 ? 'text-emerald-600' : s.gpa < 2.5 ? 'text-rose-600' : 'text-slate-900'}`}>
                      {s.gpa.toFixed(2)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-indigo-500" style={{ width: `${s.attendance}%` }}></div>
                      </div>
                      <span className="text-sm text-slate-600">{s.attendance}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      s.status === StudentStatus.ACTIVE ? 'bg-emerald-50 text-emerald-600' : 
                      s.status === StudentStatus.GRADUATED ? 'bg-indigo-50 text-indigo-600' :
                      'bg-slate-100 text-slate-600'
                    }`}>
                      {s.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <button 
                      onClick={() => handleShowInsight(s)}
                      className="text-slate-400 hover:text-indigo-600 transition-colors p-1"
                      title="AI Insights"
                    >
                      ✨
                    </button>
                    <Link 
                      to={`/students/edit/${s.id}`} 
                      className="text-slate-400 hover:text-blue-600 transition-colors p-1"
                    >
                      ✏️
                    </Link>
                    <button 
                      onClick={() => onDelete(s.id)}
                      className="text-slate-400 hover:text-red-600 transition-colors p-1"
                    >
                      🗑️
                    </button>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-slate-500">
                    No students found matching your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Insight Modal */}
      {selectedStudent && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="p-6 bg-indigo-900 text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center font-bold text-lg">
                  {selectedStudent.firstName[0]}{selectedStudent.lastName[0]}
                </div>
                <div>
                  <h3 className="text-lg font-bold">{selectedStudent.firstName} {selectedStudent.lastName}</h3>
                  <p className="text-sm text-indigo-200">Academic Insight</p>
                </div>
              </div>
              <button 
                onClick={() => { setSelectedStudent(null); setInsight(null); }}
                className="text-white/50 hover:text-white transition-colors"
              >
                ✕
              </button>
            </div>
            <div className="p-8">
              {loadingInsight ? (
                <div className="flex flex-col items-center justify-center gap-4 py-8">
                  <div className="animate-spin h-8 w-8 border-4 border-indigo-100 border-t-indigo-600 rounded-full"></div>
                  <p className="text-slate-500 font-medium">Generating performance report...</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-slate-50 p-3 rounded-lg">
                      <p className="text-xs text-slate-500 mb-1">Current GPA</p>
                      <p className="text-lg font-bold text-slate-900">{selectedStudent.gpa}</p>
                    </div>
                    <div className="bg-slate-50 p-3 rounded-lg">
                      <p className="text-xs text-slate-500 mb-1">Attendance</p>
                      <p className="text-lg font-bold text-slate-900">{selectedStudent.attendance}%</p>
                    </div>
                  </div>
                  <div className="prose prose-slate text-slate-600 leading-relaxed italic">
                    "{insight}"
                  </div>
                  <div className="pt-6 border-t border-slate-100 flex justify-end">
                    <button 
                      onClick={() => { setSelectedStudent(null); setInsight(null); }}
                      className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
                    >
                      Close Report
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
