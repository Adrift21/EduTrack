
import React, { useState, useEffect, useCallback } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Dashboard } from './components/Dashboard';
import { StudentList } from './components/StudentList';
import { StudentForm } from './components/StudentForm';
import { Auth } from './components/Auth';
import { Student, User } from './types';
import { MOCK_STUDENTS } from './constants';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('edu_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [students, setStudents] = useState<Student[]>(() => {
    const saved = localStorage.getItem('edu_students');
    return saved ? JSON.parse(saved) : MOCK_STUDENTS;
  });

  useEffect(() => {
    localStorage.setItem('edu_students', JSON.stringify(students));
  }, [students]);

  const handleLogin = (u: User) => {
    setUser(u);
    localStorage.setItem('edu_user', JSON.stringify(u));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('edu_user');
  };

  const addStudent = (s: Student) => {
    setStudents(prev => [...prev, s]);
  };

  const updateStudent = (id: string, updated: Partial<Student>) => {
    setStudents(prev => prev.map(s => s.id === id ? { ...s, ...updated } : s));
  };

  const deleteStudent = (id: string) => {
    if (confirm('Are you sure you want to delete this student record?')) {
      setStudents(prev => prev.filter(s => s.id !== id));
    }
  };

  if (!user) {
    return <Auth onLogin={handleLogin} />;
  }

  return (
    <HashRouter>
      <Layout user={user} onLogout={handleLogout}>
        <Routes>
          <Route path="/" element={<Dashboard students={students} />} />
          <Route 
            path="/students" 
            element={
              <StudentList 
                students={students} 
                onDelete={deleteStudent} 
              />
            } 
          />
          <Route 
            path="/students/add" 
            element={<StudentForm onSave={addStudent} />} 
          />
          <Route 
            path="/students/edit/:id" 
            element={
              <StudentForm 
                onSave={(s) => updateStudent(s.id, s)} 
                students={students} 
              />
            } 
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </HashRouter>
  );
};

export default App;
