import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChefHat, Leaf } from 'lucide-react';

const dishes = [
  {
    url: encodeURI('/media/fotos/AREPAS. Gastronomía gamecense.webp'),
    name: 'Arepas Gamecenses',
    description:
      'El maíz transformado en arte culinario. Las arepas gamecenses, hechas a mano con maíz cultivado en las laderas de nuestra cordillera, son el desayuno del alma.',
    tag: 'Desayuno del pueblo',
    emoji: '🌽',
  },
  {
    url: encodeURI('/media/fotos/ENVUELTOS_ Gastronomía gamecense.webp'),
    name: 'Envueltos de Maíz',
    description:
      'Envueltos en hoja de plátano y cocinados al vapor, estos bocados ancestrales condensan siglos de tradición campesina y el sabor inconfundible de nuestra tierra.',
    tag: 'Tradición ancestral',
    emoji: '🍃',
  },
  {
    url: encodeURI('/media/fotos/RUBAS. Gastronomia gamecense.webp'),
    name: 'Rubas',
    description:
      'Tubérculo andino de colores vivos y sabor único. Las rubas gamecenses, cultivadas a gran altitud, son protagonistas de nuestra cocina de montaña desde tiempos precolombinos.',
    tag: 'Tubérculo andino',
    emoji: '🌈',
  },
  {
    url: encodeURI('/media/fotos/SOPA DE RUYAS_ Gastronomía.webp'),
    name: 'Sopa de Ruyas',
    description:
      'El plato que calienta el alma en las tardes frías de la cordillera. Una sopa espesa con rubas, papa criolla y hierbas del páramo: la memoria líquida de Gámeza.',
    tag: 'Plato de la cordillera',
    emoji: '🍲',
  },
];

export default function Gastronomy() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % dishes.length);
    }, 10000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="gastronomia" style={{
      background: 'linear-gradient(135deg, #0f2318 0%, #1a432e 50%, #0f2318 100%)',
      padding: '100px 0',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Decorative blobs */}
      <div style={{
        position: 'absolute', top: '-80px', right: '-80px',
        width: '400px', height: '400px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(212,175,55,0.1) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', bottom: '-60px', left: '-60px',
        width: '300px', height: '300px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(212,175,55,0.08) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div className="container">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ textAlign: 'center', marginBottom: '4rem' }}
        >
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            background: 'rgba(212,175,55,0.15)', border: '1px solid var(--accent)',
            borderRadius: '100px', padding: '6px 18px', marginBottom: '1.5rem',
            color: 'var(--accent)', fontSize: '0.85rem', fontWeight: 700,
            letterSpacing: '2px', textTransform: 'uppercase',
          }}>
            <ChefHat size={14} /> Gastronomía Típica
          </div>
          <h2 style={{ color: 'white', fontSize: 'clamp(2rem, 5vw, 3.2rem)', marginBottom: '1rem' }}>
            Sabores que <span style={{ color: 'var(--accent)', fontStyle: 'italic' }}>Cuentan Historias</span>
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.6)', maxWidth: '600px', margin: '0 auto', fontSize: '1.1rem' }}>
            La cocina gamecense es un viaje sensorial a la montaña boyacense. Cada receta es un legado vivo, transmitido de generación en generación.
          </p>
        </motion.div>

        {/* Main Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.45, ease: 'easeInOut' }}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '0',
              borderRadius: '24px',
              overflow: 'hidden',
              boxShadow: '0 40px 80px rgba(0,0,0,0.6)',
            }}
          >
            {/* Photo */}
            <div style={{ position: 'relative', minHeight: '420px', overflow: 'hidden', willChange: 'transform' }}>
              <motion.img
                key={dishes[active].url}
                src={dishes[active].url}
                alt={dishes[active].name}
                decoding="async"
                initial={{ scale: 1.05, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                style={{
                  width: '100%', height: '100%',
                  objectFit: 'cover',
                  position: 'absolute', inset: 0,
                  willChange: 'transform, opacity'
                }}
              />
              {/* Tag badge */}
              <div style={{
                position: 'absolute', top: '20px', left: '20px',
                background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)',
                border: '1px solid rgba(212,175,55,0.4)',
                borderRadius: '100px', padding: '6px 14px',
                color: 'var(--accent)', fontSize: '0.75rem', fontWeight: 700,
                letterSpacing: '1px', textTransform: 'uppercase',
                zIndex: 2
              }}>
                {dishes[active].tag}
              </div>
            </div>

            {/* Info */}
            <div style={{
              background: 'rgba(15,35,24,0.95)',
              backdropFilter: 'blur(12px)',
              padding: 'clamp(2rem, 5vw, 4rem)',
              display: 'flex', flexDirection: 'column',
              justifyContent: 'center', gap: '1.5rem',
              borderLeft: '1px solid rgba(212,175,55,0.15)',
            }}>
              <div style={{
                width: '52px', height: '52px', borderRadius: '16px',
                background: 'rgba(212,175,55,0.15)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '1.6rem',
              }}>
                {dishes[active].emoji}
              </div>

              <div>
                <p style={{
                  color: 'var(--accent)', fontSize: '0.75rem', fontWeight: 700,
                  letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '8px',
                }}>
                  Gastronomía Gamecense
                </p>
                <h3 style={{ color: 'white', fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', marginBottom: '1rem' }}>
                  {dishes[active].name}
                </h3>
                <p style={{ color: 'rgba(255,255,255,0.65)', lineHeight: 1.9, fontSize: '1.05rem' }}>
                  {dishes[active].description}
                </p>
              </div>

              <div style={{
                display: 'flex', alignItems: 'center', gap: '10px',
                borderTop: '1px solid rgba(255,255,255,0.08)',
                paddingTop: '1.5rem',
              }}>
                <div style={{
                  width: '36px', height: '36px', borderRadius: '50%',
                  background: 'rgba(212,175,55,0.1)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <Leaf size={16} color="var(--accent)" />
                </div>
                <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.85rem' }}>
                  Archivo de Recetas · Fundación Cultural de la Cordialidad
                </p>
              </div>

              {/* Dots */}
              <div style={{ display: 'flex', gap: '8px' }}>
                {dishes.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActive(i)}
                    style={{
                      width: i === active ? '28px' : '8px',
                      height: '8px',
                      borderRadius: '100px',
                      background: i === active ? 'var(--accent)' : 'rgba(255,255,255,0.2)',
                      border: 'none', cursor: 'pointer',
                      transition: 'all 0.4s ease',
                    }}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
