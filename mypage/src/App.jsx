import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Nav from "./components/Nav";
import MainContent from "./components/MainContent";
import Footer from "./components/Footer";
import "./App.css";

function App() {
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Handle scroll event to show/hide "Back to Top" button
  useEffect(() => {
    const handleScroll = () => {
      if (
        document.body.scrollTop > 100 ||
        document.documentElement.scrollTop > 100
      ) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll to top smoothly
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="app">
      <Header />
      <Nav />
      <MainContent />
      <Footer />
      {/* Back to Top Button */}
      <button
        id="back-to-top"
        onClick={scrollToTop}
        style={{ display: showBackToTop ? "block" : "none" }}
      >
        Back to Top
      </button>
    </div>
  );
}

export default App;