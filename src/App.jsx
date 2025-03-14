import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FloatingElements from "./components/FloatingElements";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import LegalSection from "./components/LegalSection";
import Navbar from "./components/Navbar";
import ParallaxSection from "./components/ParallaxSection";
import PhotoGuide from "./pages/PhotoGuide";
import "./index.css";
import EnhancedPhotoBoothExperience from "./pages/EnhancedPhotoBoothExperience";

const Home = () => (
  <>
    <Hero />
    <Navbar />
    <FloatingElements />
    <ParallaxSection />
    <LegalSection />
    <Footer />
  </>
);

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/photo-guide" element={<PhotoGuide />} />
      <Route path="/experience" element={<EnhancedPhotoBoothExperience />} />
    </Routes>
  );
}

export default App;
