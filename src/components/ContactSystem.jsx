import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Mail, X, Send, User, AtSign, Type, CheckCircle2, Loader2 } from 'lucide-react';
import emailjs from '@emailjs/browser';

// CONFIGURACIÓN DE EMAILJS
const EMAILJS_SERVICE_ID = 'service_9azqgbm';
const EMAILJS_TEMPLATE_ID = 'template_4cre9za';
const EMAILJS_PUBLIC_KEY = 'KzpICECKJIJ1oOI0W';

const ContactSystem = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isEmailOpen, setIsEmailOpen] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'quiero mas información',
    message: ''
  });

  React.useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener('open-contact-modal', handleOpen);
    return () => window.removeEventListener('open-contact-modal', handleOpen);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSending(true);

    // Los nombres de estas claves deben coincidir con tu plantilla de EmailJS
    const templateParams = {
      name: formData.name,       // {{name}} en tu captura
      email: formData.email,     // {{email}} en tu captura
      title: formData.subject,    // {{title}} en tu captura
      message: formData.message,  // {{message}} en tu captura
    };

    try {
      // PLAN A: Envío silencioso y profesional vía EmailJS
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        EMAILJS_PUBLIC_KEY
      );

      setIsSending(false);
      setIsSent(true);

      // Limpiamos y cerramos después del éxito
      setTimeout(() => {
        setIsSent(false);
        setIsEmailOpen(false);
        setIsOpen(false);
        setFormData({ name: '', email: '', subject: 'quiero mas información', message: '' });
      }, 3000);

    } catch (error) {
      console.warn('EmailJS falló o no está configurado, usando Plan B (Mailto):', error);
      
      // PLAN B: El Salvador, Si falla lo anterior, abre el correo local
      const { name, email, subject, message } = formData;
      const recipient = 'funcordial2020@gmail.com'; 
      const body = `Nombre: ${name}\nEmail: ${email}\n\nMensaje:\n${message}`;
      const mailtoLink = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      
      window.location.href = mailtoLink;
      
      setIsSending(false);
      setIsSent(true); // Mostramos éxito igualmente porque el mailto ya se disparó

      setTimeout(() => {
        setIsSent(false);
        setIsEmailOpen(false);
        setIsOpen(false);
        setFormData({ name: '', email: '', subject: 'quiero mas información', message: '' });
      }, 2000);
    }
  };

  const contactOptions = [
    {
      name: 'WhatsApp',
      icon: <MessageCircle size={28} />,
      color: '#25D366',
      desc: 'Conversa con nosotros directamente.',
      action: () => {
        const phone = '573112714804';
        const text = encodeURIComponent('Hola Fundacion Cultural de la Cordialidad, quisiera obtener más información para colaborar con donaciones o eventos.');
        window.open(`https://wa.me/${phone}?text=${text}`, '_blank');
      }
    },
    {
      name: 'E-mail',
      icon: <Mail size={28} />,
      color: '#EA4335',
      desc: 'Envíanos una propuesta o mensaje formal.',
      action: () => {
        setIsEmailOpen(true);
      }
    }
  ];

  return (
    <>
      {/* Botón de Acción Flotante (FAB) */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        style={{
          position: 'fixed',
          bottom: '30px',
          right: '30px',
          zIndex: 999,
          width: '65px',
          height: '65px',
          borderRadius: '50%',
          background: 'var(--primary)',
          color: 'white',
          border: 'none',
          boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <motion.div
           animate={{ rotate: [0, 10, -10, 0] }}
           transition={{ duration: 2, repeat: Infinity }}
        >
          <MessageCircle size={32} />
        </motion.div>
      </motion.button>

      {/* Modal de Contacto Principal */}
      <AnimatePresence>
        {isOpen && !isEmailOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="modal-overlay"
              style={{ zIndex: 1001 }}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 100 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 100 }}
              style={{
                position: 'fixed',
                bottom: '110px',
                right: '30px',
                width: '350px',
                backgroundColor: 'white',
                borderRadius: 'var(--radius-lg)',
                padding: '2rem',
                boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
                zIndex: 1002,
                border: '1px solid #eee'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h3 style={{ margin: 0, fontSize: '1.5rem' }}>Contáctanos</h3>
                <button 
                  onClick={() => setIsOpen(false)}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}
                >
                  <X size={24} />
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {contactOptions.map((opt) => (
                  <motion.div
                    key={opt.name}
                    whileHover={{ x: 5, backgroundColor: '#f9f9f9' }}
                    onClick={() => {
                        opt.action();
                    }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1rem',
                      padding: '1rem',
                      borderRadius: 'var(--radius-md)',
                      cursor: 'pointer',
                      border: '1px solid #f0f0f0',
                      transition: 'var(--transition)'
                    }}
                  >
                    <div style={{
                      color: opt.color,
                      backgroundColor: `${opt.color}15`,
                      padding: '10px',
                      borderRadius: '12px',
                      display: 'flex'
                    }}>
                      {opt.icon}
                    </div>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '1.1rem' }}>{opt.name}</div>
                      <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{opt.desc}</div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div style={{ marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid #eee' }}>
                 <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textAlign: 'center' }}>
                    Estamos listos para escucharte y trabajar juntos por nuestra cultura.
                 </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Popup de Envío de Email */}
      <AnimatePresence>
        {isEmailOpen && (
          <div className="email-modal-overlay" onClick={() => setIsEmailOpen(false)}>
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="email-modal-container" 
              onClick={(e) => e.stopPropagation()}
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem', marginBottom: '1.5rem' }}>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem', margin: 0 }}>
                  <Mail size={20} /> Enviar Email
                </h2>
              </div>

              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', position: 'relative' }}>
                <AnimatePresence>
                  {isSent && (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      style={{
                        position: 'absolute',
                        inset: -10,
                        background: 'rgba(255,255,255,0.95)',
                        zIndex: 20,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        textAlign: 'center',
                        gap: '1rem'
                      }}
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', damping: 10 }}
                      >
                        <CheckCircle2 size={60} color="var(--primary)" />
                      </motion.div>
                      <h3 style={{ margin: 0 }}>¡Mensaje Enviado!</h3>
                      <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                        Gracias por escribirnos. Nos pondremos en contacto contigo pronto.
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="form-group">
                  <label className="form-label" htmlFor="name">Nombre *</label>
                  <input 
                    className="form-input" 
                    id="name" 
                    name="name"
                    required 
                    placeholder="Tu nombre completo" 
                    type="text" 
                    value={formData.name}
                    onChange={handleChange}
                    disabled={isSending}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="email">Email *</label>
                  <input 
                    className="form-input" 
                    id="email" 
                    name="email"
                    required 
                    placeholder="tu@email.com" 
                    type="email" 
                    value={formData.email}
                    onChange={handleChange}
                    disabled={isSending}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="subject">Asunto *</label>
                  <input 
                    className="form-input" 
                    id="subject" 
                    name="subject"
                    required 
                    placeholder="Asunto del mensaje" 
                    type="text" 
                    value={formData.subject}
                    onChange={handleChange}
                    disabled={isSending}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="message">Mensaje *</label>
                  <textarea 
                    className="form-textarea" 
                    id="message" 
                    name="message"
                    required 
                    placeholder="Escribe tu mensaje aquí..." 
                    rows="4"
                    value={formData.message}
                    onChange={handleChange}
                    disabled={isSending}
                  />
                </div>

                <div className="form-actions">
                  <button 
                    type="button" 
                    className="btn-form btn-cancel"
                    onClick={() => setIsEmailOpen(false)}
                    disabled={isSending}
                  >
                    <X size={18} /> Cancelar
                  </button>
                  <button 
                    type="submit" 
                    className="btn-form btn-submit"
                    disabled={isSending}
                    style={{ opacity: isSending ? 0.7 : 1 }}
                  >
                    {isSending ? (
                      <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }}>
                        <Loader2 size={18} />
                      </motion.div>
                    ) : (
                      <Send size={18} />
                    )}
                    {isSending ? 'Enviando...' : 'Enviar Email'}
                  </button>
                </div>
              </form>

              <button 
                type="button" 
                onClick={() => setIsEmailOpen(false)}
                style={{
                  position: 'absolute',
                  top: '1rem',
                  right: '1rem',
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  color: 'var(--text-muted)',
                  opacity: 0.7,
                  transition: '0.2s'
                }}
              >
                <X size={18} />
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ContactSystem;
