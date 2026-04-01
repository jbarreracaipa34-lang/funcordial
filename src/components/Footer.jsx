import React from 'react';
import { Mail, MapPin, Phone, Facebook, Instagram, Twitter, ExternalLink, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Footer = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleNavClick = (e, target) => {
    e.preventDefault();
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

  const socialLinks = [
    { icon: Facebook, href: 'https://www.facebook.com/profile.php?id=100064098697041' },
  ];

  const currentYear = new Date().getFullYear();

  return (
    <footer style={{ backgroundColor: 'var(--primary)', color: 'white', padding: '80px 0 30px', borderTop: '5px solid var(--accent)' }}>
      <div className="container" style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
        gap: '4rem',
        marginBottom: '60px'
      }}>
        {/* Logo and About */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '1.5rem' }}>
            <img src="/assets/logo.jpg" alt="Logo" style={{ height: '50px' }} />
            <span style={{ fontSize: '1.5rem', fontWeight: 800, letterSpacing: '1px' }}>FUNCORDIAL</span>
          </div>
          <p style={{ opacity: 0.8, lineHeight: '1.8', marginBottom: '2rem' }}>
            Trabajando por la preservación de nuestra cultura y el fortalecimiento del tejido social en Gámeza y Boyacá.
          </p>
          <div style={{ display: 'flex', gap: '15px' }}>
            {socialLinks.map(({ icon: Icon, href }, idx) => (
              <motion.a 
                key={idx}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -5, color: 'var(--accent)' }}
                style={{ 
                  width: '40px', 
                  height: '40px', 
                  backgroundColor: 'rgba(255,255,255,0.1)', 
                  borderRadius: '50%', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  color: 'white',
                  textDecoration: 'none',
                  transition: '0.3s'
                }}
              >
                <Icon size={20} />
              </motion.a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
           <h4 style={{ color: 'var(--accent)', marginBottom: '1.5rem', fontSize: '1.2rem' }}>Enlaces Rápidos</h4>
           <ul style={{ listStyle: 'none', padding: 0 }}>
              {[
                { name: 'Inicio', target: 'inicio' },
                { name: 'Nosotros', target: 'nosotros' },
                { name: 'Labor', target: 'labor' },
                { name: 'Evento', href: '/#/eventos' },
                { name: 'Galería', target: 'gastronomia' }
              ].map((link) => (
                <li key={link.name} style={{ marginBottom: '1rem' }}>
                  {link.target ? (
                    <button 
                      onClick={(e) => handleNavClick(e, link.target)}
                      style={{ 
                        background: 'none', 
                        border: 'none', 
                        color: 'white', 
                        padding: 0,
                        cursor: 'pointer',
                        fontSize: '1rem',
                        opacity: 0.8,
                        transition: 'var(--transition)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        textAlign: 'left'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
                      onMouseLeave={(e) => e.currentTarget.style.opacity = '0.8'}
                    >
                      <ChevronRight size={14} className="text-accent" /> {link.name}
                    </button>
                  ) : (
                    <a 
                      href={link.href}
                      style={{ 
                        color: 'white', 
                        textDecoration: 'none', 
                        opacity: 0.8, 
                        transition: 'var(--transition)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
                      onMouseLeave={(e) => e.currentTarget.style.opacity = '0.8'}
                    >
                      <ChevronRight size={14} className="text-accent" /> {link.name}
                    </a>
                  )}
                </li>
              ))}
           </ul>
        </div>

        {/* Contact Info */}
        <div>
           <h4 style={{ color: 'var(--accent)', marginBottom: '1.5rem', fontSize: '1.2rem' }}>Contacto</h4>
           <ul style={{ listStyle: 'none', padding: 0 }}>
              <li style={{ display: 'flex', gap: '12px', marginBottom: '1.2rem', opacity: 0.8 }}>
                <MapPin size={20} className="text-accent" style={{ flexShrink: 0 }} />
                <span>Gámeza, Boyacá / Colombia</span>
              </li>
              <li style={{ display: 'flex', gap: '12px', marginBottom: '1.2rem', opacity: 0.8 }}>
                <Mail size={20} className="text-accent" style={{ flexShrink: 0 }} />
                <span style={{ wordBreak: 'break-all' }}>funcordial2020@gmail.com</span>
              </li>
              <li style={{ display: 'flex', gap: '12px', marginBottom: '1.2rem', opacity: 0.8 }}>
                <Phone size={20} className="text-accent" style={{ flexShrink: 0 }} />
                <span>+57 311 271 4804</span>
              </li>
           </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div style={{ 
        paddingTop: '30px', 
        borderTop: '1px solid rgba(255,255,255,0.1)', 
        textAlign: 'center',
        fontSize: '0.9rem',
        opacity: 0.6
      }}>
        <p>© {currentYear} FUNCORDIAL - Fundación Cultural de la Cordialidad. Hecho en Sena-Boyacá.</p>
      </div>
    </footer>
  );
};

export default Footer;
