
import React, { useState, useEffect } from 'react';
import { Student, StudentStatus } from '../types';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  LineChart, Line, PieChart, Pie, Cell 
} from 'recharts';
import { getGeneralSchoolSummary } from '../services/geminiService';

interface DashboardProps {
  students: Student[];
}

export const Dashboard: React.FC<DashboardProps> = ({ students }) => {
  const [aiSummary, setAiSummary] = useState<string>('');
  const [loadingAi, setLoadingAi] = useState(false);

  useEffect(() => {
    const fetchSummary = async () => {
      setLoadingAi(true);
      const summary = await getGeneralSchoolSummary(students);
      setAiSummary(summary);
      setLoadingAi(false);
    };
    fetchSummary();
  }, [students.length]);

  const activeCount = students.filter(s => s.status === StudentStatus.ACTIVE).length;
  const avgGpa = (students.reduce((acc, s) => acc + s.gpa, 0) / (students.length || 1)).toFixed(2);
  const avgAttendance = (students.reduce((acc, s) => acc + s.attendance, 0) / (students.length || 1)).toFixed(1);

  // Chart data
  const gradeData = [9, 10, 11, 12].map(g => ({
    name: `Grade ${g}`,
    students: students.filter(s => s.grade === g).length,
  }));

  const statusData = Object.values(StudentStatus).map(status => ({
    name: status,
    value: students.filter(s => s.status === status).length,
  }));

  const COLORS = ['#4f46e5', '#10b981', '#f59e0b', '#ef4444'];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard title="Total Students" value={students.length} icon="👥" color="bg-indigo-50 text-indigo-600" />
        <StatsCard title="Active Students" value={activeCount} icon="✅" color="bg-emerald-50 text-emerald-600" />
        <StatsCard title="Average GPA" value={avgGpa} icon="🎓" color="bg-amber-50 text-amber-600" />
        <StatsCard title="Avg Attendance" value={`${avgAttendance}%`} icon="📅" color="bg-rose-50 text-rose-600" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-semibold mb-6">Student Distribution by Grade</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={gradeData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                  cursor={{ fill: '#f8fafc' }}
                />
                <Bar dataKey="students" fill="#4f46e5" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-semibold mb-6">Enrollment Status</h3>
          <div className="h-[300px] relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex items-center justify-center flex-col pointer-events-none">
              <span className="text-2xl font-bold text-slate-800">{activeCount}</span>
              <span className="text-xs text-slate-500">Active</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-indigo-900 text-white p-8 rounded-xl shadow-lg relative overflow-hidden">
        <div className="relative z-10 max-w-3xl">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-2xl">✨</span>
            <h3 className="text-xl font-bold tracking-tight">AI Administrative Insights</h3>
          </div>
          {loadingAi ? (
            <div className="flex items-center gap-3">
              <div className="animate-spin h-5 w-5 border-2 border-white/30 border-t-white rounded-full"></div>
              <p className="text-indigo-200 animate-pulse">Analyzing student performance patterns...</p>
            </div>
          ) : (
            <div className="prose prose-invert max-w-none text-indigo-100 leading-relaxed">
              {aiSummary.split('\n').map((line, i) => (
                <p key={i} className="mb-2">{line}</p>
              ))}
            </div>
          )}
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full -mr-20 -mt-20 blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-48 h-48 bg-emerald-500/10 rounded-full mr-20 -mb-20 blur-3xl"></div>
      </div>
    </div>
  );
};

const StatsCard: React.FC<{ title: string; value: string | number; icon: string; color: string }> = ({ 
  title, value, icon, color 
}) => (
  <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
    <div>
      <p className="text-sm font-medium text-slate-500 mb-1">{title}</p>
      <p className="text-2xl font-bold text-slate-900">{value}</p>
    </div>
    <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-xl ${color}`}>
      {icon}
    </div>
  </div>
);
