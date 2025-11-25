import { Role } from '../lib/types';
import { 
  LayoutDashboard, 
  Users, 
  BookOpen, 
  MessageSquare, 
  Bell, 
  Settings,
  GraduationCap,
  ClipboardList,
  BarChart3,
  FileText,
  Calendar,
  UserCog
} from 'lucide-react';
import { cn } from '../components/ui/utils';

interface SidebarProps {
  role: Role;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const principalMenuItems = [
  { id: 'overview', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'teachers', label: 'Manage Teachers', icon: UserCog },
  { id: 'students', label: 'Manage Students', icon: Users },
  { id: 'classes', label: 'Classes', icon: BookOpen },
  { id: 'announcements', label: 'Announcements', icon: MessageSquare },
  { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  { id: 'settings', label: 'Settings', icon: Settings },
];

const teacherMenuItems = [
  { id: 'overview', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'classes', label: 'My Classes', icon: BookOpen },
  { id: 'students', label: 'Students', icon: Users },
  { id: 'grades', label: 'Grades', icon: FileText },
  { id: 'attendance', label: 'Attendance', icon: Calendar },
  { id: 'assignments', label: 'Assignments', icon: ClipboardList },
  { id: 'messages', label: 'Messages', icon: MessageSquare },
];

const studentMenuItems = [
  { id: 'overview', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'classes', label: 'My Classes', icon: BookOpen },
  { id: 'grades', label: 'Grades', icon: FileText },
  { id: 'assignments', label: 'Assignments', icon: ClipboardList },
  { id: 'attendance', label: 'Attendance', icon: Calendar },
  { id: 'messages', label: 'Messages', icon: MessageSquare },
];

export function Sidebar({ role, activeTab, onTabChange }: SidebarProps) {
  const menuItems = 
    role === 'principal' ? principalMenuItems :
    role === 'teacher' ? teacherMenuItems :
    studentMenuItems;

  const roleInfo = {
    principal: { icon: GraduationCap, title: 'Principal Portal', color: '#8b5cf6' },
    teacher: { icon: BookOpen, title: 'Teacher Portal', color: '#3b82f6' },
    student: { icon: Users, title: 'Student Portal', color: '#06b6d4' },
  };

  const { icon: RoleIcon, title, color } = roleInfo[role];

  return (
    <div className="flex h-screen w-64 flex-col border-r border-white/10 bg-gradient-to-b from-gray-900/50 to-gray-900/80 backdrop-blur-xl hidden lg:flex">
      {/* Logo */}
      <div className="flex items-center gap-3 border-b border-white/10 p-6">
        <div 
          className="rounded-xl p-2"
          style={{ 
            background: `linear-gradient(135deg, ${color}40, ${color}20)`,
            boxShadow: `0 0 20px ${color}30`
          }}
        >
          <RoleIcon className="h-6 w-6" style={{ color }} />
        </div>
        <div>
          <h2 className="font-semibold">{title}</h2>
          <p className="text-xs text-gray-400">School Management</p>
        </div>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 space-y-1 p-4">
        {menuItems.map((item) => {
          const isActive = activeTab === item.id;
          const Icon = item.icon;
          
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={cn(
                "group relative flex w-full items-center gap-3 rounded-xl px-4 py-3 transition-all duration-200",
                isActive 
                  ? "bg-gradient-to-r text-white shadow-lg" 
                  : "text-gray-400 hover:bg-white/5 hover:text-white"
              )}
              style={isActive ? {
                backgroundImage: `linear-gradient(135deg, ${color}40, ${color}20)`,
                boxShadow: `0 4px 20px ${color}30`
              } : {}}
            >
              {isActive && (
                <div 
                  className="absolute left-0 h-8 w-1 rounded-r-full"
                  style={{ backgroundColor: color }}
                />
              )}
              <Icon className="h-5 w-5" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="border-t border-white/10 p-4">
        <div className="rounded-xl bg-gradient-to-br from-white/5 to-white/[0.02] p-4">
          <p className="text-xs text-gray-400">Need Help?</p>
          <p className="mt-1 text-sm">Contact Support</p>
        </div>
      </div>
    </div>
  );
}