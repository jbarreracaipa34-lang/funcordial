import React from 'react';
import { motion } from 'framer-motion';
import { Target, Eye } from 'lucide-react';

const About = () => {
  const cards = [
    {
      title: 'Nuestra Misión',
      icon: <Target className="text-accent" size={40} />,
      text: 'Somos la Fundación Cultural de la Cordialidad, FUNCORDIAL, una organización sin ánimo de lucro comprometida con el mejoramiento de la calidad de vida de la comunidad de Gámeza, Boyacá. Promovemos e incentivamos las actividades artísticas, culturales, turísticas, agropecuarias y ambientales del municipio mediante escuelas de formación artística para niños, jóvenes y adultos; la organización de eventos y festivales culturales; la recuperación del patrimonio gastronómico y cultural ancestral; y la ejecución de proyectos de desarrollo sostenible — construyendo tejido social desde la cordialidad y el arte como motor de transformación comunitaria.'
    },
    {
      title: 'Nuestra Visión',
      icon: <Eye className="text-accent" size={40} />,
      text: 'Para 2030, la Fundación Cultural de la Cordialidad, FUNCORDIAL, será reconocida a nivel regional y nacional como el principal motor de desarrollo cultural, artístico y turístico del municipio de Gámeza, posicionando a la Ciudad de Piedra como un referente del patrimonio boyacense. A través de alianzas estratégicas con entidades públicas, privadas y organismos internacionales, habremos consolidado una comunidad artística activa, preservado nuestra gastronomía e identidad ancestral, e impulsado el empleo local con proyectos sostenibles que dignifiquen la vida de nuestros habitantes.'
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
