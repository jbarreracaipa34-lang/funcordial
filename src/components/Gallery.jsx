import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Camera, ZoomIn } from 'lucide-react';

const photos = [
  // ── TERRITORIO (las 3 más icónicas de Gámeza) ─────────────────────────────
  {
    url: encodeURI('/media/fotos/Panorámica del casco urbano de Gámeza.webp'),
    title: 'Panorámica de Gámeza',
    desc: 'Vista aérea del casco urbano de Gámeza, la Ciudad de Piedra de Boyacá.',
    category: 'territorio',
    isImportant: true,
  },
  {
    url: encodeURI('/media/fotos/Cañon del rio Gámeza.webp'),
    title: 'Cañón del Río Gámeza',
    desc: 'Majestuoso paisaje natural que rodea nuestra tierra.',
    category: 'territorio',
    isImportant: true,
  },
  {
    url: encodeURI('/media/fotos/Templo parroquial de Gámeza.webp'),
    title: 'Templo Parroquial',
    desc: 'Símbolo de fe y patrimonio arquitectónico de Gámeza.',
    category: 'territorio',
    isImportant: true,
  },

  // ── ZOOLÓGICO DE PIEDRA (las 3 más impactantes) ───────────────────────────
  {
    url: encodeURI('/media/fotos/Zoologico de Piedra - Figura 1.webp'),
    title: 'Zoológico de Piedra — Dinosaurio',
    desc: 'Imponente dinosaurio tallado en roca, emblema del turismo gamecense.',
    category: 'turismo',
    isImportant: true,
  },
  {
    url: encodeURI('/media/fotos/Zoologico de Piedra - Figura 6 con turista.webp'),
    title: 'Zoológico de Piedra — Escala Real',
    desc: 'La magnitud de las esculturas, visible junto a una visitante.',
    category: 'turismo',
    isImportant: true,
  },
  {
    url: encodeURI('/media/fotos/Zoologico de Piedra - Figura 5.webp'),
    title: 'Zoológico de Piedra — El Águila',
    desc: 'Figura de águila pintada en roca natural, arte vivo del Zoológico de Piedra.',
    category: 'turismo',
    isImportant: true,
  },

  // ── CULTURA Y GENTE (los más representativos) ─────────────────────────────
  {
    url: encodeURI('/media/fotos/Campesinas gamecenses.webp'),
    title: 'Campesinas Gamecenses',
    desc: 'Mujeres trabajadoras, pilares de la identidad gamecense.',
    category: 'cultura',
    isImportant: true,
  },
  {
    url: encodeURI('/media/fotos/Campesino Artesano de Gámeza.webp'),
    title: 'Artesano Gamecense',
    desc: 'Manos que crean y preservan la tradición artesanal.',
    category: 'cultura',
    isImportant: true,
  },
  {
    url: encodeURI('/media/fotos/Estatua, minero de Gámeza.webp'),
    title: 'El Minero de Gámeza',
    desc: 'Monumento al trabajador, orgullo de la Ciudad de Piedra.',
    category: 'cultura',
  },

  // ── EVENTOS (los momentos más especiales) ─────────────────────────────────
  {
    url: encodeURI('/media/fotos/Danza folclórica de Gámeza.webp'),
    title: 'Danza Folclórica',
    desc: 'El movimiento que cuenta la historia de nuestro pueblo.',
    category: 'eventos',
    isImportant: true,
  },
  {
    url: encodeURI('/media/fotos/1er Concurso Regional Musica Campesina.webp'),
    title: '1er Concurso Regional de Música Campesina',
    desc: 'Primer concurso regional, escenario de talentos de toda la región.',
    category: 'eventos',
    isImportant: true,
  },
  {
    url: encodeURI('/media/fotos/Concurso de música campesina.webp'),
    title: 'Concurso de Música Campesina',
    desc: 'Talento musical que celebra nuestra herencia campesina.',
    category: 'eventos',
  },

  // ── OFICIOS ───────────────────────────────────────────────────────────────
  {
    url: encodeURI('/media/fotos/Molienda artesanal del maiz.webp'),
    title: 'Molienda Artesanal del Maíz',
    desc: 'Saberes ancestrales que perduran en nuestra cocina.',
    category: 'oficios',
    isImportant: true,
  },
  {
    url: encodeURI('/media/fotos/Campesino poeta gamecense.webp'),
    title: 'Poeta Campesino',
    desc: 'La poesía vive en los versos del campo gamecense.',
    category: 'oficios',
  },
];

const categories = [
  { id: 'all',       label: '✦ Todos' },
  { id: 'territorio', label: '🏔 Territorio' },
  { id: 'turismo',   label: '🦁 Zoológico de Piedra' },
  { id: 'cultura',   label: '🎭 Cultura y Gente' },
  { id: 'eventos',   label: '🎶 Eventos' },
  { id: 'oficios',   label: '🌽 Oficios' },
];

export default function Gallery() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [lightbox, setLightbox] = useState(null);
  const [showAllMobile, setShowAllMobile] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [hovered, setHovered] = useState(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const filtered = activeFilter === 'all'
    ? (isMobile && !showAllMobile ? photos.filter(p => p.isImportant) : photos)
    : photos.filter(p => p.category === activeFilter);

  const openLightbox = idx => setLightbox(idx);
  const closeLightbox = () => setLightbox(null);

  const prev = useCallback(() => {
    setLightbox(i => (i - 1 + filtered.length) % filtered.length);
  }, [filtered.length]);

  const next = useCallback(() => {
    setLightbox(i => (i + 1) % filtered.length);
  }, [filtered.length]);

  useEffect(() => {
    const handler = e => {
      if (lightbox === null) return;
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
      if (e.key === 'Escape') closeLightbox();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [lightbox, prev, next]);

  // Trigger entrance animation once when section scrolls into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    const el = document.getElementById('galeria');
    if (el) observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="galeria" style={{ backgroundColor: '#0d1a12', padding: '100px 0' }}>
      <div className="container">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: '3rem' }}
        >
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            background: 'rgba(212,175,55,0.15)', border: '1px solid var(--accent)',
            borderRadius: '100px', padding: '6px 18px', marginBottom: '1.5rem',
            color: 'var(--accent)', fontSize: '0.85rem', fontWeight: 700,
            letterSpacing: '2px', textTransform: 'uppercase',
          }}>
            <Camera size={14} /> Galería Fotográfica
          </div>
          <h2 style={{ color: 'white', fontSize: 'clamp(2rem, 5vw, 3.2rem)', marginBottom: '1rem' }}>
            Nuestro Territorio en <span style={{ color: 'var(--accent)', fontStyle: 'italic' }}>Imágenes</span>
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.6)', maxWidth: '600px', margin: '0 auto', fontSize: '1.1rem' }}>
            La majestuosidad de Gámeza, su gente, cultura y tradiciones, capturadas en fotografías originales de la fundación.
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          style={{
            display: 'flex', flexWrap: 'wrap', gap: '10px',
            justifyContent: 'center', marginBottom: '3rem',
          }}
        >
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => { setActiveFilter(cat.id); setHovered(null); }}
              style={{
                padding: '8px 22px',
                borderRadius: '100px',
                border: activeFilter === cat.id ? '1px solid var(--accent)' : '1px solid rgba(255,255,255,0.2)',
                background: activeFilter === cat.id ? 'var(--accent)' : 'rgba(255,255,255,0.05)',
                color: activeFilter === cat.id ? '#1a1a1a' : 'rgba(255,255,255,0.75)',
                cursor: 'pointer', fontWeight: 600, fontSize: '0.85rem',
                transition: 'background 0.25s, border-color 0.25s, color 0.25s',
                backdropFilter: 'blur(6px)',
              }}
            >
              {cat.label}
            </button>
          ))}
        </motion.div>

        {/* Masonry Grid — pure CSS columns, no Framer layout prop */}
        <div style={{ columns: 'auto 280px', columnGap: '16px' }}>
          {filtered.map((photo, idx) => (
            <div
              key={photo.url}
              style={{
                breakInside: 'avoid',
                marginBottom: '16px',
                borderRadius: '14px',
                overflow: 'hidden',
                position: 'relative',
                cursor: 'pointer',
                boxShadow: '0 4px 24px rgba(0,0,0,0.5)',
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(20px)',
                transition: `opacity 0.4s ease ${Math.min(idx * 0.05, 0.5)}s, transform 0.4s ease ${Math.min(idx * 0.05, 0.5)}s`,
              }}
              onMouseEnter={() => setHovered(idx)}
              onMouseLeave={() => setHovered(null)}
              onClick={() => openLightbox(idx)}
            >
              <div style={{ position: 'relative', overflow: 'hidden' }}>
                <img
                  src={photo.url}
                  alt={photo.title}
                  loading={idx < 4 ? 'eager' : 'lazy'}
                  fetchPriority={idx < 4 ? 'high' : 'low'}
                  decoding={idx < 4 ? 'sync' : 'async'}
                  width="600"
                  height="400"
                  style={{
                    width: '100%',
                    display: 'block',
                    objectFit: 'cover',
                    willChange: 'transform',
                    transition: 'transform 0.5s cubic-bezier(0.4,0,0.2,1), filter 0.4s ease',
                    transform: hovered === idx ? 'scale(1.07)' : 'scale(1)',
                    filter: hovered === idx ? 'brightness(0.65)' : 'brightness(0.92)',
                  }}
                />
                {/* CSS-only hover overlay — zero JS overhead */}
                <div
                  style={{
                    position: 'absolute', inset: 0,
                    background: 'linear-gradient(transparent 35%, rgba(0,0,0,0.85) 100%)',
                    display: 'flex', flexDirection: 'column',
                    justifyContent: 'flex-end', padding: '1.2rem',
                    opacity: hovered === idx ? 1 : 0,
                    transition: 'opacity 0.3s ease',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
                    <div>
                      <p style={{
                        color: 'var(--accent)', fontSize: '0.7rem', fontWeight: 700,
                        letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '4px',
                      }}>
                        {categories.find(c => c.id === photo.category)?.label.replace(/^.{2}/, '') || ''}
                      </p>
                      <h4 style={{ color: 'white', fontSize: '0.95rem', fontWeight: 700, margin: 0 }}>
                        {photo.title}
                      </h4>
                    </div>
                    <div style={{
                      width: '36px', height: '36px', borderRadius: '50%',
                      background: 'var(--accent)', display: 'flex',
                      alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                    }}>
                      <ZoomIn size={16} color="#1a1a1a" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Ver más Button for Mobile */}
        {isMobile && activeFilter === 'all' && !showAllMobile && (
          <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
            <button
              onClick={() => setShowAllMobile(true)}
              style={{
                background: 'rgba(212,175,55,0.1)',
                border: '1px solid var(--accent)',
                color: 'var(--accent)',
                padding: '12px 30px',
                borderRadius: '100px',
                cursor: 'pointer',
                fontWeight: 700,
                fontSize: '0.9rem',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'all 0.3s ease',
              }}
            >
              Ver más galerías <ChevronRight size={16} />
            </button>
          </div>
        )}

        {/* Footer count */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          style={{
            textAlign: 'center', color: 'rgba(255,255,255,0.3)',
            marginTop: '2rem', fontSize: '0.85rem',
          }}
        >
          {filtered.length} {filtered.length === 1 ? 'fotografía' : 'fotografías'} · Archivo fotográfico oficial de la Fundación
        </motion.p>
      </div>

      {/* LIGHTBOX */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={closeLightbox}
            style={{
              position: 'fixed', inset: 0,
              background: 'rgba(0,0,0,0.95)',
              backdropFilter: 'blur(14px)',
              zIndex: 9000,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          >
            <motion.div
              key={lightbox}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.28, ease: 'easeOut' }}
              onClick={e => e.stopPropagation()}
              style={{
                maxWidth: '90vw', maxHeight: '85vh',
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem',
              }}
            >
              <img
                src={filtered[lightbox].url}
                alt={filtered[lightbox].title}
                style={{
                  maxWidth: '90vw', maxHeight: '75vh',
                  objectFit: 'contain',
                  borderRadius: '12px',
                  boxShadow: '0 30px 80px rgba(0,0,0,0.8)',
                }}
              />
              <div style={{ textAlign: 'center' }}>
                <h3 style={{ color: 'var(--accent)', fontSize: '1.2rem', marginBottom: '4px' }}>
                  {filtered[lightbox].title}
                </h3>
                <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.95rem' }}>
                  {filtered[lightbox].desc}
                </p>
                <p style={{ color: 'rgba(255,255,255,0.25)', fontSize: '0.8rem', marginTop: '6px' }}>
                  {lightbox + 1} / {filtered.length}
                </p>
              </div>
            </motion.div>

            {/* Close */}
            <button
              onClick={closeLightbox}
              style={{
                position: 'fixed', top: '24px', right: '24px',
                width: '44px', height: '44px', borderRadius: '50%',
                background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)',
                color: 'white', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                backdropFilter: 'blur(8px)', zIndex: 9001,
                transition: 'background 0.2s',
              }}
            >
              <X size={20} />
            </button>

            {/* Prev */}
            <button
              onClick={e => { e.stopPropagation(); prev(); }}
              style={{
                position: 'fixed', left: '20px', top: '50%', transform: 'translateY(-50%)',
                width: '52px', height: '52px', borderRadius: '50%',
                background: 'rgba(212,175,55,0.15)', border: '1px solid var(--accent)',
                color: 'var(--accent)', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                backdropFilter: 'blur(8px)', zIndex: 9001,
                transition: 'background 0.2s',
              }}
            >
              <ChevronLeft size={26} />
            </button>

            {/* Next */}
            <button
              onClick={e => { e.stopPropagation(); next(); }}
              style={{
                position: 'fixed', right: '20px', top: '50%', transform: 'translateY(-50%)',
                width: '52px', height: '52px', borderRadius: '50%',
                background: 'rgba(212,175,55,0.15)', border: '1px solid var(--accent)',
                color: 'var(--accent)', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                backdropFilter: 'blur(8px)', zIndex: 9001,
                transition: 'background 0.2s',
              }}
            >
              <ChevronRight size={26} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
