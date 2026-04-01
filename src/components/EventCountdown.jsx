import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Star, Facebook, Music, Users, Landmark, Leaf } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const pillars = [
  {
    icon: <Landmark size={28} />,
    title: 'Patrimonio Cultural',
    desc: 'Conservación y difusión del legado histórico y arquitectónico de Gámeza.',
  },
  {
    icon: <Music size={28} />,
    title: 'Arte y Tradición',
    desc: 'Festivales, música campesina y expresiones artísticas del pueblo boyacense.',
  },
  {
    icon: <Leaf size={28} />,
    title: 'Turismo Cultural',
    desc: 'Sensibilización turística para posicionar a Gámeza como destino cultural en Boyacá.',
  },
  {
    icon: <Users size={28} />,
    title: 'Comunidad',
    desc: 'Trabajo conjunto con la Alcaldía, la academia y los jóvenes para fortalecer el tejido social.',
  },
];

const EventCountdown = () => {
  const navigate = useNavigate();

  return (
    <section
      id="evento"
      style={{
        position: 'relative',
        overflow: 'hidden',
        background: 'linear-gradient(135deg, var(--primary) 0%, #0d2a1c 60%, #1a432e 100%)',
        padding: '100px 0',
      }}
    >
      {/* Background decoration */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: `
          radial-gradient(circle at 20% 50%, rgba(212, 175, 55, 0.08) 0%, transparent 50%),
          radial-gradient(circle at 80% 20%, rgba(255,255,255,0.04) 0%, transparent 40%)
        `,
        pointerEvents: 'none',
      }} />

      {/* Gold top line */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '4px',
        background: 'linear-gradient(to right, transparent, var(--accent), transparent)',
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3 }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            background: 'rgba(212, 175, 55, 0.15)',
            border: '1px solid rgba(212, 175, 55, 0.4)',
            borderRadius: '50px',
            padding: '6px 18px',
            marginBottom: '1.5rem',
            color: 'var(--accent)',
            fontSize: '0.85rem',
            fontWeight: 600,
            letterSpacing: '1px',
          }}
        >
          <Star size={14} fill="currentColor" />
          Nuestra Agenda Cultural
        </motion.div>

        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, delay: 0.06 }}
          style={{
            color: 'white',
            fontSize: 'clamp(1.8rem, 4vw, 3rem)',
            marginBottom: '1rem',
            lineHeight: 1.2,
          }}
        >
          Eventos y Actividades
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, delay: 0.12 }}
          style={{
            color: 'rgba(255,255,255,0.65)',
            fontSize: '1.1rem',
            maxWidth: '620px',
            margin: '0 auto 1rem',
          }}
        >
          La Fundación Cultural de la Cordialidad organiza a lo largo del año eventos artísticos, culturales y sociales que celebran la identidad de Gámeza y promueven el turismo cultural en Boyacá.
        </motion.p>

        {/* Location */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, delay: 0.18 }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            marginBottom: '4rem',
            color: 'rgba(255,255,255,0.5)',
            fontSize: '0.95rem',
          }}
        >
          <MapPin size={16} style={{ color: 'var(--accent)' }} />
          Gámeza, Boyacá · Colombia
        </motion.div>

        {/* Pillars grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '1.5rem',
          marginBottom: '3.5rem',
          textAlign: 'left',
        }}>
          {pillars.map(({ icon, title, desc }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.06 }}
              style={{
                background: 'rgba(255,255,255,0.07)',
                border: '1px solid rgba(255,255,255,0.12)',
                borderRadius: '16px',
                padding: '1.8rem',
                backdropFilter: 'blur(8px)',
              }}
            >
              <div style={{
                color: 'var(--accent)',
                marginBottom: '1rem',
                width: '52px',
                height: '52px',
                background: 'rgba(212,175,55,0.15)',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                {icon}
              </div>
              <h4 style={{ color: 'white', fontSize: '1.05rem', marginBottom: '0.5rem', fontWeight: 700 }}>{title}</h4>
              <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.88rem', lineHeight: '1.6', margin: 0 }}>{desc}</p>
            </motion.div>
          ))}
        </div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, delay: 0.25 }}
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '1.5rem',
            flexWrap: 'wrap'
          }}
        >
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(212,175,55,0.4)', transition: { duration: 0.2, delay: 0 } }}
            style={{
              background: 'linear-gradient(135deg, var(--accent), #c49f32)',
              color: 'var(--primary)',
              border: 'none',
              borderRadius: '50px',
              padding: '1rem 2.5rem',
              fontSize: '1rem',
              fontWeight: 700,
              cursor: 'pointer',
              letterSpacing: '0.5px',
            }}
            onClick={() => window.dispatchEvent(new CustomEvent('open-contact-modal'))}
          >
            Participar / Colaborar
          </motion.button>

          <motion.button
            onClick={() => navigate('/eventos')}
            whileHover={{ scale: 1.05, transition: { duration: 0.2, delay: 0 } }}
            style={{
              background: 'rgba(255,255,255,0.1)',
              color: 'white',
              border: '1px solid rgba(255,255,255,0.3)',
              borderRadius: '50px',
              padding: '1rem 2.5rem',
              fontSize: '1rem',
              fontWeight: 600,
              cursor: 'pointer',
              backdropFilter: 'blur(5px)',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <Facebook size={18} /> Ver publicaciones en Facebook
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default EventCountdown;
