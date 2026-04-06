import React, { useState } from 'react';
import { motion as m } from 'framer-motion';
import { 
  Calendar, 
  Facebook, 
  ArrowLeft, 
} from 'lucide-react';
import { Link } from 'react-router-dom';

const FB_PAGE_URL = 'https://www.facebook.com/profile.php?id=100064098697041';

// Direct iframe src — no SDK needed, loads immediately
const FB_IFRAME_SRC = `https://www.facebook.com/plugins/page.php?href=${encodeURIComponent(FB_PAGE_URL)}&tabs=timeline&width=500&height=800&small_header=true&adapt_container_width=true&hide_cover=false&show_facepile=false&locale=es_LA`;

const EventsPage = () => {
  const [iframeLoaded, setIframeLoaded] = useState(false);

  return (
    <div style={{ paddingTop: '5px', minHeight: '100vh', backgroundColor: '#f0f2f5' }}>
      {/* Header Banner */}
      <section style={{ 
        padding: '40px 0', 
        background: 'var(--primary)',
        color: 'white',
        borderBottom: '4px solid var(--accent)'
      }}>
        <div className="container">
          <m.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '20px' }}
          >
            <div>
              <h1 style={{ fontSize: '2.5rem', margin: 0, fontWeight: 800 }}>Muro Cultural</h1>
              <p style={{ margin: '5px 0 0 0', opacity: 0.8, fontSize: '1.1rem' }}>
                Publicaciones y eventos de la Fundación Cultural de la Cordialidad
              </p>
            </div>
          </m.div>
        </div>
      </section>

      <div className="container" style={{ padding: '60px 0' }}>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'minmax(0, 1fr) 340px', 
          gap: '2.5rem',
          alignItems: 'start'
        }} className="events-grid">
          
          {/* Facebook Embed */}
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{
              backgroundColor: 'white',
              borderRadius: 'var(--radius-lg)',
              boxShadow: 'var(--shadow-lg)',
              overflow: 'hidden',
              border: '1px solid rgba(0,0,0,0.08)',
            }}
          >
            {/* Embed header */}
            <div style={{ 
              padding: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              gap: '15px',
              borderBottom: '1px solid #f0f2f5'
            }}>
              <div style={{ 
                width: '50px', height: '50px', 
                backgroundColor: '#1877F2', borderRadius: '50%',
                display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white'
              }}>
                <Facebook size={24} fill="currentColor" />
              </div>
              <div>
                <h2 style={{ fontSize: '1.4rem', margin: 0 }}>Fundación Cultural de la Cordialidad</h2>
                <p style={{ color: 'var(--text-muted)', margin: 0, fontSize: '0.9rem' }}>
                  Publicaciones directas desde Facebook
                </p>
              </div>
            </div>

            {/* The actual Facebook embed — direct iframe, no SDK delay */}
            <div style={{ 
              padding: '1.5rem', 
              backgroundColor: '#f7f8fa',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '1.5rem'
            }}>
              <div style={{ 
                width: '100%',
                maxWidth: '500px',
                borderRadius: '8px',
                overflow: 'hidden',
                boxShadow: 'var(--shadow-sm)',
                position: 'relative',
                minHeight: '800px',
              }}>
                {/* Skeleton loader — visible until iframe fires onLoad */}
                {!iframeLoaded && (
                  <div style={{
                    position: 'absolute', inset: 0,
                    backgroundColor: '#e4e6eb',
                    borderRadius: '8px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px',
                    padding: '20px',
                    zIndex: 1,
                  }}>
                    {[120, 80, 100, 60, 90, 70].map((w, i) => (
                      <div key={i} style={{
                        height: '16px',
                        width: `${w}%`,
                        backgroundColor: '#cdd0d5',
                        borderRadius: '8px',
                        animation: 'shimmer 1.4s ease-in-out infinite alternate',
                        animationDelay: `${i * 0.15}s`,
                        maxWidth: '100%',
                      }} />
                    ))}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '8px' }}>
                      <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#cdd0d5', animation: 'shimmer 1.4s ease-in-out infinite alternate' }} />
                      <div style={{ flex: 1 }}>
                        <div style={{ height: '12px', width: '50%', backgroundColor: '#cdd0d5', borderRadius: '6px', marginBottom: '6px', animation: 'shimmer 1.4s ease-in-out infinite alternate' }} />
                        <div style={{ height: '10px', width: '30%', backgroundColor: '#cdd0d5', borderRadius: '6px', animation: 'shimmer 1.4s ease-in-out infinite alternate' }} />
                      </div>
                    </div>
                    <p style={{ color: '#8a8d91', fontSize: '0.8rem', textAlign: 'center', marginTop: 'auto' }}>
                      Cargando publicaciones de Facebook...
                    </p>
                  </div>
                )}

                {/* Direct iframe — much faster than SDK */}
                <iframe
                  src={FB_IFRAME_SRC}
                  width="500"
                  height="800"
                  style={{
                    border: 'none',
                    overflow: 'hidden',
                    width: '100%',
                    height: '800px',
                    display: 'block',
                    opacity: iframeLoaded ? 1 : 0,
                    transition: 'opacity 0.5s ease',
                  }}
                  scrolling="no"
                  frameBorder="0"
                  allowFullScreen
                  allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                  onLoad={() => {
                    // Wait 3s after iframe loads — FB's JS inside still needs time to render posts
                    setTimeout(() => setIframeLoaded(true), 3000);
                  }}
                  title="FUNCORDIAL en Facebook"
                />
              </div>

              {/* Fallback note */}
              <p style={{ 
                fontSize: '0.82rem', 
                color: '#8a8d91', 
                textAlign: 'center',
                maxWidth: '400px',
                lineHeight: '1.5'
              }}>
                Si el contenido no carga, puede ser por un bloqueador de anuncios. 
                Visita directamente nuestra página en Facebook ↓
              </p>

              <a 
                href="https://www.facebook.com/profile.php?id=100064098697041"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  backgroundColor: '#1877F2',
                  color: 'white',
                  padding: '10px 24px',
                  borderRadius: '6px',
                  fontWeight: 700,
                  fontSize: '0.95rem',
                  textDecoration: 'none',
                }}
              >
                <Facebook size={18} fill="currentColor" /> Abrir en Facebook
              </a>
            </div>
          </m.div>

          {/* Sidebar */}
          <aside className="events-sidebar">
            <m.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              style={{
                backgroundColor: 'white',
                borderRadius: 'var(--radius-lg)',
                padding: '2rem',
                boxShadow: 'var(--shadow-md)',
                position: 'sticky',
                top: '100px'
              }}
            >
              <h3 style={{ fontSize: '1.2rem', marginBottom: '1.2rem', color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Calendar size={20} className="text-accent" /> Sobre la Fundación
              </h3>
              <p style={{ fontSize: '0.92rem', color: '#65676b', lineHeight: '1.65', marginBottom: '1.8rem' }}>
                La Fundación Cultural de la Cordialidad organiza eventos culturales, artísticos y sociales en Gámeza, Boyacá. Seguinos en Facebook para ver todos los eventos en tiempo real.
              </p>

              <div style={{ 
                backgroundColor: 'var(--bg-light)', 
                padding: '1.2rem', 
                borderRadius: 'var(--radius-md)',
                marginBottom: '1.5rem'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1rem' }}>
                  <div style={{ width: '38px', height: '38px', borderRadius: '50%', overflow: 'hidden', border: '2px solid var(--accent)' }}>
                    <img src="/assets/logo.jpg" style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="Logo" />
                  </div>
                  <div>
                    <span style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700 }}>Funcordial</span>
                    <span style={{ fontSize: '0.75rem', color: '#65676b' }}>Comunidad en Facebook</span>
                  </div>
                </div>
                <a 
                  href="https://www.facebook.com/profile.php?id=100064098697041" 
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    backgroundColor: '#1877F2',
                    color: 'white',
                    padding: '9px',
                    borderRadius: 'var(--radius-sm)',
                    textDecoration: 'none',
                    fontWeight: 700,
                    fontSize: '0.88rem'
                  }}
                >
                  <Facebook size={16} fill="currentColor" /> Seguir
                </a>
              </div>

              <Link 
                to="/" 
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  color: 'var(--primary)',
                  textDecoration: 'none',
                  fontWeight: 700,
                  padding: '12px',
                  border: '2px solid var(--primary)',
                  borderRadius: 'var(--radius-md)',
                  justifyContent: 'center',
                  transition: 'var(--transition)'
                }}
                className="back-btn"
              >
                <ArrowLeft size={18} /> Volver al Inicio
              </Link>
            </m.div>
          </aside>
        </div>
      </div>

      <style>{`
        @media (max-width: 992px) {
          .events-grid { grid-template-columns: 1fr !important; }
          .events-sidebar { display: none; }
        }
        .back-btn:hover { background-color: var(--primary); color: white !important; }
      `}</style>
    </div>
  );
};

export default EventsPage;
