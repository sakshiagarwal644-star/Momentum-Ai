import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Lock, AtSign } from 'lucide-react';

export default function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    handle: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      navigate('/onboarding', { state: formData });
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: '' });
    }
  };

  return (
    <div className="min-h-screen bg-[#F6F9F8] flex items-center justify-center px-6 py-12 animate-fade-in">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-3xl shadow-pastel-lg p-8 border border-[#A4D8C8]/20">
          <h1 className="text-3xl font-extrabold text-[#1A1A1A] mb-8 text-center">
            Create your account
          </h1>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <div className="relative">
                <User size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#A4D8C8]" />
                <input
                  type="text"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={(e) => handleChange('firstName', e.target.value)}
                  className={`w-full pl-12 pr-4 py-3.5 bg-[#F6F9F8] border ${
                    errors.firstName ? 'border-red-300' : 'border-[#A4D8C8]/30'
                  } rounded-xl focus:outline-none focus:border-[#A4D8C8] transition-colors`}
                />
              </div>
              {errors.firstName && (
                <p className="text-red-400 text-sm mt-1.5 ml-1">{errors.firstName}</p>
              )}
            </div>

            <div>
              <div className="relative">
                <User size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#A4D8C8]" />
                <input
                  type="text"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={(e) => handleChange('lastName', e.target.value)}
                  className={`w-full pl-12 pr-4 py-3.5 bg-[#F6F9F8] border ${
                    errors.lastName ? 'border-red-300' : 'border-[#A4D8C8]/30'
                  } rounded-xl focus:outline-none focus:border-[#A4D8C8] transition-colors`}
                />
              </div>
              {errors.lastName && (
                <p className="text-red-400 text-sm mt-1.5 ml-1">{errors.lastName}</p>
              )}
            </div>

            <div>
              <div className="relative">
                <Mail size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#A4D8C8]" />
                <input
                  type="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  className={`w-full pl-12 pr-4 py-3.5 bg-[#F6F9F8] border ${
                    errors.email ? 'border-red-300' : 'border-[#A4D8C8]/30'
                  } rounded-xl focus:outline-none focus:border-[#A4D8C8] transition-colors`}
                />
              </div>
              {errors.email && (
                <p className="text-red-400 text-sm mt-1.5 ml-1">{errors.email}</p>
              )}
            </div>

            <div>
              <div className="relative">
                <Lock size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#A4D8C8]" />
                <input
                  type="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={(e) => handleChange('password', e.target.value)}
                  className={`w-full pl-12 pr-4 py-3.5 bg-[#F6F9F8] border ${
                    errors.password ? 'border-red-300' : 'border-[#A4D8C8]/30'
                  } rounded-xl focus:outline-none focus:border-[#A4D8C8] transition-colors`}
                />
              </div>
              {errors.password && (
                <p className="text-red-400 text-sm mt-1.5 ml-1">{errors.password}</p>
              )}
            </div>

            <div>
              <div className="relative">
                <AtSign size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#A4D8C8]" />
                <input
                  type="text"
                  placeholder="Instagram/YouTube Handle (optional)"
                  value={formData.handle}
                  onChange={(e) => handleChange('handle', e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 bg-[#F6F9F8] border border-[#A4D8C8]/30 rounded-xl focus:outline-none focus:border-[#A4D8C8] transition-colors"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-[#A4D8C8] text-[#1A1A1A] font-semibold rounded-xl hover:bg-[#8fc7b5] transition-all shadow-pastel mt-6"
            >
              Create Account
            </button>

            <p className="text-xs text-[#545454] text-center mt-4">
              By continuing, you agree to our Terms & Privacy Policy.
            </p>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#A4D8C8]/30"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-[#545454]">or</span>
              </div>
            </div>

            <button
              type="button"
              className="w-full py-3.5 bg-white border-2 border-[#A4D8C8] text-[#1A1A1A] font-semibold rounded-xl hover:bg-[#A4D8C8]/10 transition-all flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Login with Google
            </button>
          </form>

          <div className="mt-6 text-center space-y-2">
            <button
              onClick={() => navigate('/login')}
              className="text-[#545454] hover:text-[#1A1A1A] transition-colors"
            >
              Already have an account? <span className="underline">Login</span>
            </button>
            <div>
              <button
                onClick={() => navigate('/')}
                className="text-[#545454] hover:text-[#1A1A1A] transition-colors underline text-sm"
              >
                Back to home
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
