export default function Testimonials() {
  const testimonials = [
    {
      quote: "MomentumAI cut my content time from 4 hours to 10 minutes.",
      author: "Sarah M.",
      role: "Business Coach",
    },
    {
      quote: "I finally have time to focus on my clients.",
      author: "Michael K.",
      role: "Life Coach",
    },
  ];

  return (
    <section className="py-24 px-6 lg:px-8 bg-[#F6F9F8]">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl p-10 shadow-pastel"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#A4D8C8] to-[#B4C7E7]"></div>
                <div>
                  <div className="font-extrabold text-[#1A1A1A]">{testimonial.author}</div>
                  <div className="text-sm text-[#545454]">{testimonial.role}</div>
                </div>
              </div>

              <p className="text-xl text-[#1A1A1A] leading-relaxed italic">
                "{testimonial.quote}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
