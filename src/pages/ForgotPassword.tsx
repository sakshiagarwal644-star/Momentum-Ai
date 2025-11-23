import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, ArrowLeft } from 'lucide-react';

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const isFormValid = email.trim() !== '' && email.includes('@');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isFormValid) {
      setSubmitted(true);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#F6F9F8] flex items-center justify-center px-6 py-12 animate-fade-in">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-3xl shadow-pastel-lg p-8 md:p-10 border border-[#A4D8C8]/20 text-center">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#A4D8C8] to-[#B4C7E7] flex items-center justify-center mx-auto mb-6">
              <Mail size={32} className="text-white" />
            </div>

            <h1 className="text-3xl font-extrabold text-[#1A1A1A] mb-4">
              Check Your Email
            </h1>

            <p className="text-[#545454] leading-relaxed mb-8">
              We've sent password reset instructions to{' '}
              <span className="font-semibold text-[#1A1A1A]">{email}</span>
            </p>

            <button
              onClick={() => navigate('/login')}
              className="w-full py-4 bg-[#A4D8C8] text-[#1A1A1A] font-semibold rounded-xl hover:bg-[#8fc7b5] transition-all shadow-pastel"
            >
              Back to Login
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F6F9F8] flex items-center justify-center px-6 py-12 animate-fade-in">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-3xl shadow-pastel-lg p-8 md:p-10 border border-[#A4D8C8]/20">
          <button
            onClick={() => navigate('/login')}
            className="flex items-center gap-2 text-[#545454] hover:text-[#1A1A1A] transition-colors mb-6"
          >
            <ArrowLeft size={20} />
            <span>Back to Login</span>
          </button>

          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-extrabold text-[#1A1A1A] mb-3">
              Reset Password
            </h1>
            <p className="text-[#545454] leading-relaxed">
              Enter your email address and we'll send you instructions to reset your password.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <div className="relative">
                <Mail
                  size={20}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-[#A4D8C8]"
                />
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 bg-[#F6F9F8] border border-[#A4D8C8]/30 rounded-xl focus:outline-none focus:border-[#A4D8C8] transition-colors"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={!isFormValid}
              className={`w-full py-4 font-semibold rounded-xl transition-all shadow-pastel ${
                isFormValid
                  ? 'bg-[#A4D8C8] text-[#1A1A1A] hover:bg-[#8fc7b5]'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              Send Reset Instructions
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
