import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { User, Target, Briefcase, Sparkles, Users, CheckCircle } from 'lucide-react';

interface OnboardingData {
  firstName: string;
  lastName: string;
  handle: string;
  coachType: string;
  coachTypeOther: string;
  services: string[];
  servicesOther: string;
  contentTypes: string[];
  contentTone: string;
  instagramHandle: string;
  youtubeHandle: string;
  followerCount: string;
  mainPlatform: string;
}

export default function Onboarding() {
  const navigate = useNavigate();
  const location = useLocation();
  const signupData = location.state || {};

  const [step, setStep] = useState(1);
  const [data, setData] = useState<OnboardingData>({
    firstName: signupData.firstName || '',
    lastName: signupData.lastName || '',
    handle: signupData.handle || '',
    coachType: '',
    coachTypeOther: '',
    services: [],
    servicesOther: '',
    contentTypes: [],
    contentTone: '',
    instagramHandle: signupData.handle || '',
    youtubeHandle: '',
    followerCount: '',
    mainPlatform: '',
  });

  const totalSteps = 6;

  const updateData = (field: string, value: string | string[]) => {
    setData({ ...data, [field]: value });
  };

  const toggleService = (service: string) => {
    const services = data.services.includes(service)
      ? data.services.filter((s) => s !== service)
      : [...data.services, service];
    updateData('services', services);
  };

  const toggleContentType = (type: string) => {
    const types = data.contentTypes.includes(type)
      ? data.contentTypes.filter((t) => t !== type)
      : [...data.contentTypes, type];
    updateData('contentTypes', types);
  };

  const nextStep = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      navigate('/dashboard');
    }
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const getStepIcon = (stepNumber: number) => {
    const icons = [User, Target, Briefcase, Sparkles, Users, CheckCircle];
    return icons[stepNumber - 1];
  };

  const StepIcon = getStepIcon(step);

  return (
    <div className="min-h-screen bg-[#F6F9F8] py-12 px-6">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <div className="h-2 bg-white rounded-full overflow-hidden shadow-pastel">
            <div
              className="h-full bg-gradient-to-r from-[#A4D8C8] to-[#B4C7E7] transition-all duration-500 ease-out"
              style={{ width: `${(step / totalSteps) * 100}%` }}
            ></div>
          </div>
          <p className="text-sm text-[#545454] mt-3 text-center">
            Step {step} of {totalSteps}
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-pastel-lg p-8 md:p-12 animate-slide-left">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#A4D8C8] to-[#B4C7E7] flex items-center justify-center">
              <StepIcon size={32} className="text-white" strokeWidth={2} />
            </div>
          </div>

          {step === 1 && (
            <div className="space-y-6">
              <h2 className="text-3xl font-extrabold text-[#1A1A1A] text-center mb-8">
                About You
              </h2>

              <div>
                <label className="block text-sm font-semibold text-[#1A1A1A] mb-2">
                  First Name
                </label>
                <input
                  type="text"
                  value={data.firstName}
                  onChange={(e) => updateData('firstName', e.target.value)}
                  className="w-full px-4 py-3.5 bg-[#F6F9F8] border border-[#A4D8C8]/30 rounded-xl focus:outline-none focus:border-[#A4D8C8] transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#1A1A1A] mb-2">
                  Last Name
                </label>
                <input
                  type="text"
                  value={data.lastName}
                  onChange={(e) => updateData('lastName', e.target.value)}
                  className="w-full px-4 py-3.5 bg-[#F6F9F8] border border-[#A4D8C8]/30 rounded-xl focus:outline-none focus:border-[#A4D8C8] transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#1A1A1A] mb-2">
                  Instagram/YouTube Handle
                </label>
                <input
                  type="text"
                  value={data.handle}
                  onChange={(e) => updateData('handle', e.target.value)}
                  className="w-full px-4 py-3.5 bg-[#F6F9F8] border border-[#A4D8C8]/30 rounded-xl focus:outline-none focus:border-[#A4D8C8] transition-colors"
                />
              </div>

              <p className="text-sm text-[#545454] text-center mt-4">
                We'll use this info to personalize your experience.
              </p>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <h2 className="text-3xl font-extrabold text-[#1A1A1A] text-center mb-8">
                What type of coach are you?
              </h2>

              <div>
                <select
                  value={data.coachType}
                  onChange={(e) => updateData('coachType', e.target.value)}
                  className="w-full px-4 py-3.5 bg-[#F6F9F8] border border-[#A4D8C8]/30 rounded-xl focus:outline-none focus:border-[#A4D8C8] transition-colors"
                >
                  <option value="">Select your coaching type</option>
                  <option value="fitness">Fitness coach – Gym/Sports</option>
                  <option value="yoga">Yoga & Wellness</option>
                  <option value="nutrition">Diet & Nutrition</option>
                  <option value="life">Life Coach</option>
                  <option value="other">Others</option>
                </select>
              </div>

              {data.coachType === 'other' && (
                <div>
                  <label className="block text-sm font-semibold text-[#1A1A1A] mb-2">
                    Please describe your coaching niche
                  </label>
                  <textarea
                    value={data.coachTypeOther}
                    onChange={(e) => updateData('coachTypeOther', e.target.value)}
                    rows={4}
                    className="w-full px-4 py-3.5 bg-[#F6F9F8] border border-[#A4D8C8]/30 rounded-xl focus:outline-none focus:border-[#A4D8C8] transition-colors resize-none"
                  />
                </div>
              )}
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <h2 className="text-3xl font-extrabold text-[#1A1A1A] text-center mb-8">
                What services do you offer?
              </h2>

              <div className="flex flex-wrap gap-3">
                {[
                  '1:1 Coaching',
                  'Group Coaching',
                  'Workshops / Classes',
                  'Online Courses',
                  'Retreats',
                  'Subscription Community',
                  'Other',
                ].map((service) => (
                  <button
                    key={service}
                    onClick={() => toggleService(service)}
                    className={`px-6 py-3 rounded-full font-semibold transition-all ${
                      data.services.includes(service)
                        ? 'bg-[#A4D8C8] text-[#1A1A1A] shadow-pastel'
                        : 'bg-[#F6F9F8] text-[#545454] hover:bg-[#A4D8C8]/20'
                    }`}
                  >
                    {service}
                  </button>
                ))}
              </div>

              {data.services.includes('Other') && (
                <div>
                  <label className="block text-sm font-semibold text-[#1A1A1A] mb-2">
                    Please specify
                  </label>
                  <input
                    type="text"
                    value={data.servicesOther}
                    onChange={(e) => updateData('servicesOther', e.target.value)}
                    className="w-full px-4 py-3.5 bg-[#F6F9F8] border border-[#A4D8C8]/30 rounded-xl focus:outline-none focus:border-[#A4D8C8] transition-colors"
                  />
                </div>
              )}
            </div>
          )}

          {step === 4 && (
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-extrabold text-[#1A1A1A] text-center mb-8">
                  What type of content do you want to create?
                </h2>

                <div className="flex flex-wrap gap-3">
                  {[
                    'Reels/Shorts',
                    'Stories',
                    'Carousels',
                    'Scripts only',
                    'All of the above',
                  ].map((type) => (
                    <button
                      key={type}
                      onClick={() => toggleContentType(type)}
                      className={`px-6 py-3 rounded-full font-semibold transition-all ${
                        data.contentTypes.includes(type)
                          ? 'bg-[#A4D8C8] text-[#1A1A1A] shadow-pastel'
                          : 'bg-[#F6F9F8] text-[#545454] hover:bg-[#A4D8C8]/20'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xl font-extrabold text-[#1A1A1A] mb-4">
                  What tone do you prefer?
                </h3>

                <div className="space-y-2">
                  {[
                    'Professional',
                    'Friendly',
                    'Motivational',
                    'Expert / Authority',
                    'Calm & Soft',
                  ].map((tone) => (
                    <button
                      key={tone}
                      onClick={() => updateData('contentTone', tone)}
                      className={`w-full px-6 py-3.5 rounded-xl font-semibold transition-all text-left ${
                        data.contentTone === tone
                          ? 'bg-[#A4D8C8] text-[#1A1A1A] shadow-pastel'
                          : 'bg-[#F6F9F8] text-[#545454] hover:bg-[#A4D8C8]/20'
                      }`}
                    >
                      {tone}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {step === 5 && (
            <div className="space-y-6">
              <h2 className="text-3xl font-extrabold text-[#1A1A1A] text-center mb-8">
                Social Presence
              </h2>

              <div>
                <label className="block text-sm font-semibold text-[#1A1A1A] mb-2">
                  Instagram Handle
                </label>
                <input
                  type="text"
                  value={data.instagramHandle}
                  onChange={(e) => updateData('instagramHandle', e.target.value)}
                  className="w-full px-4 py-3.5 bg-[#F6F9F8] border border-[#A4D8C8]/30 rounded-xl focus:outline-none focus:border-[#A4D8C8] transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#1A1A1A] mb-2">
                  YouTube Handle (optional)
                </label>
                <input
                  type="text"
                  value={data.youtubeHandle}
                  onChange={(e) => updateData('youtubeHandle', e.target.value)}
                  className="w-full px-4 py-3.5 bg-[#F6F9F8] border border-[#A4D8C8]/30 rounded-xl focus:outline-none focus:border-[#A4D8C8] transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#1A1A1A] mb-2">
                  Current Follower Count (optional)
                </label>
                <input
                  type="number"
                  value={data.followerCount}
                  onChange={(e) => updateData('followerCount', e.target.value)}
                  className="w-full px-4 py-3.5 bg-[#F6F9F8] border border-[#A4D8C8]/30 rounded-xl focus:outline-none focus:border-[#A4D8C8] transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#1A1A1A] mb-2">
                  Main Posting Platform
                </label>
                <select
                  value={data.mainPlatform}
                  onChange={(e) => updateData('mainPlatform', e.target.value)}
                  className="w-full px-4 py-3.5 bg-[#F6F9F8] border border-[#A4D8C8]/30 rounded-xl focus:outline-none focus:border-[#A4D8C8] transition-colors"
                >
                  <option value="">Select platform</option>
                  <option value="instagram">Instagram</option>
                  <option value="youtube">YouTube</option>
                  <option value="tiktok">TikTok</option>
                  <option value="facebook">Facebook</option>
                  <option value="linkedin">LinkedIn</option>
                </select>
              </div>
            </div>
          )}

          {step === 6 && (
            <div className="text-center space-y-6 py-8">
              <div className="flex justify-center mb-6">
                <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-[#A4D8C8] via-[#FFCFAE] to-[#F7E6FF] flex items-center justify-center animate-bounce-slow">
                  <CheckCircle size={48} className="text-white" strokeWidth={2} />
                </div>
              </div>

              <h2 className="text-4xl font-extrabold text-[#1A1A1A] mb-4">
                You're all set!
              </h2>

              <p className="text-xl text-[#545454] leading-relaxed max-w-md mx-auto">
                Your dashboard is ready. Your personalized content workflow is being generated.
              </p>
            </div>
          )}

          <div className="flex items-center justify-between mt-10">
            {step > 1 && step < 6 && (
              <button
                onClick={prevStep}
                className="text-[#545454] hover:text-[#1A1A1A] font-medium transition-colors"
              >
                Back
              </button>
            )}

            <button
              onClick={nextStep}
              className="ml-auto px-10 py-4 bg-[#A4D8C8] text-[#1A1A1A] font-semibold rounded-xl hover:bg-[#8fc7b5] transition-all shadow-pastel"
            >
              {step === 6 ? 'Go to Dashboard' : 'Next'}
            </button>
          </div>

          {step < 6 && (
            <p className="text-xs text-[#545454] text-center mt-6">
              Completing this helps MomentumAI personalize content for your niche.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
