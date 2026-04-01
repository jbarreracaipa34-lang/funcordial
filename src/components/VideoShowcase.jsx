import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX, Maximize, Video } from 'lucide-react';

const videos = [
  {
    url: encodeURI('/media/videos/Sonido de las campanas de Gameza.mp4'),
    title: 'Las Campanas de Gámeza',
    subtitle: 'El sonido que marca el tiempo en nuestra Ciudad de Piedra',
    description:
      'El repique de las campanas del templo parroquial ha acompañado la vida de los gamecenses por generaciones. Un sonido que convoca, que une, que recuerda.',
    tag: 'Patrimonio Sonoro',
    icon: '🔔',
  },
  {
    url: encodeURI('/media/videos/Resumen Festival Funcordial Short.mp4'),
    title: 'Festival Cultural (Resumen)',
    subtitle: 'Los mejores momentos de nuestra celebración',
    description:
      'Un resumen dinámico de 2 minutos por lo más destacado del Festival Cultural. Música, danza y alegría que reafirman nuestro orgullo gamecense.',
    tag: 'Highlights del Festival',
    icon: '🎭',
  },
];

export default function VideoShowcase() {
  const [activeVid, setActiveVid] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const videoRef = useRef(null);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (playing) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setPlaying(p => !p);
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !muted;
    setMuted(m => !m);
  };

  const fullscreen = () => {
    if (videoRef.current?.requestFullscreen) videoRef.current.requestFullscreen();
  };

  const switchVideo = (i) => {
    setActiveVid(i);
    setPlaying(false);
  };

  return (
    <section id="videos" style={{
      background: '#060e0a',
      padding: '100px 0',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Ambient glow */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '700px', height: '400px',
        background: 'radial-gradient(ellipse, rgba(26,67,46,0.3) 0%, transparent 70%)',
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
            <Video size={14} /> Registro en Video
          </div>
          <h2 style={{ color: 'white', fontSize: 'clamp(2rem, 5vw, 3.2rem)', marginBottom: '1rem' }}>
            Gámeza en <span style={{ color: 'var(--accent)', fontStyle: 'italic' }}>Movimiento</span>
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.55)', maxWidth: '600px', margin: '0 auto', fontSize: '1.05rem' }}>
            Dos piezas audiovisuales que capturan la esencia, los sonidos y la vida de nuestra Ciudad de Piedra.
          </p>
        </motion.div>

        {/* Video Selector Tabs */}
        <div style={{
          display: 'flex', gap: '16px', justifyContent: 'center',
          marginBottom: '3rem', flexWrap: 'wrap',
        }}>
          {videos.map((v, i) => (
            <motion.button
              key={v.title}
              onClick={() => switchVideo(i)}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              style={{
                padding: '12px 28px',
                borderRadius: '14px',
                border: activeVid === i ? '1px solid var(--accent)' : '1px solid rgba(255,255,255,0.1)',
                background: activeVid === i ? 'rgba(212,175,55,0.12)' : 'rgba(255,255,255,0.03)',
                color: activeVid === i ? 'var(--accent)' : 'rgba(255,255,255,0.5)',
                cursor: 'pointer', fontWeight: 700, fontSize: '0.9rem',
                transition: 'all 0.3s ease',
                display: 'flex', alignItems: 'center', gap: '10px',
              }}
            >
              <span style={{ fontSize: '1.2rem' }}>{v.icon}</span>
              {v.title}
            </motion.button>
          ))}
        </div>

        {/* Video Player + Info */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeVid}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '0',
              borderRadius: '24px',
              overflow: 'hidden',
              border: '1px solid rgba(212,175,55,0.15)',
              boxShadow: '0 40px 80px rgba(0,0,0,0.7)',
            }}
          >
            {/* Player */}
            <div style={{ position: 'relative', background: '#000', minHeight: '360px', overflow: 'hidden' }}>
              <video
                ref={videoRef}
                key={videos[activeVid].url}
                src={videos[activeVid].url}
                muted={muted}
                loop
                playsInline
                preload="metadata"
                onEnded={() => setPlaying(false)}
                style={{
                  width: '100%', height: '100%',
                  objectFit: 'cover', display: 'block',
                  minHeight: '360px',
                }}
              />

              {/* Play Overlay (shown when paused) */}
              {!playing && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  style={{
                    position: 'absolute', inset: 0,
                    background: 'linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.5))',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    cursor: 'pointer',
                  }}
                  onClick={togglePlay}
                >
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    style={{
                      width: '72px', height: '72px', borderRadius: '50%',
                      background: 'var(--accent)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      boxShadow: '0 0 40px rgba(212,175,55,0.5)',
                    }}
                  >
                    <Play size={28} color="#1a1a1a" fill="#1a1a1a" style={{ marginLeft: '4px' }} />
                  </motion.div>
                </motion.div>
              )}

              {/* Controls Bar */}
              <div style={{
                position: 'absolute', bottom: 0, left: 0, right: 0,
                padding: '16px 20px',
                background: 'linear-gradient(transparent, rgba(0,0,0,0.8))',
                display: 'flex', alignItems: 'center', gap: '12px',
              }}>
                <button
                  onClick={togglePlay}
                  style={{
                    width: '36px', height: '36px', borderRadius: '50%',
                    background: 'rgba(212,175,55,0.2)', border: '1px solid var(--accent)',
                    color: 'var(--accent)', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}
                >
                  {playing ? <Pause size={16} /> : <Play size={16} />}
                </button>
                <button
                  onClick={toggleMute}
                  style={{
                    width: '36px', height: '36px', borderRadius: '50%',
                    background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)',
                    color: 'white', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}
                >
                  {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                </button>
                <div style={{ flex: 1 }} />
                <button
                  onClick={fullscreen}
                  style={{
                    width: '36px', height: '36px', borderRadius: '50%',
                    background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)',
                    color: 'white', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}
                >
                  <Maximize size={16} />
                </button>
              </div>

              {/* Tag */}
              <div style={{
                position: 'absolute', top: '16px', left: '16px',
                background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)',
                border: '1px solid rgba(212,175,55,0.4)',
                borderRadius: '100px', padding: '5px 14px',
                color: 'var(--accent)', fontSize: '0.72rem', fontWeight: 700,
                letterSpacing: '1px', textTransform: 'uppercase',
              }}>
                {videos[activeVid].tag}
              </div>
            </div>

            {/* Info Panel */}
            <div style={{
              background: 'rgba(10,22,16,0.98)',
              backdropFilter: 'blur(12px)',
              padding: 'clamp(2rem, 5vw, 4rem)',
              display: 'flex', flexDirection: 'column',
              justifyContent: 'center', gap: '1.6rem',
              borderLeft: '1px solid rgba(212,175,55,0.12)',
            }}>
              <span style={{ fontSize: '2.5rem' }}>{videos[activeVid].icon}</span>

              <div>
                <p style={{
                  color: 'var(--accent)', fontSize: '0.72rem', fontWeight: 700,
                  letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '8px',
                }}>
                  {videos[activeVid].tag}
                </p>
                <h3 style={{ color: 'white', fontSize: 'clamp(1.4rem, 3vw, 2rem)', marginBottom: '0.5rem' }}>
                  {videos[activeVid].title}
                </h3>
                <p style={{ color: 'var(--accent)', fontSize: '0.95rem', fontStyle: 'italic', marginBottom: '1.2rem' }}>
                  {videos[activeVid].subtitle}
                </p>
                <p style={{ color: 'rgba(255,255,255,0.6)', lineHeight: 1.9, fontSize: '1rem' }}>
                  {videos[activeVid].description}
                </p>
              </div>

              <motion.button
                whileHover={{ scale: 1.03, boxShadow: '0 0 20px rgba(212,175,55,0.3)' }}
                whileTap={{ scale: 0.97 }}
                onClick={togglePlay}
                style={{
                  alignSelf: 'flex-start',
                  padding: '12px 28px',
                  borderRadius: '100px',
                  background: playing
                    ? 'rgba(255,255,255,0.1)'
                    : 'var(--accent)',
                  border: playing ? '1px solid rgba(255,255,255,0.2)' : 'none',
                  color: playing ? 'white' : '#1a1a1a',
                  cursor: 'pointer',
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  display: 'flex', alignItems: 'center', gap: '8px',
                  transition: 'all 0.3s ease',
                }}
              >
                {playing ? <Pause size={16} /> : <Play size={16} />}
                {playing ? 'Pausar Video' : 'Reproducir'}
              </motion.button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
