
import { GoogleGenAI, Type } from "@google/genai";
import { Student } from "../types";

export const getStudentInsights = async (student: Student): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  
  const prompt = `
    Analyze the following student profile and provide a brief performance summary (3-4 sentences). 
    Include strengths, areas for improvement, and a suggested academic focus.
    
    Student: ${student.firstName} ${student.lastName}
    Grade: ${student.grade}
    GPA: ${student.gpa}
    Attendance: ${student.attendance}%
    Status: ${student.status}
    Major: ${student.major || 'Undeclared'}
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        systemInstruction: "You are an expert academic counselor. Provide constructive, professional insights for students based on their metrics.",
        temperature: 0.7,
      },
    });
    return response.text || "No insights available at this time.";
  } catch (error) {
    console.error("Gemini Insight Error:", error);
    return "Error generating AI insights. Please check your connection.";
  }
};

export const getGeneralSchoolSummary = async (students: Student[]): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  
  const studentDataSummary = students.map(s => `GPA: ${s.gpa}, Attendance: ${s.attendance}%`).join('; ');
  
  const prompt = `
    Here is a summarized dataset of student metrics: ${studentDataSummary}.
    Based on this, generate 3 actionable administrative recommendations to improve overall school performance and engagement.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        systemInstruction: "You are a senior education administrator. Provide strategic advice based on data trends.",
        temperature: 0.5,
      },
    });
    return response.text || "No recommendations generated.";
  } catch (error) {
    console.error("Gemini Summary Error:", error);
    return "Unable to generate recommendations.";
  }
};
