import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Palette, Landmark, Users, Handshake, X, ChevronRight } from 'lucide-react';

const Services = () => {
  const [selectedService, setSelectedService] = useState(null);

  const contributions = [
    {
      id: 'cultural',
      icon: <Landmark />,
      title: 'Gestión Cultural',
      desc: 'Organización de festivales regionales y el Reinado de la Cordialidad.',
      detail: 'Lideramos la preservación de nuestras tradiciones a través del Reinado de la Cordialidad, un evento que une familias y celebra nuestra herencia gamecense con música, danza y gastronomía típica. Además, gestionamos festivales de arte que dan voz a nuevos talentos de la región.',
      img: encodeURI('/media/fotos/Danza folclórica de Gámeza.webp')
    },
    {
      id: 'artistico',
      icon: <Palette />,
      title: 'Apoyo Artístico',
      desc: 'Canalización de recursos para beneficiar a artistas y gestores locales.',
      detail: 'Brindamos asesoría técnica y financiera a los creadores de nuestra región. Desde el suministro de materiales hasta la gestión de becas estatales y patrocinios privados, nos aseguramos de que el arte en Gámeza nunca se detenga por falta de apoyo institucional.',
      img: encodeURI('/media/fotos/Campesino Artesano de Gámeza.webp')
    },
    {
      id: 'turismo',
      icon: <Users />,
      title: 'Turismo Sostenible',
      desc: 'Promoción de Gámeza como destino turístico patrimonial de clase mundial.',
      detail: 'Gámeza es un tesoro escondido. Trabajamos en la señalización de rutas hacia el Páramo de Ocetá y la capacitación de guías locales para que el turismo beneficie directamente a nuestra gente, protegingo siempre nuestro frágil ecosistema de alta montaña y la Ciudad de Piedra.',
      img: encodeURI('/media/fotos/Cañon del rio Gámeza.webp')
    },
    {
      id: 'social',
      icon: <Handshake />,
      title: 'Desarrollo Social',
      desc: 'Fomentando la solidaridad y el bienestar en el corazón de Boyacá.',
      detail: 'Creemos en la cordialidad como motor de cambio. Implementamos programas de acompañamiento para adultos mayores, comedores comunitarios y talleres de formación para jóvenes, fortaleciendo el tejido social de nuestra comunidad a través de la solidaridad directa.',
      img: encodeURI('/media/fotos/Campesinas gamecenses.webp')
    }
  ];

  return (
    <section id="labor" style={{ backgroundColor: 'var(--bg-light)' }}>
      <div className="container">
        <div className="section-title">
          <h2>Nuestra Labor</h2>
          <p>Lo que aportamos a nuestra comunidad y el legado que construimos día a día.</p>
        </div>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
          gap: '2rem',
          marginTop: '2rem'
        }}>
          {contributions.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -10, transition: { duration: 0.2, delay: 0 } }}
              onClick={() => setSelectedService(item)}
              className="contrib-card"
              style={{
                backgroundColor: 'var(--white)',
                padding: '2.5rem',
                borderRadius: 'var(--radius-md)',
                boxShadow: 'var(--shadow-sm)',
                textAlign: 'center',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              <div style={{ 
                width: '70px', 
                height: '70px', 
                backgroundColor: 'var(--bg-light)', 
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.5rem',
                color: 'var(--primary)',
                transition: 'var(--transition)',
                boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.05)'
              }} className="icon-container">
                {React.cloneElement(item.icon, { size: 32 })}
              </div>
              <h4 style={{ fontSize: '1.4rem', marginBottom: '1rem' }}>{item.title}</h4>
              <p style={{ color: 'var(--text-muted)' }}>{item.desc}</p>
              
              <motion.div 
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                style={{ marginTop: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px', color: 'var(--accent)', fontWeight: 600, fontSize: '0.9rem' }}
              >
                Conocer más <ChevronRight size={16} />
              </motion.div>

              <div style={{ 
                position: 'absolute', 
                bottom: 0, 
                left: 0, 
                width: '100%', 
                height: '4px', 
                background: 'linear-gradient(to right, var(--primary), var(--accent))',
                opacity: 0,
                transition: 'var(--transition)'
              }} className="h-line" />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal Interactivo */}
      <AnimatePresence>
        {selectedService && (
          <div className="modal-overlay" onClick={() => setSelectedService(null)}>
            <motion.div 
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 50 }}
              className="modal-content" 
              onClick={(e) => e.stopPropagation()}
            >
              <div 
                className="modal-header" 
                style={{ 
                  backgroundColor: '#000',
                  height: '350px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  overflow: 'hidden'
                }}
              >
                {/* Background blurred layer */}
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  backgroundImage: `url(${selectedService.img})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  filter: 'blur(20px) brightness(0.6)',
                  transform: 'scale(1.1)'
                }} />
                
                {/* Main image */}
                <img 
                  src={selectedService.img} 
                  alt={selectedService.title} 
                  style={{ 
                    position: 'relative',
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                    objectPosition: 'center bottom', // Move it down a bit to avoid top clip
                    padding: '30px 20px', // Extra padding at the top
                    zIndex: 2,
                    filter: selectedService.id === 'social' ? 'grayscale(0.5)' : 'none'
                  }} 
                />
                
                <button className="modal-close" onClick={() => setSelectedService(null)}>
                  <X size={20} />
                </button>
              </div>
              <div className="modal-body">
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '1rem' }}>
                    <div style={{ color: 'var(--accent)' }}>
                        {React.cloneElement(selectedService.icon, { size: 40 })}
                    </div>
                    <h3 className="modal-title">{selectedService.title}</h3>
                </div>
                <p className="modal-text">{selectedService.detail}</p>
                <button 
                    className="btn btn-primary" 
                    style={{ marginTop: '2rem', width: '100%' }}
                    onClick={() => {
                        setSelectedService(null);
                        window.dispatchEvent(new CustomEvent('open-contact-modal'));
                    }}
                >
                  Me interesa apoyar esta labor
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Services;
