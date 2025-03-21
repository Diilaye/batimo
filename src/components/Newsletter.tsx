import React, { useState } from 'react';
import toast from 'react-hot-toast';

const Newsletter: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const response = await fetch('http://localhost:3000/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Erreur réseau');

      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
      toast.success('Message envoyé avec succès !');
      setTimeout(() => setStatus('idle'), 3000);
    } catch (error) {
      console.error('Erreur:', error);
      setStatus('error');
      toast.error('Une erreur est survenue. Veuillez réessayer.');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <section id="contact" className="py-20 bg-beige">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="section-title">Contactez-nous</h2>
        <p className="section-subtitle">
          Au moment de lancer votre projet de construction ou de réhabilitation, n'hésitez pas à nous contacter.
        </p>
        
        <form onSubmit={handleSubmit} className="mt-8 max-w-md mx-auto">
          <div className="space-y-4">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Votre nom"
              className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-sage focus:border-transparent"
              required
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Votre email"
              className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-sage focus:border-transparent"
              required
            />
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Votre message"
              rows={4}
              className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-sage focus:border-transparent"
              required
            ></textarea>
            <button
              type="submit"
              disabled={status === 'loading'}
              className={`btn-primary w-full relative ${status === 'loading' ? 'opacity-75' : ''}`}
            >
              {status === 'loading' ? 'Envoi en cours...' : 'Envoyer'}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Newsletter;