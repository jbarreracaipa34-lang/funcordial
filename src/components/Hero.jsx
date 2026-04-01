import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, MapPin } from 'lucide-react';

const heroBgs = [
  encodeURI('/media/fotos/Panorámica del casco urbano de Gámeza.webp'),
  encodeURI('/media/fotos/Cañon del rio Gámeza.webp'),
  encodeURI('/media/fotos/Templo parroquial de Gámeza.webp'),
];

const Hero = () => {
  const [bgIndex, setBgIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setBgIndex(i => (i + 1) % heroBgs.length), 7000);
    return () => clearInterval(t);
  }, []);

  return (
    <section id="inicio" className="hero-section" style={{ 
      height: '100vh',
      width: '100%',
      position: 'relative',
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      color: 'white',
      padding: '100px 0 0' // Added padding top to account for header
    }}>
      {/* Fondo con crossfade entre fotos reales */}
      <AnimatePresence mode="popLayout">
        <motion.div
          key={bgIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "linear" }}
          style={{
            position: 'absolute',
            top: 0, left: 0,
            width: '100%', height: '100%',
            backgroundImage: `linear-gradient(rgba(0,0,0,0.35), rgba(0,0,0,0.6)), url("${heroBgs[bgIndex]}")`,
            backgroundSize: 'cover',
            backgroundPosition: 'center 20%',
            zIndex: 0,
            willChange: 'opacity'
          }}
        />
      </AnimatePresence>

      {/* Prefetching hidden image for next background index */}
      <img 
        src={heroBgs[(bgIndex + 1) % heroBgs.length]} 
        alt="" 
        style={{ display: 'none' }} 
        aria-hidden="true"
      />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div style={{ 
            display: 'inline-flex', 
            alignItems: 'center', 
            gap: '8px', 
            backgroundColor: 'rgba(212, 175, 55, 0.2)', 
            padding: '8px 16px', 
            borderRadius: '100px',
            border: '1px solid var(--accent)',
            marginBottom: '2rem',
            color: 'var(--accent-light)',
            fontSize: '0.9rem',
            fontWeight: 600
          }}>
            <MapPin size={16} /> Gámeza, Boyacá - Ciudad de Piedra
          </div>
          
          <h1 style={{ 
            fontSize: 'clamp(3rem, 10vw, 5.5rem)', 
            color: 'white', 
            marginBottom: '1.5rem',
            textShadow: '0 4px 12px rgba(0,0,0,0.3)'
          }}>
            Gámeza: <span className="text-accent" style={{ fontStyle: 'italic' }}>Donde la Cultura</span> <br />
            y la Cordialidad se Encuentran
          </h1>
          
          <p style={{ 
            fontSize: '1.4rem', 
            maxWidth: '800px', 
            margin: '0 auto 3rem',
            opacity: 0.9,
            fontWeight: 300
          }}>
            Promoviendo la cultura y el bienestar social en el corazón de los Colombianos. 
            Donde la cordialidad se hace arte y el arte se hace comunidad.
          </p>

          <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center' }}>
            <motion.button 
              onClick={() => document.getElementById('labor')?.scrollIntoView({ behavior: 'smooth' })}
              whileHover={{ x: 5, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="btn btn-primary"
              style={{ 
                fontSize: '1.1rem', 
                padding: '1rem 2.5rem', 
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '10px'
              }}
            >
              Nuestra Labor <ArrowRight size={20} />
            </motion.button>
            <motion.button 
              onClick={() => document.getElementById('nosotros')?.scrollIntoView({ behavior: 'smooth' })}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="btn glass"
              style={{ 
                fontSize: '1.1rem', 
                padding: '1rem 2.5rem', 
                color: 'white',
                border: '1px solid rgba(255,255,255,0.3)',
                cursor: 'pointer',
                backgroundColor: 'rgba(255,255,255,0.1)'
              }}
            >
              Conócenos
            </motion.button>
          </div>
        </motion.div>
      </div>

      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        style={{ position: 'absolute', bottom: '2rem', left: '50.5%', transform: 'translateX(-50%)', opacity: 0.7, zIndex: 1 }}
      >
        <div style={{ width: '2px', height: '60px', background: 'white' }} />
      </motion.div>
    </section>
  );
};

export default Hero;
