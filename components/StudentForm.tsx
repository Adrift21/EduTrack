
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Student, StudentStatus } from '../types';

interface StudentFormProps {
  onSave: (s: Student) => void;
  students?: Student[];
}

export const StudentForm: React.FC<StudentFormProps> = ({ onSave, students = [] }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEditing = Boolean(id);

  const [formData, setFormData] = useState<Partial<Student>>({
    firstName: '',
    lastName: '',
    email: '',
    dateOfBirth: '',
    enrollmentDate: new Date().toISOString().split('T')[0],
    grade: 9,
    gpa: 0,
    status: StudentStatus.ACTIVE,
    attendance: 100,
    major: ''
  });

  useEffect(() => {
    if (isEditing && students) {
      const student = students.find(s => s.id === id);
      if (student) {
        setFormData(student);
      }
    }
  }, [id, students, isEditing]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newStudent: Student = {
      ...(formData as Student),
      id: isEditing ? (id as string) : Math.random().toString(36).substr(2, 9),
    };
    onSave(newStudent);
    navigate('/students');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'grade' || name === 'gpa' || name === 'attendance' ? parseFloat(value) : value
    }));
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <Link to="/students" className="text-indigo-600 hover:text-indigo-700 text-sm font-medium mb-4 inline-block">
          ← Back to Students
        </Link>
        <h2 className="text-2xl font-bold text-slate-900">{isEditing ? 'Edit Student Record' : 'Register New Student'}</h2>
        <p className="text-slate-500">Enter the student's personal and academic details below.</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-1">
            <label className="text-sm font-semibold text-slate-700">First Name</label>
            <input 
              required
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:outline-none"
              placeholder="John"
            />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-semibold text-slate-700">Last Name</label>
            <input 
              required
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:outline-none"
              placeholder="Doe"
            />
          </div>
          <div className="md:col-span-2 space-y-1">
            <label className="text-sm font-semibold text-slate-700">Email Address</label>
            <input 
              required
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:outline-none"
              placeholder="john.doe@university.edu"
            />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-semibold text-slate-700">Date of Birth</label>
            <input 
              required
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:outline-none"
            />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-semibold text-slate-700">Grade Level</label>
            <select 
              name="grade"
              value={formData.grade}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:outline-none"
            >
              {[9, 10, 11, 12].map(g => (
                <option key={g} value={g}>Grade {g}</option>
              ))}
            </select>
          </div>
          <div className="space-y-1">
            <label className="text-sm font-semibold text-slate-700">Major / Focus</label>
            <input 
              name="major"
              value={formData.major}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:outline-none"
              placeholder="e.g. Computer Science"
            />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-semibold text-slate-700">Status</label>
            <select 
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:outline-none"
            >
              {Object.values(StudentStatus).map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
          <div className="space-y-1">
            <label className="text-sm font-semibold text-slate-700">GPA (0.0 - 4.0)</label>
            <input 
              type="number"
              step="0.01"
              min="0"
              max="4"
              name="gpa"
              value={formData.gpa}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:outline-none"
            />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-semibold text-slate-700">Attendance (%)</label>
            <input 
              type="number"
              min="0"
              max="100"
              name="attendance"
              value={formData.attendance}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:outline-none"
            />
          </div>
        </div>

        <div className="pt-6 border-t border-slate-100 flex justify-end gap-3">
          <button 
            type="button" 
            onClick={() => navigate('/students')}
            className="px-6 py-2 text-slate-600 font-semibold hover:bg-slate-50 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button 
            type="submit"
            className="px-8 py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors shadow-md shadow-indigo-200"
          >
            {isEditing ? 'Save Changes' : 'Create Student'}
          </button>
        </div>
      </form>
    </div>
  );
};
