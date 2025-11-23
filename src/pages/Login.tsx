import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const isFormValid = formData.email.trim() !== '' && formData.password.trim() !== '';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!formData.email.includes('@')) {
      setError('Incorrect email or password. Please try again.');
      return;
    }

    navigate('/dashboard');
  };

  const handleGoogleLogin = () => {
    navigate('/dashboard');
  };

  const handleChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
    if (error) setError('');
  };

  return (
    <div className="min-h-screen bg-[#F6F9F8] flex items-center justify-center px-6 py-12 relative overflow-hidden animate-fade-in">
      <div className="absolute top-20 left-20 w-96 h-96 rounded-full bg-gradient-to-br from-[#A4D8C8]/10 to-[#F7E6FF]/10 blur-3xl"></div>
      <div className="absolute bottom-20 right-20 w-80 h-80 rounded-full bg-gradient-to-br from-[#FFCFAE]/10 to-[#B4C7E7]/10 blur-3xl"></div>

      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-16 items-center relative z-10">
        <div className="hidden lg:block">
          <div className="bg-white/40 backdrop-blur-sm rounded-3xl p-8 shadow-pastel space-y-6 opacity-60">
            <div className="bg-gradient-to-br from-[#A4D8C8] to-[#B4C7E7] rounded-2xl p-6 h-48"></div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gradient-to-br from-[#FFCFAE] to-[#F7E6FF] rounded-xl h-32"></div>
              <div className="bg-gradient-to-br from-[#B4C7E7] to-[#F7E6FF] rounded-xl h-32"></div>
            </div>
            <div className="space-y-3">
              <div className="h-3 bg-gradient-to-r from-[#A4D8C8]/30 to-transparent rounded-full"></div>
              <div className="h-3 bg-gradient-to-r from-[#A4D8C8]/30 to-transparent rounded-full w-4/5"></div>
              <div className="h-3 bg-gradient-to-r from-[#A4D8C8]/30 to-transparent rounded-full w-3/5"></div>
            </div>
          </div>
        </div>

        <div className="w-full max-w-md mx-auto lg:mx-0">
          <div className="bg-white rounded-3xl shadow-pastel-lg p-8 md:p-10 border border-[#A4D8C8]/20">
            <div className="mb-8">
              <h1 className="text-3xl md:text-4xl font-extrabold text-[#1A1A1A] mb-3">
                Welcome Back.
              </h1>
              <p className="text-[#545454] leading-relaxed">
                Log in to access your personalized content dashboard.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <div className="relative">
                  <Mail
                    size={20}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-[#A4D8C8]"
                  />
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    className={`w-full pl-12 pr-4 py-3.5 bg-[#F6F9F8] border ${
                      error ? 'border-[#FFCFAE]' : 'border-[#A4D8C8]/30'
                    } rounded-xl focus:outline-none focus:border-[#A4D8C8] transition-colors`}
                  />
                </div>
              </div>

              <div>
                <div className="relative">
                  <Lock
                    size={20}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-[#A4D8C8]"
                  />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={(e) => handleChange('password', e.target.value)}
                    className={`w-full pl-12 pr-12 py-3.5 bg-[#F6F9F8] border ${
                      error ? 'border-[#FFCFAE]' : 'border-[#A4D8C8]/30'
                    } rounded-xl focus:outline-none focus:border-[#A4D8C8] transition-colors`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#A4D8C8] hover:text-[#8fc7b5] transition-colors"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>

                {error && (
                  <p className="text-[#FFCFAE] text-sm mt-2 ml-1">{error}</p>
                )}

                <div className="mt-3 text-right">
                  <button
                    type="button"
                    onClick={() => navigate('/forgot-password')}
                    className="text-sm text-[#B4C7E7] hover:text-[#A4D8C8] transition-colors"
                  >
                    Forgot Password?
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={!isFormValid}
                className={`w-full py-4 font-semibold rounded-xl transition-all shadow-pastel mt-6 ${
                  isFormValid
                    ? 'bg-[#A4D8C8] text-[#1A1A1A] hover:bg-[#8fc7b5]'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                Login
              </button>

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
                onClick={handleGoogleLogin}
                className="w-full py-3.5 bg-white border-2 border-[#A4D8C8]/40 text-[#1A1A1A] font-semibold rounded-xl hover:bg-[#A4D8C8]/10 transition-all flex items-center justify-center gap-2"
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

            <div className="mt-6 text-center">
              <p className="text-[#545454]">
                Don't have an account?{' '}
                <button
                  onClick={() => navigate('/start-trial')}
                  className="text-[#A4D8C8] hover:text-[#8fc7b5] font-semibold transition-colors"
                >
                  Start your free trial
                </button>
              </p>
            </div>
          </div>

          <div className="mt-6 text-center">
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
  );
}
