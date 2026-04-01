import React from 'react';
import { motion } from 'framer-motion';
import { Target, Eye } from 'lucide-react';

const About = () => {
  const cards = [
    {
      title: 'Nuestra Misión',
      icon: <Target className="text-accent" size={40} />,
      text: 'Promover, proteger y difundir la identidad cultural, las tradiciones y el patrimonio de Gámeza y Boyacá mediante eventos artísticos, la participación comunitaria y el apoyo al talento local, fomentando siempre un espíritu de cordialidad y solidaridad.'
    },
    {
      title: 'Nuestra Visión',
      icon: <Eye className="text-accent" size={40} />,
      text: 'Ser la institución cultural líder en Boyacá que fortalezca el tejido social a través del turismo cultural y patrimonial, convirtiendo a Gámeza en un referente de solidaridad comunitaria y conservación de tradiciones para las futuras generaciones.'
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
