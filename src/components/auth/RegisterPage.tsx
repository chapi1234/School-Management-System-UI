import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Card } from '../ui/card';
import { GraduationCap, Mail, Lock, User, ArrowRight, Eye, EyeOff, Phone } from 'lucide-react';
import { Role } from '../../lib/types';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

interface RegisterPageProps {
  onRegister: (role: Role) => void;
  onNavigateToLogin: () => void;
  preSelectedRole?: Role | null;
}

export function RegisterPage({ onRegister, onNavigateToLogin, preSelectedRole }: RegisterPageProps) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    role: (preSelectedRole || 'student') as Role,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);

    // Simulate registration delay
    setTimeout(() => {
      setIsLoading(false);
      onRegister(formData.role);
    }, 1000);
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

  const currentRoleInfo = roleInfo[formData.role];

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-96 w-96 animate-pulse rounded-full bg-purple-500/20 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-96 w-96 animate-pulse rounded-full bg-blue-500/20 blur-3xl" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 animate-pulse rounded-full bg-cyan-500/20 blur-3xl" style={{ animationDelay: '2s' }} />
      </div>

      <div className="relative flex flex-1 items-center justify-center p-4 sm:p-8">
        <Card className="w-full max-w-2xl overflow-hidden border-white/10 bg-gradient-to-br from-white/10 to-white/[0.02] backdrop-blur-xl">
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
            <h1 className="mb-2 text-center text-3xl">Create Account</h1>
            <p className="text-center text-sm text-gray-400">
              Join our school management system
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            {/* Role Selection */}
            <div className="space-y-2">
              <Label htmlFor="role" className="text-gray-300">
                Register as
              </Label>
              <Select 
                value={formData.role} 
                onValueChange={(value) => handleChange('role', value)}
              >
                <SelectTrigger 
                  className="border-white/10 bg-white/5 backdrop-blur-sm transition-all focus:border-white/20 focus:bg-white/10"
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="border-white/10 bg-gray-900/95 backdrop-blur-xl">
                  <SelectItem value="student" className="focus:bg-cyan-500/20">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-cyan-500" />
                      Student
                    </div>
                  </SelectItem>
                  <SelectItem value="teacher" className="focus:bg-blue-500/20">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-blue-500" />
                      Teacher
                    </div>
                  </SelectItem>
                  <SelectItem value="principal" className="focus:bg-purple-500/20">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-purple-500" />
                      Principal
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Name Fields */}
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="firstName" className="text-gray-300">
                  First Name
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500" />
                  <Input
                    id="firstName"
                    type="text"
                    placeholder="John"
                    value={formData.firstName}
                    onChange={(e) => handleChange('firstName', e.target.value)}
                    className={`border-white/10 bg-white/5 pl-10 backdrop-blur-sm transition-all placeholder:text-gray-500 focus:border-white/20 focus:bg-white/10 ${errors.firstName ? 'border-red-500/50' : ''}`}
                    required
                  />
                </div>
                {errors.firstName && (
                  <p className="text-xs text-red-400">{errors.firstName}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="lastName" className="text-gray-300">
                  Last Name
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500" />
                  <Input
                    id="lastName"
                    type="text"
                    placeholder="Doe"
                    value={formData.lastName}
                    onChange={(e) => handleChange('lastName', e.target.value)}
                    className={`border-white/10 bg-white/5 pl-10 backdrop-blur-sm transition-all placeholder:text-gray-500 focus:border-white/20 focus:bg-white/10 ${errors.lastName ? 'border-red-500/50' : ''}`}
                    required
                  />
                </div>
                {errors.lastName && (
                  <p className="text-xs text-red-400">{errors.lastName}</p>
                )}
              </div>
            </div>

            {/* Email and Phone */}
            <div className="grid gap-6 sm:grid-cols-2">
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
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    className={`border-white/10 bg-white/5 pl-10 backdrop-blur-sm transition-all placeholder:text-gray-500 focus:border-white/20 focus:bg-white/10 ${errors.email ? 'border-red-500/50' : ''}`}
                    required
                  />
                </div>
                {errors.email && (
                  <p className="text-xs text-red-400">{errors.email}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="text-gray-300">
                  Phone Number
                </Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500" />
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    value={formData.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    className="border-white/10 bg-white/5 pl-10 backdrop-blur-sm transition-all placeholder:text-gray-500 focus:border-white/20 focus:bg-white/10"
                  />
                </div>
              </div>
            </div>

            {/* Password Fields */}
            <div className="grid gap-6 sm:grid-cols-2">
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
                    value={formData.password}
                    onChange={(e) => handleChange('password', e.target.value)}
                    className={`border-white/10 bg-white/5 pl-10 pr-10 backdrop-blur-sm transition-all placeholder:text-gray-500 focus:border-white/20 focus:bg-white/10 ${errors.password ? 'border-red-500/50' : ''}`}
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
                {errors.password && (
                  <p className="text-xs text-red-400">{errors.password}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-gray-300">
                  Confirm Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500" />
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={(e) => handleChange('confirmPassword', e.target.value)}
                    className={`border-white/10 bg-white/5 pl-10 pr-10 backdrop-blur-sm transition-all placeholder:text-gray-500 focus:border-white/20 focus:bg-white/10 ${errors.confirmPassword ? 'border-red-500/50' : ''}`}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 transition-colors hover:text-gray-300"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-xs text-red-400">{errors.confirmPassword}</p>
                )}
              </div>
            </div>

            {/* Terms and Conditions */}
            <div className="flex items-start space-x-2">
              <input
                type="checkbox"
                id="terms"
                className="mt-1 h-4 w-4 rounded border-white/20 bg-white/5 text-purple-600 focus:ring-2 focus:ring-purple-500 focus:ring-offset-0"
                required
              />
              <label htmlFor="terms" className="text-sm text-gray-400">
                I agree to the{' '}
                <button type="button" className="text-purple-400 hover:text-purple-300">
                  Terms of Service
                </button>{' '}
                and{' '}
                <button type="button" className="text-purple-400 hover:text-purple-300">
                  Privacy Policy
                </button>
              </label>
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
                  Creating Account...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  Create Account
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              )}
            </Button>

            {/* Login Link */}
            <div className="text-center">
              <p className="text-sm text-gray-400">
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={onNavigateToLogin}
                  className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text transition-all hover:from-purple-300 hover:to-cyan-300"
                  style={{ WebkitTextFillColor: 'transparent' }}
                >
                  Sign In
                </button>
              </p>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}