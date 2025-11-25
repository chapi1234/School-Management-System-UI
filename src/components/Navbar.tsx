import { Bell, Moon, Sun, Search, LogOut, User, Menu } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Badge } from './ui/badge';
import { Role } from '../lib/types';
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from './ui/dialog';
import { NotificationsPanel } from './shared/NotificationsPanel';
import { mockNotifications } from '../lib/mockData';
import { Label } from './ui/label';
import { toast } from 'sonner';

interface NavbarProps {
  darkMode: boolean;
  onToggleDarkMode: () => void;
  onLogout: () => void;
  role: Role;
  userName: string;
  notificationCount?: number;
  onMenuClick?: () => void;
}

export function Navbar({ 
  darkMode, 
  onToggleDarkMode, 
  onLogout, 
  role,
  userName,
  notificationCount = 3,
  onMenuClick
}: NavbarProps) {
  const roleColors = {
    principal: '#8b5cf6',
    teacher: '#3b82f6',
    student: '#06b6d4',
  };

  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  
  // Form state for editing
  const [editForm, setEditForm] = useState({
    fullName: userName,
    email: role === 'principal' ? 'robert.johnson@school.edu' : 
           role === 'teacher' ? 'sarah.johnson@school.edu' : 
           'alex.martinez@school.edu',
    phone: '+1 (555) 123-4567',
    department: 'Mathematics',
    class: 'Grade 10-A',
    studentId: 'STU-2024-001',
    employeeId: 'EMP-2024-001'
  });

  const handleSaveProfile = () => {
    toast.success('Profile updated successfully!');
    setIsEditMode(false);
  };

  const handleCancelEdit = () => {
    // Reset form to original values
    setEditForm({
      fullName: userName,
      email: role === 'principal' ? 'robert.johnson@school.edu' : 
             role === 'teacher' ? 'sarah.johnson@school.edu' : 
             'alex.martinez@school.edu',
      phone: '+1 (555) 123-4567',
      department: 'Mathematics',
      class: 'Grade 10-A',
      studentId: 'STU-2024-001',
      employeeId: 'EMP-2024-001'
    });
    setIsEditMode(false);
  };

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-gray-900/80 backdrop-blur-xl">
      <div className="flex h-16 items-center justify-between px-4 sm:px-6">
        {/* Left Section - Menu Button (Mobile) and Search */}
        <div className="flex flex-1 items-center gap-2 sm:gap-4">
          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={onMenuClick}
            className="rounded-xl hover:bg-white/5 lg:hidden"
          >
            <Menu className="h-5 w-5" />
          </Button>

          {/* Search */}
          <div className="relative hidden flex-1 max-w-md sm:block">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
              type="search"
              placeholder="Search..."
              className="border-white/10 bg-white/5 pl-10 backdrop-blur-sm focus:border-white/20"
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Search Icon (Mobile only) */}
          <Button
            variant="ghost"
            size="icon"
            className="rounded-xl hover:bg-white/5 sm:hidden"
          >
            <Search className="h-5 w-5" />
          </Button>

          {/* Dark Mode Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleDarkMode}
            className="rounded-xl hover:bg-white/5"
          >
            {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>

          {/* Notifications */}
          <Button 
            variant="ghost" 
            size="icon" 
            className="relative rounded-xl hover:bg-white/5"
            onClick={() => setIsNotificationsOpen(true)}
          >
            <Bell className="h-5 w-5" />
            {notificationCount > 0 && (
              <Badge 
                className="absolute -right-1 -top-1 h-5 w-5 rounded-full p-0 text-xs"
                style={{ backgroundColor: roleColors[role] }}
              >
                {notificationCount}
              </Badge>
            )}
          </Button>

          {/* Profile Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex h-10 items-center gap-2 rounded-xl px-2 sm:px-3 transition-colors hover:bg-white/5">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${userName}`} />
                  <AvatarFallback>{userName.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="hidden sm:flex flex-col items-start text-left">
                  <span className="text-sm">{userName}</span>
                  <span 
                    className="text-xs capitalize"
                    style={{ color: roleColors[role] }}
                  >
                    {role}
                  </span>
                </div>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 border-white/10 bg-gray-900/95 backdrop-blur-xl">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-white/10" />
              <DropdownMenuItem 
                className="cursor-pointer"
                onClick={() => setIsProfileOpen(true)}
              >
                <User className="mr-2 h-4 w-4" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem 
                className="cursor-pointer"
                onClick={() => setIsNotificationsOpen(true)}
              >
                <Bell className="mr-2 h-4 w-4" />
                Notifications
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-white/10" />
              <DropdownMenuItem 
                variant="destructive"
                className="cursor-pointer"
                onClick={onLogout}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Notifications Dialog */}
      <Dialog open={isNotificationsOpen} onOpenChange={setIsNotificationsOpen}>
        <DialogContent className="max-w-2xl" aria-describedby={undefined}>
          <DialogHeader>
            <DialogTitle>Notifications</DialogTitle>
          </DialogHeader>
          <NotificationsPanel notifications={mockNotifications} />
        </DialogContent>
      </Dialog>

      {/* Profile Dialog */}
      <Dialog open={isProfileOpen} onOpenChange={setIsProfileOpen}>
        <DialogContent className="border-white/10 bg-gray-900 max-w-md">
          <DialogHeader>
            <DialogTitle>Profile</DialogTitle>
            <DialogDescription>
              Edit your profile information.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6">
            {/* Avatar Section */}
            <div className="flex flex-col items-center gap-4">
              <Avatar className="h-24 w-24">
                <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${userName}`} />
                <AvatarFallback className="text-2xl">{userName.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="text-center">
                <h3 className="text-xl">{userName}</h3>
                <Badge 
                  className="mt-2 capitalize"
                  style={{ backgroundColor: `${roleColors[role]}40`, color: roleColors[role] }}
                >
                  {role}
                </Badge>
              </div>
            </div>

            {/* Profile Information */}
            <div className="space-y-4">
              {/* Full Name */}
              <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                <Label className="text-xs text-gray-400">Full Name</Label>
                {isEditMode ? (
                  <Input 
                    value={editForm.fullName} 
                    onChange={(e) => setEditForm({ ...editForm, fullName: e.target.value })}
                    className="mt-1 border-white/10 bg-white/5"
                  />
                ) : (
                  <p className="mt-1">{editForm.fullName}</p>
                )}
              </div>
              
              {/* Email */}
              <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                <Label className="text-xs text-gray-400">Email</Label>
                {isEditMode ? (
                  <Input 
                    value={editForm.email} 
                    onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                    className="mt-1 border-white/10 bg-white/5"
                    type="email"
                  />
                ) : (
                  <p className="mt-1">{editForm.email}</p>
                )}
              </div>

              {/* Role */}
              <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                <Label className="text-xs text-gray-400">Role</Label>
                <p className="mt-1 capitalize">{role}</p>
              </div>

              {/* Department (Teacher only) */}
              {role === 'teacher' && (
                <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                  <Label className="text-xs text-gray-400">Department</Label>
                  {isEditMode ? (
                    <Input 
                      value={editForm.department} 
                      onChange={(e) => setEditForm({ ...editForm, department: e.target.value })}
                      className="mt-1 border-white/10 bg-white/5"
                    />
                  ) : (
                    <p className="mt-1">{editForm.department}</p>
                  )}
                </div>
              )}

              {/* Student specific fields */}
              {role === 'student' && (
                <>
                  <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                    <Label className="text-xs text-gray-400">Class</Label>
                    {isEditMode ? (
                      <Input 
                        value={editForm.class} 
                        onChange={(e) => setEditForm({ ...editForm, class: e.target.value })}
                        className="mt-1 border-white/10 bg-white/5"
                      />
                    ) : (
                      <p className="mt-1">{editForm.class}</p>
                    )}
                  </div>
                  <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                    <Label className="text-xs text-gray-400">Student ID</Label>
                    {isEditMode ? (
                      <Input 
                        value={editForm.studentId} 
                        onChange={(e) => setEditForm({ ...editForm, studentId: e.target.value })}
                        className="mt-1 border-white/10 bg-white/5"
                      />
                    ) : (
                      <p className="mt-1">{editForm.studentId}</p>
                    )}
                  </div>
                </>
              )}

              {/* Principal specific field */}
              {role === 'principal' && (
                <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                  <Label className="text-xs text-gray-400">Employee ID</Label>
                  {isEditMode ? (
                    <Input 
                      value={editForm.employeeId} 
                      onChange={(e) => setEditForm({ ...editForm, employeeId: e.target.value })}
                      className="mt-1 border-white/10 bg-white/5"
                    />
                  ) : (
                    <p className="mt-1">{editForm.employeeId}</p>
                  )}
                </div>
              )}

              {/* Phone */}
              <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                <Label className="text-xs text-gray-400">Phone</Label>
                {isEditMode ? (
                  <Input 
                    value={editForm.phone} 
                    onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                    className="mt-1 border-white/10 bg-white/5"
                    type="tel"
                  />
                ) : (
                  <p className="mt-1">{editForm.phone}</p>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            {isEditMode ? (
              <div className="flex gap-2">
                <Button 
                  variant="outline"
                  className="w-full"
                  onClick={handleCancelEdit}
                >
                  Cancel
                </Button>
                <Button 
                  className="w-full bg-gradient-to-r"
                  style={{ 
                    backgroundImage: `linear-gradient(to right, ${roleColors[role]}, ${roleColors[role]}dd)` 
                  }}
                  onClick={handleSaveProfile}
                >
                  Save Changes
                </Button>
              </div>
            ) : (
              <Button 
                className="w-full bg-gradient-to-r"
                style={{ 
                  backgroundImage: `linear-gradient(to right, ${roleColors[role]}, ${roleColors[role]}dd)` 
                }}
                onClick={() => setIsEditMode(true)}
              >
                Edit Profile
              </Button>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </header>
  );
}