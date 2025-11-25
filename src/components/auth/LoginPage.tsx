import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Card } from '../ui/card';
import { GraduationCap, Mail, Lock, ArrowRight, Eye, EyeOff } from 'lucide-react';
import { Role } from '../../lib/types';

interface LoginPageProps {
  onLogin: (role: Role) => void;
  onNavigateToRegister: () => void;
  preSelectedRole?: Role | null;
}

export function LoginPage({ onLogin, onNavigateToRegister, preSelectedRole }: LoginPageProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Use the pre-selected role, default to student if none provided
  const role = preSelectedRole || 'student';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate login delay
    setTimeout(() => {
      setIsLoading(false);
      onLogin(role);
    }, 800);
  };

  const roleInfo = {
    principal: { 
      color: '#8b5cf6',
      gradient: 'from-purple-600 to-violet-600',
      label: 'Principal'
    },
    teacher: { 
      color: '#3b82f6',
      gradient: 'from-blue-600 to-cyan-600',
      label: 'Teacher'
    },
    student: { 
      color: '#06b6d4',
      gradient: 'from-cyan-600 to-teal-600',
      label: 'Student'
    },
  };

  const currentRoleInfo = roleInfo[role];

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-96 w-96 animate-pulse rounded-full bg-purple-500/20 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-96 w-96 animate-pulse rounded-full bg-blue-500/20 blur-3xl" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 animate-pulse rounded-full bg-cyan-500/20 blur-3xl" style={{ animationDelay: '2s' }} />
      </div>

      <div className="relative flex flex-1 items-center justify-center p-4 sm:p-8">
        <Card className="w-full max-w-md overflow-hidden border-white/10 bg-gradient-to-br from-white/10 to-white/[0.02] backdrop-blur-xl">
          {/* Header */}
          <div className="border-b border-white/10 bg-gradient-to-r from-white/5 to-transparent p-8 pb-6">
            <div className="mb-6 flex justify-center">
              <div 
                className="rounded-2xl p-4 backdrop-blur-xl transition-all"
                style={{ 
                  background: `linear-gradient(135deg, ${currentRoleInfo.color}40, ${currentRoleInfo.color}20)`,
                  boxShadow: `0 0 30px ${currentRoleInfo.color}30`
                }}
              >
                <GraduationCap className="h-10 w-10" style={{ color: currentRoleInfo.color }} />
              </div>
            </div>
            <h1 className="mb-2 text-center text-3xl">Welcome Back</h1>
            <p className="text-center text-sm text-gray-400">
              Sign in to your account to continue
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            {/* Display Selected Role */}
            <div className="space-y-2">
              <Label className="text-gray-300">
                Logging in as
              </Label>
              <div 
                className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/5 p-4 backdrop-blur-sm"
                style={{ 
                  background: `linear-gradient(135deg, ${currentRoleInfo.color}10, ${currentRoleInfo.color}05)`,
                }}
              >
                <div 
                  className="flex h-10 w-10 items-center justify-center rounded-lg"
                  style={{ 
                    background: `linear-gradient(135deg, ${currentRoleInfo.color}40, ${currentRoleInfo.color}20)`,
                  }}
                >
                  <div className="h-3 w-3 rounded-full" style={{ backgroundColor: currentRoleInfo.color }} />
                </div>
                <span className="capitalize">{role}</span>
              </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-300">
                Email Address
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500" />
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border-white/10 bg-white/5 pl-10 backdrop-blur-sm transition-all placeholder:text-gray-500 focus:border-white/20 focus:bg-white/10"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-300">
                Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500" />
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="border-white/10 bg-white/5 pl-10 pr-10 backdrop-blur-sm transition-all placeholder:text-gray-500 focus:border-white/20 focus:bg-white/10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 transition-colors hover:text-gray-300"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Forgot Password */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="remember"
                  className="h-4 w-4 rounded border-white/20 bg-white/5 text-purple-600 focus:ring-2 focus:ring-purple-500 focus:ring-offset-0"
                />
                <label htmlFor="remember" className="text-sm text-gray-400">
                  Remember me
                </label>
              </div>
              <button
                type="button"
                className="text-sm text-gray-400 transition-colors hover:text-purple-400"
              >
                Forgot password?
              </button>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className={`group w-full bg-gradient-to-r ${currentRoleInfo.gradient} transition-all hover:scale-[1.02] hover:shadow-lg disabled:opacity-50`}
              style={{ boxShadow: `0 4px 20px ${currentRoleInfo.color}30` }}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  Signing in...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  Sign In
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              )}
            </Button>

            {/* Register Link */}
            <div className="text-center">
              <p className="text-sm text-gray-400">
                Don't have an account?{' '}
                <button
                  type="button"
                  onClick={onNavigateToRegister}
                  className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text transition-all hover:from-purple-300 hover:to-cyan-300"
                  style={{ WebkitTextFillColor: 'transparent' }}
                >
                  Create Account
                </button>
              </p>
            </div>
          </form>

          {/* Demo Credentials */}
          <div className="border-t border-white/10 bg-gradient-to-r from-white/5 to-transparent p-6">
            <p className="mb-3 text-center text-xs text-gray-500">Demo Credentials</p>
            <div className="space-y-2 text-xs text-gray-400">
              <div className="flex justify-between rounded-lg bg-white/5 p-2 backdrop-blur-sm">
                <span className="text-purple-400">Principal:</span>
                <span>principal@school.com</span>
              </div>
              <div className="flex justify-between rounded-lg bg-white/5 p-2 backdrop-blur-sm">
                <span className="text-blue-400">Teacher:</span>
                <span>teacher@school.com</span>
              </div>
              <div className="flex justify-between rounded-lg bg-white/5 p-2 backdrop-blur-sm">
                <span className="text-cyan-400">Student:</span>
                <span>student@school.com</span>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}