import React from 'react';
import { motion } from 'framer-motion';
import { Target, Eye } from 'lucide-react';

const About = () => {
  const cards = [
    {
      title: 'Nuestra Misión',
      icon: <Target className="text-accent" size={40} />,
      text: 'Promover e incentivar las actividades artísticas, culturales, turísticas y ambientales de Gámeza, Boyacá, fortaleciendo el tejido social mediante la formación artística, los festivales culturales, la recuperación del patrimonio ancestral y proyectos de desarrollo sostenible para el bienestar de nuestra comunidad.'
    },
    {
      title: 'Nuestra Visión',
      icon: <Eye className="text-accent" size={40} />,
      text: 'Ser la organización cultural líder de Boyacá, reconocida por preservar el patrimonio de Gámeza, impulsar el turismo cultural y posicionar a la Ciudad de Piedra como referente artístico y natural, a través de la cordialidad y el desarrollo comunitario sostenible.'
    }
  ];

  return (
    <section id="nosotros" style={{ backgroundColor: 'var(--white)' }}>
      <div className="container">
        <div className="section-title">
          <h2>Quiénes Somos</h2>
          <p>Un equipo comprometido con el legado de nuestros ancestros y el futuro de nuestra tierra.</p>
        </div>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', 
          gap: '3rem',
          marginTop: '2rem'
        }}>
          {cards.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ y: -10, transition: { duration: 0.2, delay: 0 } }}
              className="glass"
              style={{
                padding: '3rem',
                borderRadius: 'var(--radius-lg)',
                borderLeft: '4px solid var(--accent)',
                backgroundColor: 'var(--bg-light)',
                boxShadow: 'var(--shadow-md)'
              }}
            >
              <div style={{ marginBottom: '1.5rem' }}>{card.icon}</div>
              <h3 style={{ fontSize: '2rem', marginBottom: '1.2rem' }}>{card.title}</h3>
              <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', lineHeight: '1.8' }}>
                {card.text}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
