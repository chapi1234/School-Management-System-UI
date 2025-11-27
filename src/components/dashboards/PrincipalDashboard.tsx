import { useState } from 'react';
import { Plus, Users, GraduationCap, BookOpen, TrendingUp } from 'lucide-react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { DataTable } from '../shared/DataTable';
import { StatsCard } from '../shared/StatsCard';
import { AnnouncementsPanel } from '../shared/AnnouncementsPanel';
import { NotificationsPanel } from '../shared/NotificationsPanel';
import { 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  PieChart, 
  Pie, 
  Cell, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import {
  mockTeachers,
  mockStudents,
  mockClasses,
  mockAnnouncements,
  mockNotifications,
  gradeDistributionData,
  attendanceData
} from '../../lib/mockData';
import { Teacher, Student, Class } from '../../lib/types';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '../ui/dialog';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { toast } from 'sonner';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '../ui/alert-dialog';

interface PrincipalDashboardProps {
  activeTab: string;
}

export function PrincipalDashboard({ activeTab }: PrincipalDashboardProps) {
  const [teachers, setTeachers] = useState(mockTeachers);
  const [students, setStudents] = useState(mockStudents);
  const [classes, setClasses] = useState(mockClasses);
  const [addTeacherOpen, setAddTeacherOpen] = useState(false);
  const [addStudentOpen, setAddStudentOpen] = useState(false);
  const [addClassOpen, setAddClassOpen] = useState(false);
  const [addAnnouncementOpen, setAddAnnouncementOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<{ type: 'teacher' | 'student' | 'class'; item: Teacher | Student | Class } | null>(null);
  const [editTeacherOpen, setEditTeacherOpen] = useState(false);
  const [editStudentOpen, setEditStudentOpen] = useState(false);
  const [editClassOpen, setEditClassOpen] = useState(false);
  const [editingTeacher, setEditingTeacher] = useState<Teacher | null>(null);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [editingClass, setEditingClass] = useState<Class | null>(null);
  
  // Settings state
  const [schoolName, setSchoolName] = useState('Central High School');
  const [academicYear, setAcademicYear] = useState('2025-2026');
  const [contactEmail, setContactEmail] = useState('admin@centralhigh.edu');

  const handleDeleteTeacher = (teacher: Teacher) => {
    setItemToDelete({ type: 'teacher', item: teacher });
    setDeleteDialogOpen(true);
  };

  const handleDeleteStudent = (student: Student) => {
    setItemToDelete({ type: 'student', item: student });
    setDeleteDialogOpen(true);
  };

  const handleDeleteClass = (cls: Class) => {
    setItemToDelete({ type: 'class', item: cls });
    setDeleteDialogOpen(true);
  };

  const handleEditTeacher = (teacher: Teacher) => {
    setEditingTeacher(teacher);
    setEditTeacherOpen(true);
  };

  const handleEditStudent = (student: Student) => {
    setEditingStudent(student);
    setEditStudentOpen(true);
  };

  const handleEditClass = (cls: Class) => {
    setEditingClass(cls);
    setEditClassOpen(true);
  };

  const confirmDelete = () => {
    if (itemToDelete) {
      if (itemToDelete.type === 'teacher') {
        setTeachers(teachers.filter(t => t.id !== itemToDelete.item.id));
        toast.success('Teacher deleted successfully');
      } else if (itemToDelete.type === 'student') {
        setStudents(students.filter(s => s.id !== itemToDelete.item.id));
        toast.success('Student deleted successfully');
      } else if (itemToDelete.type === 'class') {
        setClasses(classes.filter(c => c.id !== itemToDelete.item.id));
        toast.success('Class deleted successfully');
      }
    }
    setDeleteDialogOpen(false);
    setItemToDelete(null);
  };

  const teacherColumns = [
    {
      key: 'name',
      header: 'Name',
      render: (teacher: Teacher) => (
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src={teacher.avatar} />
            <AvatarFallback>{teacher.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium">{teacher.name}</p>
            <p className="text-sm text-gray-400">{teacher.email}</p>
          </div>
        </div>
      ),
    },
    { key: 'subject', header: 'Subject' },
    {
      key: 'classes',
      header: 'Classes',
      render: (teacher: Teacher) => (
        <div className="flex flex-wrap gap-1">
          {teacher.classes.map((cls, idx) => (
            <Badge key={idx} variant="outline" className="border-blue-500/50 text-blue-400">
              {cls}
            </Badge>
          ))}
        </div>
      ),
    },
  ];

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
    { key: 'grade', header: 'Grade' },
    { key: 'class', header: 'Class' },
    {
      key: 'attendance',
      header: 'Attendance',
      render: (student: Student) => (
        <div className="flex items-center gap-2">
          <div className="h-2 w-20 overflow-hidden rounded-full bg-white/10">
            <div 
              className="h-full rounded-full bg-gradient-to-r from-green-500 to-emerald-400"
              style={{ width: `${student.attendance}%` }}
            />
          </div>
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

  const classColumns = [
    { key: 'name', header: 'Class Name' },
    { key: 'subject', header: 'Subject' },
    { key: 'teacher', header: 'Teacher' },
    {
      key: 'students',
      header: 'Students',
      render: (cls: Class) => (
        <Badge variant="outline" className="border-purple-500/50 text-purple-400">
          {cls.students} Students
        </Badge>
      ),
    },
  ];

  if (activeTab === 'overview') {
    return (
      <div className="space-y-6">
        {/* Stats Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <StatsCard
            title="Total Teachers"
            value={teachers.length}
            icon={Users}
            trend={{ value: 12, isPositive: true }}
            color="#3b82f6"
          />
          <StatsCard
            title="Total Students"
            value={students.length}
            icon={GraduationCap}
            trend={{ value: 8, isPositive: true }}
            color="#8b5cf6"
          />
          <StatsCard
            title="Total Classes"
            value={classes.length}
            icon={BookOpen}
            trend={{ value: 5, isPositive: true }}
            color="#06b6d4"
          />
          <StatsCard
            title="Avg Attendance"
            value="92%"
            icon={TrendingUp}
            trend={{ value: 3, isPositive: true }}
            color="#10b981"
          />
        </div>

        {/* Charts */}
        <div className="grid gap-6 lg:grid-cols-2">
          <Card className="border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] p-6 backdrop-blur-xl">
            <h3 className="mb-4 font-semibold">Grade Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={gradeDistributionData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                <XAxis dataKey="grade" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1f2937', 
                    border: '1px solid #374151',
                    borderRadius: '8px'
                  }}
                />
                <Bar dataKey="students" fill="#8b5cf6" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>

          <Card className="border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] p-6 backdrop-blur-xl">
            <h3 className="mb-4 font-semibold">Attendance Trend</h3>
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
                  stroke="#06b6d4" 
                  strokeWidth={2}
                  dot={{ fill: '#06b6d4', r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </div>

        {/* Announcements and Notifications */}
        <div className="grid gap-6 lg:grid-cols-2">
          <AnnouncementsPanel announcements={mockAnnouncements} currentRole="principal" />
          <NotificationsPanel notifications={mockNotifications} />
        </div>
      </div>
    );
  }

  if (activeTab === 'teachers') {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl">Manage Teachers</h2>
            <p className="text-sm text-gray-400">Add, edit, or remove teachers</p>
          </div>
          <Button 
            onClick={() => setAddTeacherOpen(true)}
            className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Teacher
          </Button>
        </div>

        <DataTable
          data={teachers}
          columns={teacherColumns}
          onEdit={handleEditTeacher}
          onDelete={handleDeleteTeacher}
          searchPlaceholder="Search teachers..."
        />

        <Dialog open={addTeacherOpen} onOpenChange={setAddTeacherOpen}>
          <DialogContent className="border-white/10 bg-gray-900">
            <DialogHeader>
              <DialogTitle>Add New Teacher</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label>Name</Label>
                <Input placeholder="Enter teacher name" className="border-white/10 bg-white/5" />
              </div>
              <div>
                <Label>Email</Label>
                <Input type="email" placeholder="Enter email" className="border-white/10 bg-white/5" />
              </div>
              <div>
                <Label>Subject</Label>
                <Input placeholder="Enter subject" className="border-white/10 bg-white/5" />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setAddTeacherOpen(false)}>Cancel</Button>
              <Button 
                onClick={() => {
                  toast.success('Teacher added successfully');
                  setAddTeacherOpen(false);
                }}
                className="bg-gradient-to-r from-blue-600 to-blue-500"
              >
                Add Teacher
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Edit Teacher Dialog */}
        <Dialog open={editTeacherOpen} onOpenChange={setEditTeacherOpen}>
          <DialogContent className="border-white/10 bg-gray-900">
            <DialogHeader>
              <DialogTitle>Edit Teacher</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label>Name</Label>
                <Input 
                  defaultValue={editingTeacher?.name}
                  placeholder="Enter teacher name" 
                  className="border-white/10 bg-white/5" 
                />
              </div>
              <div>
                <Label>Email</Label>
                <Input 
                  type="email" 
                  defaultValue={editingTeacher?.email}
                  placeholder="Enter email" 
                  className="border-white/10 bg-white/5" 
                />
              </div>
              <div>
                <Label>Subject</Label>
                <Input 
                  defaultValue={editingTeacher?.subject}
                  placeholder="Enter subject" 
                  className="border-white/10 bg-white/5" 
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setEditTeacherOpen(false)}>Cancel</Button>
              <Button 
                onClick={() => {
                  toast.success('Teacher updated successfully');
                  setEditTeacherOpen(false);
                  setEditingTeacher(null);
                }}
                className="bg-gradient-to-r from-blue-600 to-blue-500"
              >
                Update Teacher
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
            <h2 className="text-2xl">Manage Students</h2>
            <p className="text-sm text-gray-400">Add, edit, or remove students</p>
          </div>
          <Button 
            onClick={() => setAddStudentOpen(true)}
            className="bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-700 hover:to-purple-600"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Student
          </Button>
        </div>

        <DataTable
          data={students}
          columns={studentColumns}
          onEdit={handleEditStudent}
          onDelete={handleDeleteStudent}
          searchPlaceholder="Search students..."
        />

        <Dialog open={addStudentOpen} onOpenChange={setAddStudentOpen}>
          <DialogContent className="border-white/10 bg-gray-900">
            <DialogHeader>
              <DialogTitle>Add New Student</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label>Name</Label>
                <Input placeholder="Enter student name" className="border-white/10 bg-white/5" />
              </div>
              <div>
                <Label>Email</Label>
                <Input type="email" placeholder="Enter email" className="border-white/10 bg-white/5" />
              </div>
              <div>
                <Label>Grade</Label>
                <Input placeholder="Enter grade" className="border-white/10 bg-white/5" />
              </div>
              <div>
                <Label>Class</Label>
                <Input placeholder="Enter class" className="border-white/10 bg-white/5" />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setAddStudentOpen(false)}>Cancel</Button>
              <Button 
                onClick={() => {
                  toast.success('Student added successfully');
                  setAddStudentOpen(false);
                }}
                className="bg-gradient-to-r from-purple-600 to-purple-500"
              >
                Add Student
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Edit Student Dialog */}
        <Dialog open={editStudentOpen} onOpenChange={setEditStudentOpen}>
          <DialogContent className="border-white/10 bg-gray-900">
            <DialogHeader>
              <DialogTitle>Edit Student</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label>Name</Label>
                <Input 
                  defaultValue={editingStudent?.name}
                  placeholder="Enter student name" 
                  className="border-white/10 bg-white/5" 
                />
              </div>
              <div>
                <Label>Email</Label>
                <Input 
                  type="email" 
                  defaultValue={editingStudent?.email}
                  placeholder="Enter email" 
                  className="border-white/10 bg-white/5" 
                />
              </div>
              <div>
                <Label>Grade</Label>
                <Input 
                  defaultValue={editingStudent?.grade}
                  placeholder="Enter grade" 
                  className="border-white/10 bg-white/5" 
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setEditStudentOpen(false)}>Cancel</Button>
              <Button 
                onClick={() => {
                  toast.success('Student updated successfully');
                  setEditStudentOpen(false);
                  setEditingStudent(null);
                }}
                className="bg-gradient-to-r from-purple-600 to-purple-500"
              >
                Update Student
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    );
  }

  if (activeTab === 'classes') {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl">Manage Classes</h2>
            <p className="text-sm text-gray-400">View and manage all classes</p>
          </div>
          <Button 
            onClick={() => setAddClassOpen(true)}
            className="bg-gradient-to-r from-cyan-600 to-cyan-500 hover:from-cyan-700 hover:to-cyan-600"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Class
          </Button>
        </div>

        <DataTable
          data={classes}
          columns={classColumns}
          onEdit={handleEditClass}
          onDelete={handleDeleteClass}
          searchPlaceholder="Search classes..."
        />

        <Dialog open={addClassOpen} onOpenChange={setAddClassOpen}>
          <DialogContent className="border-white/10 bg-gray-900">
            <DialogHeader>
              <DialogTitle>Add New Class</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label>Class Name</Label>
                <Input placeholder="Enter class name" className="border-white/10 bg-white/5" />
              </div>
              <div>
                <Label>Subject</Label>
                <Input placeholder="Enter subject" className="border-white/10 bg-white/5" />
              </div>
              <div>
                <Label>Teacher</Label>
                <Input placeholder="Enter teacher name" className="border-white/10 bg-white/5" />
              </div>
              <div>
                <Label>Number of Students</Label>
                <Input placeholder="Enter number of students" className="border-white/10 bg-white/5" />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setAddClassOpen(false)}>Cancel</Button>
              <Button 
                onClick={() => {
                  toast.success('Class added successfully');
                  setAddClassOpen(false);
                }}
                className="bg-gradient-to-r from-cyan-600 to-cyan-500"
              >
                Add Class
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Edit Class Dialog */}
        <Dialog open={editClassOpen} onOpenChange={setEditClassOpen}>
          <DialogContent className="border-white/10 bg-gray-900">
            <DialogHeader>
              <DialogTitle>Edit Class</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label>Class Name</Label>
                <Input 
                  defaultValue={editingClass?.name}
                  placeholder="Enter class name" 
                  className="border-white/10 bg-white/5" 
                />
              </div>
              <div>
                <Label>Subject</Label>
                <Input 
                  defaultValue={editingClass?.subject}
                  placeholder="Enter subject" 
                  className="border-white/10 bg-white/5" 
                />
              </div>
              <div>
                <Label>Teacher</Label>
                <Input 
                  defaultValue={editingClass?.teacher}
                  placeholder="Enter teacher name" 
                  className="border-white/10 bg-white/5" 
                />
              </div>
              <div>
                <Label>Number of Students</Label>
                <Input 
                  defaultValue={editingClass?.students}
                  placeholder="Enter number of students" 
                  className="border-white/10 bg-white/5" 
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setEditClassOpen(false)}>Cancel</Button>
              <Button 
                onClick={() => {
                  toast.success('Class updated successfully');
                  setEditClassOpen(false);
                  setEditingClass(null);
                }}
                className="bg-gradient-to-r from-cyan-600 to-cyan-500"
              >
                Update Class
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    );
  }

  if (activeTab === 'announcements') {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl">Announcements</h2>
            <p className="text-sm text-gray-400">Create and manage announcements</p>
          </div>
          <Button 
            onClick={() => setAddAnnouncementOpen(true)}
            className="bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-700 hover:to-purple-600"
          >
            <Plus className="mr-2 h-4 w-4" />
            New Announcement
          </Button>
        </div>

        <AnnouncementsPanel announcements={mockAnnouncements} currentRole="principal" />

        <Dialog open={addAnnouncementOpen} onOpenChange={setAddAnnouncementOpen}>
          <DialogContent className="border-white/10 bg-gray-900">
            <DialogHeader>
              <DialogTitle>Add New Announcement</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label>Title</Label>
                <Input placeholder="Enter announcement title" className="border-white/10 bg-white/5" />
              </div>
              <div>
                <Label>Content</Label>
                <Textarea placeholder="Enter announcement content" className="border-white/10 bg-white/5" />
              </div>
              <div>
                <Label>Date</Label>
                <Input type="date" placeholder="Enter date" className="border-white/10 bg-white/5" />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setAddAnnouncementOpen(false)}>Cancel</Button>
              <Button 
                onClick={() => {
                  toast.success('Announcement added successfully');
                  setAddAnnouncementOpen(false);
                }}
                className="bg-gradient-to-r from-purple-600 to-purple-500"
              >
                Add Announcement
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    );
  }

  if (activeTab === 'analytics') {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl">Analytics & Reports</h2>
        
        <div className="grid gap-6 lg:grid-cols-2">
          <Card className="border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] p-6 backdrop-blur-xl">
            <h3 className="mb-4 font-semibold">Grade Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={gradeDistributionData}
                  dataKey="students"
                  nameKey="grade"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label
                >
                  {gradeDistributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={['#8b5cf6', '#3b82f6', '#06b6d4', '#f59e0b', '#ef4444'][index]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1f2937', 
                    border: '1px solid #374151',
                    borderRadius: '8px'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </Card>

          <Card className="border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] p-6 backdrop-blur-xl">
            <h3 className="mb-4 font-semibold">Monthly Attendance</h3>
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
        </div>
      </div>
    );
  }

  if (activeTab === 'settings') {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl">System Settings</h2>
        
        <Card className="border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] p-6 backdrop-blur-xl">
          <h3 className="mb-4 font-semibold">General Settings</h3>
          <div className="space-y-4">
            <div>
              <Label>School Name</Label>
              <Input 
                value={schoolName}
                onChange={(e) => setSchoolName(e.target.value)}
                className="border-white/10 bg-white/5" 
              />
            </div>
            <div>
              <Label>Academic Year</Label>
              <Input 
                value={academicYear}
                onChange={(e) => setAcademicYear(e.target.value)}
                className="border-white/10 bg-white/5" 
              />
            </div>
            <div>
              <Label>Contact Email</Label>
              <Input 
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
                className="border-white/10 bg-white/5" 
              />
            </div>
            <Button 
              onClick={() => {
                toast.success('Settings saved successfully!');
              }}
              className="bg-gradient-to-r from-purple-600 to-purple-500"
            >
              Save Changes
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <>
      <div>Select a tab from the sidebar</div>
      
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent className="border-white/10 bg-gray-900">
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the {itemToDelete?.type}.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-red-600 hover:bg-red-700">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}