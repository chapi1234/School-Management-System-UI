import { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { MobileSidebar } from './components/MobileSidebar';
import { Navbar } from './components/Navbar';
import { PrincipalDashboard } from './components/dashboards/PrincipalDashboard';
import { TeacherDashboard } from './components/dashboards/TeacherDashboard';
import { StudentDashboard } from './components/dashboards/StudentDashboard';
import { LoginPage } from './components/auth/LoginPage';
import { RegisterPage } from './components/auth/RegisterPage';
import { Role } from './lib/types';
import { Button } from './components/ui/button';
import { Card } from './components/ui/card';
import { GraduationCap, BookOpen, Users } from 'lucide-react';
import { Toaster } from './components/ui/sonner';

type AuthView = 'roleSelection' | 'login' | 'register' | 'dashboard';

export default function App() {
  const [currentView, setCurrentView] = useState<AuthView>('roleSelection');
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [currentRole, setCurrentRole] = useState<Role | null>(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [darkMode, setDarkMode] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const handleRoleSelect = (role: Role) => {
    setSelectedRole(role);
    setCurrentView('login');
  };

  const handleLogin = (role: Role) => {
    setCurrentRole(role);
    setCurrentView('dashboard');
    setActiveTab('overview');
  };

  const handleRegister = (role: Role) => {
    setCurrentRole(role);
    setCurrentView('dashboard');
    setActiveTab('overview');
  };

  const handleLogout = () => {
    setCurrentRole(null);
    setSelectedRole(null);
    setCurrentView('roleSelection');
    setActiveTab('overview');
  };

  const roleInfo = {
    principal: { 
      name: 'Dr. Robert Johnson', 
      icon: GraduationCap,
      color: '#8b5cf6',
      gradient: 'from-purple-600 to-violet-600'
    },
    teacher: { 
      name: 'Sarah Johnson', 
      icon: BookOpen,
      color: '#3b82f6',
      gradient: 'from-blue-600 to-cyan-600'
    },
    student: { 
      name: 'Alex Martinez', 
      icon: Users,
      color: '#06b6d4',
      gradient: 'from-cyan-600 to-teal-600'
    },
  };

  // Show Login Page
  if (currentView === 'login' && selectedRole) {
    return (
      <>
        <Toaster position="top-right" />
        <LoginPage 
          onLogin={handleLogin}
          onNavigateToRegister={() => setCurrentView('register')}
          preSelectedRole={selectedRole}
        />
      </>
    );
  }

  // Show Register Page
  if (currentView === 'register') {
    return (
      <>
        <Toaster position="top-right" />
        <RegisterPage 
          onRegister={handleRegister} 
          onNavigateToLogin={() => setCurrentView('login')}
          preSelectedRole={selectedRole}
        />
      </>
    );
  }

  // Role Selection Screen
  if (currentView === 'roleSelection') {
    return (
      <div className="flex min-h-screen flex-col bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950">
        <Toaster position="top-right" />
        
        {/* Animated Background */}
        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 h-96 w-96 animate-pulse rounded-full bg-purple-500/20 blur-3xl" />
          <div className="absolute -bottom-40 -left-40 h-96 w-96 animate-pulse rounded-full bg-blue-500/20 blur-3xl" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 left-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 animate-pulse rounded-full bg-cyan-500/20 blur-3xl" style={{ animationDelay: '2s' }} />
        </div>

        <div className="relative flex flex-1 items-center justify-center p-8">
          <div className="w-full max-w-6xl">
            {/* Header */}
            <div className="mb-12 text-center">
              <div className="mb-4 flex justify-center">
                <div className="rounded-2xl bg-gradient-to-br from-purple-500/20 to-cyan-500/20 p-4 backdrop-blur-xl">
                  <GraduationCap className="h-12 w-12 text-purple-400" />
                </div>
              </div>
              <h1 className="mb-2 bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-4xl text-transparent">
                School Management System
              </h1>
              <p className="text-gray-400">
                Select your role to continue
              </p>
            </div>

            {/* Role Cards */}
            <div className="grid gap-6 md:grid-cols-3">
              {(['principal', 'teacher', 'student'] as Role[]).map((role) => {
                const info = roleInfo[role];
                const Icon = info.icon;
                
                return (
                  <Card 
                    key={role}
                    className="group cursor-pointer overflow-hidden border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl transition-all hover:scale-105 hover:border-white/20"
                    onClick={() => handleRoleSelect(role)}
                  >
                    <div className="p-8">
                      <div 
                        className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl transition-transform group-hover:scale-110"
                        style={{ 
                          background: `linear-gradient(135deg, ${info.color}40, ${info.color}20)`,
                          boxShadow: `0 0 30px ${info.color}30`
                        }}
                      >
                        <Icon className="h-8 w-8" style={{ color: info.color }} />
                      </div>
                      <h3 className="mb-2 text-2xl capitalize">{role}</h3>
                      <p className="mb-6 text-sm text-gray-400 text-[20px]">
                        {role === 'principal' && 'Manage school operations, teachers, and students'}
                        {role === 'teacher' && 'Manage classes, grades, and assignments'}
                        {role === 'student' && 'View grades, assignments, and attendance'}
                      </p>
                      <Button 
                        className={`w-full bg-gradient-to-r ${info.gradient} transition-all group-hover:shadow-lg`}
                        style={{ boxShadow: `0 4px 20px ${info.color}30` }}
                      >
                        Login as {role.charAt(0).toUpperCase() + role.slice(1)}
                      </Button>
                    </div>
                  </Card>
                );
              })}
            </div>

            {/* Features */}
            <div className="mt-16 grid gap-6 md:grid-cols-3">
              <div className="text-center">
                <div className="mb-3 flex justify-center">
                  <div className="rounded-xl bg-gradient-to-br from-purple-500/20 to-purple-500/10 p-3">
                    <GraduationCap className="h-6 w-6 text-purple-400" />
                  </div>
                </div>
                <h4 className="mb-2">Role-Based Access</h4>
                <p className="text-sm text-gray-400">
                  Customized dashboards for each role
                </p>
              </div>
              <div className="text-center">
                <div className="mb-3 flex justify-center">
                  <div className="rounded-xl bg-gradient-to-br from-blue-500/20 to-blue-500/10 p-3">
                    <BookOpen className="h-6 w-6 text-blue-400" />
                  </div>
                </div>
                <h4 className="mb-2">Real-time Analytics</h4>
                <p className="text-sm text-gray-400">
                  Track performance with interactive charts
                </p>
              </div>
              <div className="text-center">
                <div className="mb-3 flex justify-center">
                  <div className="rounded-xl bg-gradient-to-br from-cyan-500/20 to-cyan-500/10 p-3">
                    <Users className="h-6 w-6 text-cyan-400" />
                  </div>
                </div>
                <h4 className="mb-2">Modern Interface</h4>
                <p className="text-sm text-gray-400">
                  Clean, intuitive, and responsive design
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Main Dashboard
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950">
      <Toaster position="top-right" />
      
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-96 w-96 animate-pulse rounded-full bg-purple-500/10 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-96 w-96 animate-pulse rounded-full bg-blue-500/10 blur-3xl" style={{ animationDelay: '1s' }} />
      </div>

      {/* Sidebar - Desktop */}
      <Sidebar role={currentRole} activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Mobile Sidebar */}
      <MobileSidebar 
        role={currentRole} 
        activeTab={activeTab} 
        onTabChange={setActiveTab}
        open={mobileMenuOpen}
        onOpenChange={setMobileMenuOpen}
      />

      {/* Main Content */}
      <div className="relative flex flex-1 flex-col">
        <Navbar 
          darkMode={darkMode}
          onToggleDarkMode={() => setDarkMode(!darkMode)}
          onLogout={handleLogout}
          role={currentRole}
          userName={roleInfo[currentRole].name}
          onMenuClick={() => setMobileMenuOpen(true)}
        />

        <main className="flex-1 overflow-auto p-4 sm:p-6 lg:p-8">
          {currentRole === 'principal' && <PrincipalDashboard activeTab={activeTab} />}
          {currentRole === 'teacher' && <TeacherDashboard activeTab={activeTab} />}
          {currentRole === 'student' && <StudentDashboard activeTab={activeTab} />}
        </main>
      </div>
    </div>
  );
}