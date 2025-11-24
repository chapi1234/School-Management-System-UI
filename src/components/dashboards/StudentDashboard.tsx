import { useState } from 'react';
import { StatsCard } from '../shared/StatsCard';
import { AnnouncementsPanel } from '../shared/AnnouncementsPanel';
import { NotificationsPanel } from '../shared/NotificationsPanel';
import { BookOpen, ClipboardCheck, Calendar, TrendingUp, Upload, FileText } from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, LineChart, Line } from 'recharts';
import { 
  mockClasses, 
  mockAnnouncements, 
  mockNotifications,
  mockAssignments,
  mockGrades,
  performanceData,
  attendanceData
} from '../../lib/mockData';
import { Assignment } from '../../lib/types';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '../ui/dialog';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { toast } from 'sonner@2.0.3';

interface StudentDashboardProps {
  activeTab: string;
}

export function StudentDashboard({ activeTab }: StudentDashboardProps) {
  const [classes] = useState(mockClasses.slice(0, 4));
  const [assignments] = useState(mockAssignments);
  const [grades] = useState(mockGrades.filter(g => g.studentId === '1'));
  const [submitDialogOpen, setSubmitDialogOpen] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState<Assignment | null>(null);
  const [viewMaterialsOpen, setViewMaterialsOpen] = useState(false);
  const [selectedClass, setSelectedClass] = useState<typeof mockClasses[0] | null>(null);

  const handleSubmitAssignment = (assignment: Assignment) => {
    setSelectedAssignment(assignment);
    setSubmitDialogOpen(true);
  };

  const handleViewMaterials = (cls: typeof mockClasses[0]) => {
    setSelectedClass(cls);
    setViewMaterialsOpen(true);
  };

  const handleJoinClass = (cls: typeof mockClasses[0]) => {
    toast.success(`Joining ${cls.subject} class...`);
  };

  if (activeTab === 'overview') {
    return (
      <div className="space-y-6">
        {/* Stats Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <StatsCard
            title="Enrolled Classes"
            value={classes.length}
            icon={BookOpen}
            color="#3b82f6"
          />
          <StatsCard
            title="Assignments"
            value={assignments.filter(a => a.status === 'pending').length}
            icon={ClipboardCheck}
            color="#8b5cf6"
          />
          <StatsCard
            title="Attendance"
            value="92%"
            icon={Calendar}
            color="#10b981"
          />
          <StatsCard
            title="Current GPA"
            value="3.8"
            icon={TrendingUp}
            color="#06b6d4"
          />
        </div>

        {/* Performance Chart and Progress */}
        <div className="grid gap-6 lg:grid-cols-2">
          <Card className="border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] p-6 backdrop-blur-xl">
            <h3 className="mb-4 font-semibold">Subject Performance</h3>
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart data={performanceData}>
                <PolarGrid stroke="#ffffff20" />
                <PolarAngleAxis dataKey="subject" stroke="#9ca3af" />
                <PolarRadiusAxis stroke="#9ca3af" />
                <Radar 
                  name="Score" 
                  dataKey="score" 
                  stroke="#06b6d4" 
                  fill="#06b6d4" 
                  fillOpacity={0.5} 
                />
              </RadarChart>
            </ResponsiveContainer>
          </Card>

          <Card className="border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] p-6 backdrop-blur-xl">
            <h3 className="mb-4 font-semibold">Course Progress</h3>
            <div className="space-y-4">
              {classes.map((cls) => (
                <div key={cls.id}>
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-sm">{cls.subject}</span>
                    <span className="text-sm text-gray-400">
                      {Math.floor(Math.random() * 20 + 70)}%
                    </span>
                  </div>
                  <Progress value={Math.floor(Math.random() * 20 + 70)} />
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Upcoming Assignments */}
        <Card className="border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] p-6 backdrop-blur-xl">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-semibold">Upcoming Assignments</h3>
            <Button variant="ghost" size="sm">View All</Button>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {assignments.filter(a => a.status === 'pending').slice(0, 4).map((assignment) => (
              <div 
                key={assignment.id}
                className="group rounded-xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent p-4 transition-all hover:border-cyan-500/50 hover:from-cyan-500/10"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="font-semibold">{assignment.title}</h4>
                    <p className="mt-1 text-sm text-gray-400">{assignment.subject}</p>
                    <div className="mt-3 flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-400">
                        Due: {new Date(assignment.dueDate).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <Badge variant="outline" className="border-yellow-500/50 text-yellow-400">
                    Pending
                  </Badge>
                </div>
                <Button 
                  size="sm" 
                  className="mt-4 w-full bg-gradient-to-r from-cyan-600 to-cyan-500"
                  onClick={() => handleSubmitAssignment(assignment)}
                >
                  Submit
                </Button>
              </div>
            ))}
          </div>
        </Card>

        {/* Announcements and Notifications */}
        <div className="grid gap-6 lg:grid-cols-2">
          <AnnouncementsPanel announcements={mockAnnouncements} currentRole="student" />
          <NotificationsPanel notifications={mockNotifications} />
        </div>
      </div>
    );
  }

  if (activeTab === 'classes') {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl">My Classes</h2>
          <p className="text-sm text-gray-400">View your enrolled classes</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {classes.map((cls) => (
            <Card 
              key={cls.id}
              className="border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] p-6 backdrop-blur-xl"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="mb-2 flex items-center gap-2">
                    <div className="rounded-lg bg-blue-500/20 p-2">
                      <BookOpen className="h-5 w-5 text-blue-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{cls.subject}</h3>
                      <p className="text-sm text-gray-400">{cls.name}</p>
                    </div>
                  </div>
                  
                  <div className="mt-4 space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">Teacher</span>
                      <span>{cls.teacher}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">Students</span>
                      <span>{cls.students}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">Progress</span>
                      <span>{Math.floor(Math.random() * 20 + 70)}%</span>
                    </div>
                  </div>

                  <div className="mt-4">
                    <Progress value={Math.floor(Math.random() * 20 + 70)} />
                  </div>
                </div>
              </div>
              
              <div className="mt-4 flex gap-2">
                <Button size="sm" variant="outline" className="flex-1" onClick={() => handleViewMaterials(cls)}>
                  View Materials
                </Button>
                <Button size="sm" className="flex-1 bg-gradient-to-r from-blue-600 to-blue-500" onClick={() => handleJoinClass(cls)}>
                  Join Class
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* View Materials Dialog */}
        <Dialog open={viewMaterialsOpen} onOpenChange={setViewMaterialsOpen}>
          <DialogContent className="border-white/10 bg-gray-900">
            <DialogHeader>
              <DialogTitle>Course Materials - {selectedClass?.subject}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                <div className="flex items-start gap-3">
                  <FileText className="h-5 w-5 text-blue-400" />
                  <div>
                    <p className="font-medium">Lecture Notes - Week 1</p>
                    <p className="text-sm text-gray-400">PDF · 2.5 MB</p>
                  </div>
                </div>
              </div>
              <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                <div className="flex items-start gap-3">
                  <FileText className="h-5 w-5 text-purple-400" />
                  <div>
                    <p className="font-medium">Assignment Instructions</p>
                    <p className="text-sm text-gray-400">PDF · 1.2 MB</p>
                  </div>
                </div>
              </div>
              <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                <div className="flex items-start gap-3">
                  <FileText className="h-5 w-5 text-cyan-400" />
                  <div>
                    <p className="font-medium">Reference Materials</p>
                    <p className="text-sm text-gray-400">PDF · 3.8 MB</p>
                  </div>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setViewMaterialsOpen(false)}>Close</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    );
  }

  if (activeTab === 'grades') {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl">My Grades</h2>
          <p className="text-sm text-gray-400">View your academic performance</p>
        </div>

        {/* Overall Performance */}
        <div className="grid gap-6 lg:grid-cols-2">
          <Card className="border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] p-6 backdrop-blur-xl">
            <h3 className="mb-4 font-semibold">Performance Overview</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                <XAxis dataKey="subject" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1f2937', 
                    border: '1px solid #374151',
                    borderRadius: '8px'
                  }}
                />
                <Bar dataKey="score" fill="#06b6d4" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>

          <Card className="border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] p-6 backdrop-blur-xl">
            <h3 className="mb-4 font-semibold">Grade Summary</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between rounded-lg bg-white/5 p-4">
                <span className="text-gray-400">Current GPA</span>
                <span className="text-2xl">3.8</span>
              </div>
              <div className="flex items-center justify-between rounded-lg bg-white/5 p-4">
                <span className="text-gray-400">Highest Grade</span>
                <Badge className="bg-green-500/20 text-green-400">95%</Badge>
              </div>
              <div className="flex items-center justify-between rounded-lg bg-white/5 p-4">
                <span className="text-gray-400">Average Grade</span>
                <Badge className="bg-blue-500/20 text-blue-400">87%</Badge>
              </div>
              <div className="flex items-center justify-between rounded-lg bg-white/5 p-4">
                <span className="text-gray-400">Total Subjects</span>
                <span>{performanceData.length}</span>
              </div>
            </div>
          </Card>
        </div>

        {/* Detailed Grades */}
        <Card className="border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl">
          <div className="border-b border-white/10 p-4">
            <h3 className="font-semibold">Recent Grades</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-white/10">
                <tr>
                  <th className="p-4 text-left text-gray-400">Subject</th>
                  <th className="p-4 text-left text-gray-400">Score</th>
                  <th className="p-4 text-left text-gray-400">Max Score</th>
                  <th className="p-4 text-left text-gray-400">Percentage</th>
                  <th className="p-4 text-left text-gray-400">Date</th>
                </tr>
              </thead>
              <tbody>
                {grades.map((grade) => (
                  <tr key={grade.id} className="border-b border-white/5 hover:bg-white/5">
                    <td className="p-4">{grade.subject}</td>
                    <td className="p-4">{grade.score}</td>
                    <td className="p-4">{grade.maxScore}</td>
                    <td className="p-4">
                      <Badge 
                        variant="outline"
                        className={`${
                          (grade.score / grade.maxScore) >= 0.9
                            ? 'border-green-500/50 text-green-400'
                            : (grade.score / grade.maxScore) >= 0.7
                            ? 'border-blue-500/50 text-blue-400'
                            : 'border-yellow-500/50 text-yellow-400'
                        }`}
                      >
                        {((grade.score / grade.maxScore) * 100).toFixed(0)}%
                      </Badge>
                    </td>
                    <td className="p-4 text-sm text-gray-400">
                      {new Date(grade.date).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    );
  }

  if (activeTab === 'assignments') {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl">My Assignments</h2>
          <p className="text-sm text-gray-400">View and submit your assignments</p>
        </div>

        {/* Assignment Tabs */}
        <div className="grid gap-6">
          {['pending', 'submitted', 'graded'].map((status) => (
            <Card 
              key={status}
              className="border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl"
            >
              <div className="border-b border-white/10 p-4">
                <h3 className="font-semibold capitalize">{status} Assignments</h3>
              </div>
              <div className="grid gap-4 p-4 md:grid-cols-2">
                {assignments
                  .filter((a) => a.status === status)
                  .map((assignment) => (
                    <div 
                      key={assignment.id}
                      className="rounded-xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent p-4"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-semibold">{assignment.title}</h4>
                          <p className="mt-1 text-sm text-gray-400">{assignment.subject}</p>
                          <div className="mt-2 flex items-center gap-2 text-sm text-gray-400">
                            <Calendar className="h-4 w-4" />
                            Due: {new Date(assignment.dueDate).toLocaleDateString()}
                          </div>
                          {assignment.grade && (
                            <Badge className="mt-2 bg-green-500/20 text-green-400">
                              Grade: {assignment.grade}%
                            </Badge>
                          )}
                        </div>
                        <Badge 
                          variant="outline" 
                          className={
                            status === 'pending' 
                              ? 'border-yellow-500/50 text-yellow-400'
                              : status === 'submitted'
                              ? 'border-blue-500/50 text-blue-400'
                              : 'border-green-500/50 text-green-400'
                          }
                        >
                          {status}
                        </Badge>
                      </div>
                      {status === 'pending' && (
                        <Button 
                          size="sm" 
                          className="mt-4 w-full bg-gradient-to-r from-cyan-600 to-cyan-500"
                          onClick={() => handleSubmitAssignment(assignment)}
                        >
                          <Upload className="mr-2 h-4 w-4" />
                          Submit
                        </Button>
                      )}
                      {status === 'submitted' && (
                        <Button size="sm" variant="outline" className="mt-4 w-full">
                          View Submission
                        </Button>
                      )}
                      {status === 'graded' && (
                        <Button size="sm" variant="outline" className="mt-4 w-full">
                          View Feedback
                        </Button>
                      )}
                    </div>
                  ))}
              </div>
            </Card>
          ))}
        </div>

        <Dialog open={submitDialogOpen} onOpenChange={setSubmitDialogOpen}>
          <DialogContent className="border-white/10 bg-gray-900">
            <DialogHeader>
              <DialogTitle>Submit Assignment</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label>Assignment</Label>
                <p className="mt-1">{selectedAssignment?.title}</p>
                <p className="text-sm text-gray-400">{selectedAssignment?.subject}</p>
              </div>
              <div>
                <Label>Your Submission</Label>
                <Textarea 
                  placeholder="Paste your work or add comments here..." 
                  className="border-white/10 bg-white/5"
                  rows={6}
                />
              </div>
              <div>
                <Label>Attach Files</Label>
                <div className="mt-2 rounded-lg border-2 border-dashed border-white/20 p-8 text-center">
                  <FileText className="mx-auto h-8 w-8 text-gray-400" />
                  <p className="mt-2 text-sm text-gray-400">Click to upload or drag and drop</p>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setSubmitDialogOpen(false)}>Cancel</Button>
              <Button 
                onClick={() => {
                  toast.success('Assignment submitted successfully');
                  setSubmitDialogOpen(false);
                }}
                className="bg-gradient-to-r from-cyan-600 to-cyan-500"
              >
                <Upload className="mr-2 h-4 w-4" />
                Submit
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    );
  }

  if (activeTab === 'attendance') {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl">My Attendance</h2>
          <p className="text-sm text-gray-400">Track your attendance record</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card className="border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] p-6 backdrop-blur-xl">
            <h3 className="mb-4 font-semibold">Attendance Overview</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={attendanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                <XAxis dataKey="month" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1f2937', 
                    border: '1px solid #374151',
                    borderRadius: '8px'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="attendance" 
                  stroke="#10b981" 
                  strokeWidth={3}
                  dot={{ fill: '#10b981', r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          <Card className="border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] p-6 backdrop-blur-xl">
            <h3 className="mb-4 font-semibold">Attendance Stats</h3>
            <div className="space-y-4">
              <div className="rounded-lg bg-gradient-to-r from-green-500/20 to-emerald-500/20 p-4">
                <p className="text-sm text-gray-400">Overall Attendance</p>
                <div className="mt-2 flex items-end gap-2">
                  <span className="text-3xl">92%</span>
                  <Badge className="mb-1 bg-green-500/20 text-green-400">Good</Badge>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between rounded-lg bg-white/5 p-3">
                  <span className="text-sm text-gray-400">Total Days</span>
                  <span>180</span>
                </div>
                <div className="flex items-center justify-between rounded-lg bg-white/5 p-3">
                  <span className="text-sm text-gray-400">Present</span>
                  <span className="text-green-400">165</span>
                </div>
                <div className="flex items-center justify-between rounded-lg bg-white/5 p-3">
                  <span className="text-sm text-gray-400">Absent</span>
                  <span className="text-red-400">15</span>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Subject-wise Attendance */}
        <Card className="border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] p-6 backdrop-blur-xl">
          <h3 className="mb-4 font-semibold">Subject-wise Attendance</h3>
          <div className="space-y-4">
            {classes.map((cls) => {
              const attendance = Math.floor(Math.random() * 15 + 85);
              return (
                <div key={cls.id}>
                  <div className="mb-2 flex items-center justify-between">
                    <span>{cls.subject}</span>
                    <span className="text-sm text-gray-400">{attendance}%</span>
                  </div>
                  <Progress value={attendance} />
                </div>
              );
            })}
          </div>
        </Card>
      </div>
    );
  }

  if (activeTab === 'messages') {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl">Messages</h2>
          <p className="text-sm text-gray-400">Communicate with teachers</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <Card className="border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] p-4 backdrop-blur-xl">
            <h3 className="mb-4 font-semibold">Teachers</h3>
            <div className="space-y-2">
              {['Sarah Johnson', 'Michael Chen', 'Emily Davis'].map((teacher, idx) => (
                <button
                  key={idx}
                  className="flex w-full items-center gap-3 rounded-lg p-3 transition-colors hover:bg-white/5"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-500/30 to-purple-500/30">
                    {teacher.charAt(0)}
                  </div>
                  <div className="flex-1 text-left">
                    <p className="text-sm font-medium">{teacher}</p>
                    <p className="text-xs text-gray-400">Click to chat</p>
                  </div>
                </button>
              ))}
            </div>
          </Card>

          <Card className="border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] p-4 backdrop-blur-xl lg:col-span-2">
            <div className="flex h-full flex-col">
              <div className="border-b border-white/10 pb-4">
                <h3 className="font-semibold">Select a conversation</h3>
              </div>
              <div className="flex flex-1 items-center justify-center text-gray-400">
                Choose a teacher to start messaging
              </div>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return <div>Select a tab from the sidebar</div>;
}
