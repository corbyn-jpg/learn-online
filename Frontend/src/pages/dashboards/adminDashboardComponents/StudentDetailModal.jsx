import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, User, GraduationCap, Calendar, BookOpen, BarChart3, Clock, CheckCircle2, AlertCircle } from "lucide-react";

export function StudentDetailModal({ isOpen, onClose, student, courses }) {
  if (!student) return null;

  // Mock data for the specific student based on the request
  const studentStats = {
    attendance: "94%",
    averageGrade: "82%",
    completedAssignments: "12/14",
    participation: "High",
    credits: "120",
    standing: "Excellent"
  };

  const studentGrades = [
    { subject: "UX Design 200", grade: "85%", status: "Distinction" },
    { subject: "Interactive Dev 200", grade: "78%", status: "Pass" },
    { subject: "Communication Design 200", grade: "88%", status: "Distinction" },
  ];

  const studentClasses = [
    { day: "Monday", time: "09:00 - 11:00", room: "Studio A", subject: "UX200" },
    { day: "Wednesday", time: "13:00 - 15:00", room: "Lab 4", subject: "ID200" },
    { day: "Thursday", time: "10:00 - 12:00", room: "Room 102", subject: "PH200" },
  ];

  const enrolledCourseObjects = courses.filter(c => student.courseIds?.includes(c.id));

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="bg-white w-full max-w-4xl rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
          >
            {/* Header */}
            <div className="relative p-8 pb-4 flex items-start justify-between bg-gradient-to-br from-indigo-50 to-white">
              <div className="flex items-center gap-6">
                <div className="w-20 h-20 rounded-3xl bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-200">
                  <User className="w-10 h-10 text-white" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 font-['Gabarito']">{student.name}</h2>
                  <div className="flex items-center gap-2 mt-1">
                    <GraduationCap className="w-4 h-4 text-indigo-500" />
                    <span className="text-gray-500 font-medium">{student.major}</span>
                    <span className="px-2 py-0.5 rounded-full bg-green-100 text-green-700 text-xs font-bold ml-2">Active Student</span>
                  </div>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-6 h-6 text-gray-400" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-8 pt-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* Left Column: Stats Overview */}
                <div className="md:col-span-1 flex flex-col gap-4">
                  <div className="bg-gray-50 rounded-3xl p-6 border border-gray-100">
                    <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                       <BarChart3 className="w-5 h-5 text-indigo-500" />
                       Performance Overview
                    </h3>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-500">Average Grade</span>
                        <span className="text-sm font-bold text-gray-900">{studentStats.averageGrade}</span>
                      </div>
                      <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                        <div className="bg-indigo-500 h-full w-[82%]"></div>
                      </div>
                      
                      <div className="flex justify-between items-center pt-2">
                        <span className="text-sm text-gray-500">Attendance</span>
                        <span className="text-sm font-bold text-gray-900">{studentStats.attendance}</span>
                      </div>
                      <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                        <div className="bg-green-500 h-full w-[94%]"></div>
                      </div>

                      <div className="grid grid-cols-2 gap-3 pt-4">
                        <div className="bg-white p-3 rounded-2xl border border-gray-100">
                           <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Credits</p>
                           <p className="text-lg font-bold text-gray-800">{studentStats.credits}</p>
                        </div>
                        <div className="bg-white p-3 rounded-2xl border border-gray-100">
                           <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Standing</p>
                           <p className="text-lg font-bold text-indigo-600">{studentStats.standing}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-indigo-600 rounded-3xl p-6 text-white shadow-lg shadow-indigo-100">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 bg-white/20 rounded-xl">
                        <CheckCircle2 className="w-5 h-5 text-white" />
                      </div>
                      <h3 className="font-bold">Next Deadline</h3>
                    </div>
                    <p className="text-sm text-indigo-100 mb-1">Portfolio Submission</p>
                    <p className="text-xl font-bold">Tomorrow, 11:59 PM</p>
                    <div className="mt-4 pt-4 border-t border-white/20 flex items-center justify-between">
                       <span className="text-xs font-medium text-indigo-200">UX Design 200</span>
                       <Clock className="w-4 h-4 text-indigo-200" />
                    </div>
                  </div>
                </div>

                {/* Right Column: Detailed Info */}
                <div className="md:col-span-2 flex flex-col gap-6">
                  
                  {/* Courses Section */}
                  <div>
                    <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                      <BookOpen className="w-5 h-5 text-indigo-500" />
                      Currently Enrolled Courses
                    </h3>
                    <div className="grid grid-cols-1 gap-3">
                      {enrolledCourseObjects.map(course => (
                        <div key={course.id} className="flex items-center justify-between p-4 bg-white border border-gray-100 rounded-2xl hover:border-indigo-200 transition-colors">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center font-bold text-indigo-600">
                              {course.code}
                            </div>
                            <div>
                               <p className="font-bold text-gray-800">{course.title}</p>
                               <p className="text-xs text-gray-400">Semester {course.semester} • Year {course.year}</p>
                            </div>
                          </div>
                          <div className="text-right">
                             <span className="px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-[10px] font-bold uppercase tracking-wider">Full Time</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Weekly Schedule Section */}
                  <div>
                    <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                      <Clock className="w-5 h-5 text-indigo-500" />
                      Weekly Class Schedule
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      {studentClasses.map((cls, i) => (
                        <div key={i} className="p-3 bg-white border border-gray-100 rounded-2xl">
                          <p className="text-[10px] font-black uppercase text-indigo-600 mb-1">{cls.day}</p>
                          <p className="font-bold text-gray-800 text-sm">{cls.subject}</p>
                          <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                            <Clock className="w-3 h-3" /> {cls.time}
                          </p>
                          <p className="text-xs text-gray-400 mt-0.5">{cls.room}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Grades Section */}
                  <div>
                    <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                      <GraduationCap className="w-5 h-5 text-indigo-500" />
                      Academic Performance
                    </h3>
                    <div className="overflow-hidden rounded-2xl border border-gray-100">
                      <table className="w-full text-left">
                        <thead className="bg-gray-50 border-b border-gray-100">
                          <tr>
                            <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Subject</th>
                            <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Grade</th>
                            <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider text-right">Status</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                          {studentGrades.map((g, i) => (
                            <tr key={i} className="hover:bg-gray-50 transition-colors">
                              <td className="px-6 py-4 font-bold text-gray-800">{g.subject}</td>
                              <td className="px-6 py-4">
                                <span className={`font-black ${parseInt(g.grade) > 80 ? 'text-green-600' : 'text-indigo-600'}`}>
                                  {g.grade}
                                </span>
                              </td>
                              <td className="px-6 py-4 text-right">
                                <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                                  g.status === 'Distinction' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                                }`}>
                                  {g.status}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Attendance Section */}
                  <div className="bg-orange-50/50 rounded-3xl p-6 border border-orange-100">
                    <div className="flex items-center justify-between mb-4">
                       <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                         <Calendar className="w-5 h-5 text-orange-500" />
                         Recent Attendance
                       </h3>
                       <button className="text-xs font-bold text-orange-600 hover:underline">View Detailed Log</button>
                    </div>
                    <div className="flex gap-2">
                       {[...Array(10)].map((_, i) => (
                         <div 
                           key={i} 
                           className={`h-8 flex-1 rounded-lg ${i === 2 || i === 7 ? 'bg-orange-200 border border-orange-300' : 'bg-green-200 border border-green-300'} flex items-center justify-center`}
                         >
                           {i === 2 || i === 7 ? <AlertCircle className="w-4 h-4 text-orange-600" /> : <CheckCircle2 className="w-4 h-4 text-green-600" />}
                         </div>
                       ))}
                    </div>
                    <p className="mt-3 text-xs text-gray-500 italic">Historical data across all active courses for the current semester.</p>
                  </div>

                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-gray-100 bg-gray-50 flex justify-end gap-3">
               <button 
                 className="px-6 py-2.5 rounded-2xl border border-gray-200 font-bold text-gray-600 hover:bg-white transition-colors"
                 onClick={onClose}
               >
                 Close Profile
               </button>
               <button className="px-6 py-2.5 rounded-2xl bg-indigo-600 font-bold text-white hover:bg-indigo-700 shadow-lg shadow-indigo-100 transition-all">
                 Generate Report
               </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
