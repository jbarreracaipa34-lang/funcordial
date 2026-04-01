import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronRight } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('inicio');
  
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Detect active section on home page
      if (location.pathname === '/') {
        const sections = ['inicio', 'nosotros', 'labor', 'gastronomia', 'galeria', 'evento'];
        const current = sections.find(section => {
          const element = document.getElementById(section);
          if (element) {
            const rect = element.getBoundingClientRect();
            return rect.top <= 150 && rect.bottom >= 150;
          }
          return false;
        });
        if (current) setActiveSection(current);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location]);

  const navLinks = [
    { name: 'Inicio', target: 'inicio' },
    { name: 'Nosotros', target: 'nosotros' },
    { name: 'Labor', target: 'labor' },
    { name: 'Galería', target: 'gastronomia' },
    { name: 'Eventos', target: 'evento' },
  ];

  const handleNavClick = (e, target) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);

    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(target);
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const element = document.getElementById(target);
      if (element) element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1000,
      backgroundColor: isScrolled || location.pathname !== '/' ? 'rgba(26, 67, 46, 0.98)' : 'rgba(26, 67, 46, 0.5)',
      boxShadow: isScrolled ? '0 4px 20px rgba(0,0,0,0.1)' : 'none',
      height: isScrolled ? '70px' : '90px',
      transition: 'all 0.4s ease',
      display: 'flex',
      alignItems: 'center',
      backdropFilter: 'blur(10px)'
    }}>
      <div className="container" style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%'
      }}>
        {/* Logo */}
        <Link to="/" onClick={() => window.scrollTo(0,0)} style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
          <img src="/assets/logo.jpg" alt="Logo" style={{ height: isScrolled ? '35px' : '45px', transition: 'all 0.4s' }} />
          <div>
            <span style={{ display: 'block', color: 'white', fontWeight: 800, fontSize: isScrolled ? '1.1rem' : '1.3rem', lineHeight: 1, letterSpacing: '1px' }}>FUNCORDIAL</span>
            <span style={{ display: 'block', color: 'var(--accent)', fontSize: '0.65rem', fontWeight: 600, letterSpacing: '1.5px', marginTop: '2px' }}>FUNDACIÓN CULTURAL</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav style={{ display: 'flex', gap: '30px', listStyle: 'none', margin: 0, padding: 0 }} className="desktop-nav">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={`#${link.target}`}
              onClick={(e) => handleNavClick(e, link.target)}
              style={{
                color: activeSection === link.target && location.pathname === '/' ? 'var(--accent)' : 'white',
                textDecoration: 'none',
                fontSize: '0.95rem',
                fontWeight: 600,
                opacity: activeSection === link.target && location.pathname === '/' ? 1 : 0.8,
                transition: 'var(--transition)',
                position: 'relative'
              }}
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          style={{
            display: 'none',
            background: 'none',
            border: 'none',
            color: 'white',
            cursor: 'pointer'
          }}
          className="mobile-toggle"
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            style={{
              position: 'fixed',
              top: '70px',
              left: 0,
              right: 0,
              backgroundColor: 'rgba(26, 67, 46, 0.98)',
              padding: '2rem',
              borderTop: '1px solid rgba(255,255,255,0.1)',
              zIndex: 999
            }}
          >
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {navLinks.map((link) => (
                <li key={link.name} style={{ marginBottom: '1.5rem' }}>
                  <a
                    href={`#${link.target}`}
                    onClick={(e) => handleNavClick(e, link.target)}
                    style={{
                      color: 'white',
                      textDecoration: 'none',
                      fontSize: '1.2rem',
                      fontWeight: 600,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}
                  >
                    {link.name} <ChevronRight size={18} className="text-accent" />
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 992px) {
          .desktop-nav { display: none !important; }
          .mobile-toggle { display: block !important; }
        }
      `}</style>
    </header>
  );
};

export default Header;
