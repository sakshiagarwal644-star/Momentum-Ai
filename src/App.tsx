import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ValueStrip from './components/ValueStrip';
import HowItWorks from './components/HowItWorks';
import Features from './components/Features';
import UIMockups from './components/UIMockups';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import SignupCTA from './components/SignupCTA';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <ValueStrip />
      <HowItWorks />
      <Features />
      <UIMockups />
      <Testimonials />
      <FAQ />
      <SignupCTA />
      <Footer />
    </div>
  );
}

export default App;
