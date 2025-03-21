import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  isMenuOpen: boolean;
  setIsMenuOpen: (isOpen: boolean) => void;
}

const Navbar: React.FC<NavbarProps> = ({ isMenuOpen, setIsMenuOpen }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/90 backdrop-blur-sm shadow-sm' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex-shrink-0">
            <Link
              to="/"
              className={`text-2xl font-montserrat font-bold transition-colors duration-300 ${
                isScrolled ? 'text-gray-900' : 'text-white'
              }`}
            >
              BATIMO<span className="text-sage">ENTREPRISE</span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#home" className={`nav-link ${isScrolled ? 'text-gray-700' : 'text-white'}`}>Accueil</a>
            <a href="#about" className={`nav-link ${isScrolled ? 'text-gray-700' : 'text-white'}`}>À Propos</a>
            <a href="#services" className={`nav-link ${isScrolled ? 'text-gray-700' : 'text-white'}`}>Services</a>
            <a href="#projects" className={`nav-link ${isScrolled ? 'text-gray-700' : 'text-white'}`}>Projets</a>
            <button onClick={scrollToContact} className="btn-primary">Contactez-nous</button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`p-2 rounded-md transition-colors duration-300 ${
                isScrolled ? 'text-gray-700' : 'text-white'
              }`}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white">
            <a href="#home" className="block px-3 py-2 nav-link">Accueil</a>
            <a href="#about" className="block px-3 py-2 nav-link">À Propos</a>
            <a href="#services" className="block px-3 py-2 nav-link">Services</a>
            <a href="#projects" className="block px-3 py-2 nav-link">Projets</a>
            <button onClick={scrollToContact} className="w-full mt-4 btn-primary">Contactez-nous</button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;