export default function SignupCTA() {
  return (
    <section className="py-24 px-6 lg:px-8 gradient-mint-lavender">
      <div className="max-w-4xl mx-auto text-center space-y-8">
        <h2 className="text-4xl lg:text-5xl font-extrabold text-[#1A1A1A] leading-tight">
          Start creating content that drives real momentum.
        </h2>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button className="px-10 py-5 bg-white text-[#1A1A1A] font-semibold rounded-2xl hover:bg-[#F6F9F8] transition-all shadow-pastel-lg text-lg">
            Sign Up for Free Trial
          </button>
          <a
            href="#login"
            className="text-[#1A1A1A] font-medium hover:underline"
          >
            Already have an account? Login
          </a>
        </div>
      </div>
    </section>
  );
}
