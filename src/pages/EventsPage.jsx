import React, { useState, useEffect } from 'react';
import { motion as m } from 'framer-motion';
import { 
  Calendar, 
  Facebook, 
  ArrowLeft,
  ExternalLink,
} from 'lucide-react';
import { Link } from 'react-router-dom';

const FB_PAGE_URL = 'https://www.facebook.com/profile.php?id=100064098697041';

const EventsPage = () => {
  const [isSdkLoaded, setIsSdkLoaded] = useState(false);

  useEffect(() => {
    // 1. Load Facebook SDK
    const loadFB = () => {
      if (window.FB) {
        setIsSdkLoaded(true);
        window.FB.XFBML.parse();
        return;
      }

      window.fbAsyncInit = function() {
        window.FB.init({
          xfbml: true,
          version: 'v18.0'
        });
        setIsSdkLoaded(true);
        window.FB.XFBML.parse();
      };

      (function(d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s); js.id = id;
        js.src = "https://connect.facebook.net/es_LA/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
      }(document, 'script', 'facebook-jssdk'));
    };

    loadFB();
  }, []);

  // Re-parse when SDK is ready
  useEffect(() => {
    if (isSdkLoaded && window.FB) {
      window.FB.XFBML.parse();
    }
  }, [isSdkLoaded]);

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

            {/* Facebook Page Plugin using SDK */}
            <div style={{ 
              padding: '1.5rem', 
              backgroundColor: '#f7f8fa',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '1rem',
              minHeight: '600px'
            }}>
              <div id="fb-root"></div>
              <div 
                className="fb-page" 
                data-href={FB_PAGE_URL}
                data-tabs="timeline" 
                data-width="500" 
                data-height="800" 
                data-small-header="false" 
                data-adapt-container-width="true" 
                data-hide-cover="false" 
                data-show-facepile="true"
              >
                <blockquote cite={FB_PAGE_URL} className="fb-xfbml-parse-ignore">
                  <a href={FB_PAGE_URL}>Fundación Cultural de la Cordialidad</a>
                </blockquote>
              </div>

              {/* Minimalist fallback hint */}
              <div style={{ 
                marginTop: '1.5rem',
                padding: '1rem',
                borderTop: '1px solid #e4e6eb',
                width: '100%',
                textAlign: 'center'
              }}>
                <p style={{ fontSize: '0.82rem', color: '#8a8d91', marginBottom: '0.8rem' }}>
                  ¿No puedes ver el contenido? Probablemente tu navegador está bloqueando el plugin oficial de Facebook.
                </p>
                <a 
                  href={FB_PAGE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    backgroundColor: '#1877F2',
                    color: 'white',
                    padding: '8px 20px',
                    borderRadius: '6px',
                    fontWeight: 700,
                    fontSize: '0.9rem',
                    textDecoration: 'none',
                  }}
                >
                  <ExternalLink size={16} /> Ver en Facebook
                </a>
              </div>
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
                  href={FB_PAGE_URL} 
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
