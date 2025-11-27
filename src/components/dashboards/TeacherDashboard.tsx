import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { BookOpen, Users, ClipboardList, Calendar, Plus } from 'lucide-react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar';
import { DataTable } from '../shared/DataTable';
import { StatsCard } from '../shared/StatsCard';
import { AnnouncementsPanel } from '../shared/AnnouncementsPanel';
import { mockAssignments, mockGrades } from '../../lib/mockData';
import { Student, Assignment } from '../../lib/types';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '../ui/dialog';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { toast } from 'sonner';
import { Progress } from '../ui/progress';
import {
  mockTeachers,
  mockStudents,
  mockClasses,
  mockAnnouncements,
  mockNotifications,
  gradeDistributionData,
  attendanceData
} from '../../lib/mockData';

interface TeacherDashboardProps {
  activeTab: string;
}

export function TeacherDashboard({ activeTab }: TeacherDashboardProps) {
  const [students] = useState(mockStudents.filter(s => s.class === 'Grade 10A'));
  const [classes] = useState(mockClasses.filter(c => c.teacher === 'Sarah Johnson'));
  const [assignments, setAssignments] = useState(mockAssignments);
  const [addAssignmentOpen, setAddAssignmentOpen] = useState(false);
  const [gradeDialogOpen, setGradeDialogOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [classDetailsOpen, setClassDetailsOpen] = useState(false);
  const [selectedClass, setSelectedClass] = useState<any>(null);
  const [attendanceDialogOpen, setAttendanceDialogOpen] = useState(false);
  const [gradebookDialogOpen, setGradebookDialogOpen] = useState(false);
  const [addGradeDialogOpen, setAddGradeDialogOpen] = useState(false);
  const [editAssignmentOpen, setEditAssignmentOpen] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState<Assignment | null>(null);

  const studentColumns = [
    {
      key: 'name',
      header: 'Name',
      render: (student: Student) => (
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src={student.avatar} />
            <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium">{student.name}</p>
            <p className="text-sm text-gray-400">{student.email}</p>
          </div>
        </div>
      ),
    },
    { key: 'class', header: 'Class' },
    {
      key: 'attendance',
      header: 'Attendance',
      render: (student: Student) => (
        <div className="flex items-center gap-2">
          <Progress value={student.attendance} className="w-20" />
          <span className="text-sm">{student.attendance}%</span>
        </div>
      ),
    },
    {
      key: 'gpa',
      header: 'GPA',
      render: (student: Student) => (
        <Badge 
          variant="outline" 
          className={`${
            (student.gpa || 0) >= 3.5 
              ? 'border-green-500/50 text-green-400' 
              : 'border-yellow-500/50 text-yellow-400'
          }`}
        >
          {student.gpa?.toFixed(2)}
        </Badge>
      ),
    },
  ];

  const assignmentColumns = [
    { key: 'title', header: 'Assignment' },
    { key: 'subject', header: 'Subject' },
    { key: 'class', header: 'Class' },
    { 
      key: 'dueDate', 
      header: 'Due Date',
      render: (assignment: Assignment) => (
        <span className="text-sm">
          {new Date(assignment.dueDate).toLocaleDateString()}
        </span>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      render: (assignment: Assignment) => {
        const statusColors = {
          pending: 'border-yellow-500/50 text-yellow-400',
          submitted: 'border-blue-500/50 text-blue-400',
          graded: 'border-green-500/50 text-green-400',
        };
        return (
          <Badge variant="outline" className={statusColors[assignment.status]}>
            {assignment.status}
          </Badge>
        );
      },
    },
  ];

  if (activeTab === 'overview') {
    return (
      <div className="space-y-6">
        {/* Stats Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <StatsCard
            title="My Classes"
            value={classes.length}
            icon={BookOpen}
            color="#3b82f6"
          />
          <StatsCard
            title="Total Students"
            value={students.length}
            icon={Users}
            color="#8b5cf6"
          />
          <StatsCard
            title="Assignments"
            value={assignments.length}
            icon={ClipboardList}
            color="#06b6d4"
          />
          <StatsCard
            title="Avg Attendance"
            value="92%"
            icon={Calendar}
            color="#10b981"
          />
        </div>

        {/* My Classes */}
        <Card className="border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] p-6 backdrop-blur-xl">
          <h3 className="mb-4 font-semibold">My Classes</h3>
          <div className="grid gap-4 md:grid-cols-2">
            {classes.map((cls) => (
              <div 
                key={cls.id}
                className="group rounded-xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent p-4 transition-all hover:border-blue-500/50 hover:from-blue-500/10"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-semibold">{cls.name}</h4>
                    <p className="mt-1 text-sm text-gray-400">{cls.subject}</p>
                  </div>
                  <Badge variant="outline" className="border-blue-500/50 text-blue-400">
                    {cls.students} Students
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Chart and Announcements */}
        <div className="grid gap-6 lg:grid-cols-2">
          <Card className="border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] p-6 backdrop-blur-xl">
            <h3 className="mb-4 font-semibold">Class Attendance Trend</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={attendanceData}>
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
                <Bar dataKey="attendance" fill="#3b82f6" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>

          <AnnouncementsPanel announcements={mockAnnouncements} currentRole="teacher" />
        </div>
      </div>
    );
  }

  if (activeTab === 'classes') {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl">My Classes</h2>
          <p className="text-sm text-gray-400">Manage your assigned classes</p>
        </div>

        <div className="grid gap-6">
          {classes.map((cls) => (
            <Card 
              key={cls.id}
              className="border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] p-6 backdrop-blur-xl"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-xl font-semibold">{cls.name}</h3>
                  <p className="mt-1 text-gray-400">{cls.subject}</p>
                  <Badge variant="outline" className="mt-3 border-blue-500/50 text-blue-400">
                    {cls.students} Students
                  </Badge>
                </div>
                <Button 
                  className="bg-gradient-to-r from-blue-600 to-blue-500"
                  onClick={() => {
                    setSelectedClass(cls);
                    setClassDetailsOpen(true);
                  }}
                >
                  View Details
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* Class Details Dialog */}
        <Dialog open={classDetailsOpen} onOpenChange={setClassDetailsOpen}>
          <DialogContent className="border-white/10 bg-gray-900 max-w-2xl">
            <DialogHeader>
              <DialogTitle>{selectedClass?.name} - Details</DialogTitle>
            </DialogHeader>
            {selectedClass && (
              <div className="space-y-6">
                {/* Class Info */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                    <p className="text-sm text-gray-400">Subject</p>
                    <p className="mt-1 font-semibold">{selectedClass.subject}</p>
                  </div>
                  <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                    <p className="text-sm text-gray-400">Total Students</p>
                    <p className="mt-1 font-semibold">{selectedClass.students}</p>
                  </div>
                  <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                    <p className="text-sm text-gray-400">Schedule</p>
                    <p className="mt-1 font-semibold">{selectedClass.schedule || 'Mon, Wed, Fri - 9:00 AM'}</p>
                  </div>
                  <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                    <p className="text-sm text-gray-400">Room</p>
                    <p className="mt-1 font-semibold">{selectedClass.room || 'Room 204'}</p>
                  </div>
                </div>

                {/* Quick Stats */}
                <div>
                  <h4 className="mb-3 font-semibold">Quick Stats</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between rounded-lg border border-white/10 bg-white/5 p-3">
                      <span className="text-sm text-gray-400">Average Attendance</span>
                      <div className="flex items-center gap-2">
                        <Progress value={92} className="w-24" />
                        <span className="text-sm font-semibold">92%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between rounded-lg border border-white/10 bg-white/5 p-3">
                      <span className="text-sm text-gray-400">Average Grade</span>
                      <span className="font-semibold text-green-400">B+</span>
                    </div>
                    <div className="flex items-center justify-between rounded-lg border border-white/10 bg-white/5 p-3">
                      <span className="text-sm text-gray-400">Assignments Pending</span>
                      <span className="font-semibold text-yellow-400">5</span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <Button 
                    className="flex-1 bg-gradient-to-r from-blue-600 to-blue-500"
                    onClick={() => {
                      setClassDetailsOpen(false);
                      setAttendanceDialogOpen(true);
                    }}
                  >
                    Take Attendance
                  </Button>
                  <Button 
                    variant="outline"
                    className="flex-1"
                    onClick={() => {
                      setClassDetailsOpen(false);
                      setGradebookDialogOpen(true);
                    }}
                  >
                    View Gradebook
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Take Attendance Dialog */}
        <Dialog open={attendanceDialogOpen} onOpenChange={setAttendanceDialogOpen}>
          <DialogContent className="border-white/10 bg-gray-900 max-w-3xl">
            <DialogHeader>
              <DialogTitle>Take Attendance - {selectedClass?.name}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="flex items-center justify-between rounded-lg border border-white/10 bg-white/5 p-3">
                <div>
                  <p className="font-semibold">{selectedClass?.subject}</p>
                  <p className="text-sm text-gray-400">{new Date().toLocaleDateString()}</p>
                </div>
                <Badge className="bg-blue-500/20 text-blue-400">
                  {selectedClass?.students} Students
                </Badge>
              </div>

              <div className="max-h-96 space-y-2 overflow-y-auto">
                {students.map((student) => (
                  <div 
                    key={student.id}
                    className="flex items-center justify-between rounded-lg border border-white/10 bg-white/5 p-3 hover:bg-white/10"
                  >
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={student.avatar} />
                        <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{student.name}</p>
                        <p className="text-sm text-gray-400">{student.email}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        className="bg-green-600 hover:bg-green-700"
                        onClick={() => toast.success(`${student.name} marked present`)}
                      >
                        Present
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        className="border-red-500/50 text-red-400 hover:bg-red-500/20"
                        onClick={() => toast.error(`${student.name} marked absent`)}
                      >
                        Absent
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setAttendanceDialogOpen(false)}>
                Cancel
              </Button>
              <Button 
                className="bg-gradient-to-r from-blue-600 to-blue-500"
                onClick={() => {
                  toast.success('Attendance saved successfully');
                  setAttendanceDialogOpen(false);
                }}
              >
                Save Attendance
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* View Gradebook Dialog */}
        <Dialog open={gradebookDialogOpen} onOpenChange={setGradebookDialogOpen}>
          <DialogContent className="border-white/10 bg-gray-900 max-w-4xl">
            <DialogHeader>
              <DialogTitle>Gradebook - {selectedClass?.name}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Badge className="bg-blue-500/20 text-blue-400">
                    {selectedClass?.subject}
                  </Badge>
                  <span className="text-sm text-gray-400">
                    {selectedClass?.students} Students
                  </span>
                </div>
                <Button 
                  size="sm"
                  className="bg-gradient-to-r from-green-600 to-green-500"
                  onClick={() => {
                    setGradebookDialogOpen(false);
                    setAddGradeDialogOpen(true);
                  }}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add Grade
                </Button>
              </div>

              <div className="overflow-x-auto rounded-lg border border-white/10">
                <table className="w-full">
                  <thead className="border-b border-white/10 bg-white/5">
                    <tr>
                      <th className="p-3 text-left text-sm text-gray-400">Student</th>
                      <th className="p-3 text-left text-sm text-gray-400">Assignment</th>
                      <th className="p-3 text-left text-sm text-gray-400">Score</th>
                      <th className="p-3 text-left text-sm text-gray-400">Grade</th>
                      <th className="p-3 text-left text-sm text-gray-400">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockGrades.slice(0, 8).map((grade) => (
                      <tr key={grade.id} className="border-b border-white/5 hover:bg-white/5">
                        <td className="p-3">
                          <div className="flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                              <AvatarFallback>{grade.studentName.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <span className="text-sm">{grade.studentName}</span>
                          </div>
                        </td>
                        <td className="p-3 text-sm">{grade.subject}</td>
                        <td className="p-3 text-sm">{grade.score}/{grade.maxScore}</td>
                        <td className="p-3">
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
                        <td className="p-3 text-sm text-gray-400">
                          {new Date(grade.date).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setGradebookDialogOpen(false)}>
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Add Grade Dialog */}
        <Dialog open={addGradeDialogOpen} onOpenChange={setAddGradeDialogOpen}>
          <DialogContent className="border-white/10 bg-gray-900">
            <DialogHeader>
              <DialogTitle>Add New Grade</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label>Student</Label>
                <select className="w-full rounded-lg border border-white/10 bg-white/5 p-2 text-white">
                  <option value="">Select a student</option>
                  {students.map((student) => (
                    <option key={student.id} value={student.id}>
                      {student.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <Label>Subject</Label>
                <Input placeholder="Enter subject" className="border-white/10 bg-white/5" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Score</Label>
                  <Input 
                    type="number" 
                    placeholder="85" 
                    className="border-white/10 bg-white/5" 
                  />
                </div>
                <div>
                  <Label>Max Score</Label>
                  <Input 
                    type="number" 
                    placeholder="100" 
                    className="border-white/10 bg-white/5" 
                  />
                </div>
              </div>
              <div>
                <Label>Date</Label>
                <Input 
                  type="date" 
                  className="border-white/10 bg-white/5" 
                  defaultValue={new Date().toISOString().split('T')[0]}
                />
              </div>
              <div>
                <Label>Comments (Optional)</Label>
                <Textarea 
                  placeholder="Add any comments about this grade..." 
                  className="border-white/10 bg-white/5"
                  rows={3}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setAddGradeDialogOpen(false)}>
                Cancel
              </Button>
              <Button 
                className="bg-gradient-to-r from-green-600 to-green-500"
                onClick={() => {
                  toast.success('Grade added successfully');
                  setAddGradeDialogOpen(false);
                }}
              >
                Add Grade
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    );
  }

  if (activeTab === 'students') {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl">My Students</h2>
            <p className="text-sm text-gray-400">Manage students in your classes</p>
          </div>
        </div>

        <DataTable
          data={students}
          columns={studentColumns}
          onView={(student) => {
            setSelectedStudent(student);
            setGradeDialogOpen(true);
          }}
          searchPlaceholder="Search students..."
        />

        {/* Student Details Dialog */}
        <Dialog open={gradeDialogOpen} onOpenChange={setGradeDialogOpen}>
          <DialogContent className="border-white/10 bg-gray-900">
            <DialogHeader>
              <DialogTitle>Student Details: {selectedStudent?.name}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={selectedStudent?.avatar} />
                  <AvatarFallback>{selectedStudent?.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold">{selectedStudent?.name}</p>
                  <p className="text-sm text-gray-400">{selectedStudent?.email}</p>
                  <Badge className="mt-1" variant="outline">
                    {selectedStudent?.class}
                  </Badge>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Attendance</Label>
                  <p className="mt-1 text-2xl">{selectedStudent?.attendance}%</p>
                </div>
                <div>
                  <Label>GPA</Label>
                  <p className="mt-1 text-2xl">{selectedStudent?.gpa?.toFixed(2)}</p>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setGradeDialogOpen(false)}>Close</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    );
  }

  if (activeTab === 'grades') {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl">Student Grades</h2>
            <p className="text-sm text-gray-400">View and update student grades</p>
          </div>
          <Button 
            className="bg-gradient-to-r from-green-600 to-green-500"
            onClick={() => setAddGradeDialogOpen(true)}
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Grade
          </Button>
        </div>

        <Card className="border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-white/10">
                <tr>
                  <th className="p-4 text-left text-gray-400">Student</th>
                  <th className="p-4 text-left text-gray-400">Subject</th>
                  <th className="p-4 text-left text-gray-400">Score</th>
                  <th className="p-4 text-left text-gray-400">Date</th>
                  <th className="p-4 text-left text-gray-400">Grade</th>
                </tr>
              </thead>
              <tbody>
                {mockGrades.map((grade) => (
                  <tr key={grade.id} className="border-b border-white/5 hover:bg-white/5">
                    <td className="p-4">{grade.studentName}</td>
                    <td className="p-4">{grade.subject}</td>
                    <td className="p-4">{grade.score}/{grade.maxScore}</td>
                    <td className="p-4 text-sm text-gray-400">
                      {new Date(grade.date).toLocaleDateString()}
                    </td>
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
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Add Grade Dialog */}
        <Dialog open={addGradeDialogOpen} onOpenChange={setAddGradeDialogOpen}>
          <DialogContent className="border-white/10 bg-gray-900">
            <DialogHeader>
              <DialogTitle>Add New Grade</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label>Student</Label>
                <select className="w-full rounded-lg border border-white/10 bg-white/5 p-2 text-white">
                  <option value="">Select a student</option>
                  {students.map((student) => (
                    <option key={student.id} value={student.id}>
                      {student.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <Label>Subject</Label>
                <Input placeholder="Enter subject" className="border-white/10 bg-white/5" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Score</Label>
                  <Input 
                    type="number" 
                    placeholder="85" 
                    className="border-white/10 bg-white/5" 
                  />
                </div>
                <div>
                  <Label>Max Score</Label>
                  <Input 
                    type="number" 
                    placeholder="100" 
                    className="border-white/10 bg-white/5" 
                  />
                </div>
              </div>
              <div>
                <Label>Date</Label>
                <Input 
                  type="date" 
                  className="border-white/10 bg-white/5" 
                  defaultValue={new Date().toISOString().split('T')[0]}
                />
              </div>
              <div>
                <Label>Comments (Optional)</Label>
                <Textarea 
                  placeholder="Add any comments about this grade..." 
                  className="border-white/10 bg-white/5"
                  rows={3}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setAddGradeDialogOpen(false)}>
                Cancel
              </Button>
              <Button 
                className="bg-gradient-to-r from-green-600 to-green-500"
                onClick={() => {
                  toast.success('Grade added successfully');
                  setAddGradeDialogOpen(false);
                }}
              >
                Add Grade
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
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl">Attendance Management</h2>
            <p className="text-sm text-gray-400">Mark and track student attendance</p>
          </div>
          <Button 
            className="bg-gradient-to-r from-blue-600 to-blue-500"
            onClick={() => {
              setSelectedClass(classes[0]);
              setAttendanceDialogOpen(true);
            }}
          >
            Mark Attendance
          </Button>
        </div>

        <Card className="border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] p-6 backdrop-blur-xl">
          <h3 className="mb-4 font-semibold">Attendance Overview</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={attendanceData}>
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
              <Bar dataKey="attendance" fill="#10b981" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <div className="grid gap-4">
          {students.map((student) => (
            <Card 
              key={student.id}
              className="border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] p-4 backdrop-blur-xl"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={student.avatar} />
                    <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{student.name}</p>
                    <p className="text-sm text-gray-400">{student.class}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Progress value={student.attendance} className="w-32" />
                    <span className="text-sm">{student.attendance}%</span>
                  </div>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => {
                      setSelectedStudent(student);
                      setGradeDialogOpen(true);
                    }}
                  >
                    View Details
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (activeTab === 'assignments') {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl">Assignments</h2>
            <p className="text-sm text-gray-400">Create and manage assignments</p>
          </div>
          <Button 
            onClick={() => setAddAssignmentOpen(true)}
            className="bg-gradient-to-r from-cyan-600 to-cyan-500"
          >
            <Plus className="mr-2 h-4 w-4" />
            New Assignment
          </Button>
        </div>

        <DataTable
          data={assignments}
          columns={assignmentColumns}
          onView={(assignment) => toast.info('View submissions')}
          onEdit={(assignment) => {
            setSelectedAssignment(assignment);
            setEditAssignmentOpen(true);
          }}
          onDelete={(assignment) => toast.info('Delete assignment')}
          searchPlaceholder="Search assignments..."
        />

        <Dialog open={addAssignmentOpen} onOpenChange={setAddAssignmentOpen}>
          <DialogContent className="border-white/10 bg-gray-900">
            <DialogHeader>
              <DialogTitle>Create New Assignment</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label>Title</Label>
                <Input placeholder="Enter assignment title" className="border-white/10 bg-white/5" />
              </div>
              <div>
                <Label>Subject</Label>
                <Input placeholder="Enter subject" className="border-white/10 bg-white/5" />
              </div>
              <div>
                <Label>Class</Label>
                <Input placeholder="Select class" className="border-white/10 bg-white/5" />
              </div>
              <div>
                <Label>Due Date</Label>
                <Input type="date" className="border-white/10 bg-white/5" />
              </div>
              <div>
                <Label>Description</Label>
                <Textarea 
                  placeholder="Enter assignment description" 
                  className="border-white/10 bg-white/5"
                  rows={4}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setAddAssignmentOpen(false)}>Cancel</Button>
              <Button 
                onClick={() => {
                  toast.success('Assignment created successfully');
                  setAddAssignmentOpen(false);
                }}
                className="bg-gradient-to-r from-cyan-600 to-cyan-500"
              >
                Create Assignment
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Edit Assignment Dialog */}
        <Dialog open={editAssignmentOpen} onOpenChange={setEditAssignmentOpen}>
          <DialogContent className="border-white/10 bg-gray-900">
            <DialogHeader>
              <DialogTitle>Edit Assignment</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label>Title</Label>
                <Input 
                  defaultValue={selectedAssignment?.title}
                  placeholder="Enter assignment title" 
                  className="border-white/10 bg-white/5" 
                />
              </div>
              <div>
                <Label>Subject</Label>
                <Input 
                  defaultValue={selectedAssignment?.subject}
                  placeholder="Enter subject" 
                  className="border-white/10 bg-white/5" 
                />
              </div>
              <div>
                <Label>Class</Label>
                <Input 
                  defaultValue={selectedAssignment?.class}
                  placeholder="Select class" 
                  className="border-white/10 bg-white/5" 
                />
              </div>
              <div>
                <Label>Due Date</Label>
                <Input 
                  type="date" 
                  defaultValue={selectedAssignment?.dueDate ? new Date(selectedAssignment.dueDate).toISOString().split('T')[0] : ''}
                  className="border-white/10 bg-white/5" 
                />
              </div>
              <div>
                <Label>Description</Label>
                <Textarea 
                  defaultValue={selectedAssignment?.description || ''}
                  placeholder="Enter assignment description" 
                  className="border-white/10 bg-white/5"
                  rows={4}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setEditAssignmentOpen(false)}>Cancel</Button>
              <Button 
                onClick={() => {
                  toast.success('Assignment updated successfully');
                  setEditAssignmentOpen(false);
                }}
                className="bg-gradient-to-r from-cyan-600 to-cyan-500"
              >
                Save Changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    );
  }

  if (activeTab === 'messages') {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl">Messages</h2>
          <p className="text-sm text-gray-400">Communicate with students and principal</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <Card className="border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] p-4 backdrop-blur-xl">
            <h3 className="mb-4 font-semibold">Conversations</h3>
            <div className="space-y-2">
              {students.slice(0, 5).map((student) => (
                <button
                  key={student.id}
                  className="flex w-full items-center gap-3 rounded-lg p-3 transition-colors hover:bg-white/5"
                >
                  <Avatar>
                    <AvatarImage src={student.avatar} />
                    <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 text-left">
                    <p className="text-sm font-medium">{student.name}</p>
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
                Choose a student to start messaging
              </div>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return <div>Select a tab from the sidebar</div>;
}