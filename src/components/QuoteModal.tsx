import React, { useState } from 'react';
import { X } from 'lucide-react';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const QuoteModal: React.FC<QuoteModalProps> = ({ isOpen, onClose }) => {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      projectType: formData.get('projectType'),
      budget: formData.get('budget'),
      message: formData.get('description')
    };

    try {
      const response = await fetch('http://localhost:3000/api/quote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Erreur réseau');
      }

      setStatus('success');
      setTimeout(() => {
        setStatus('idle');
        onClose();
      }, 3000);
    } catch (error) {
      console.error('Erreur:', error);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" onClick={onClose}></div>

        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

        <div className="relative inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
          <div className="absolute top-0 right-0 pt-4 pr-4">
            <button
              type="button"
              className="text-gray-400 hover:text-gray-500"
              onClick={onClose}
            >
              <X size={24} />
            </button>
          </div>

          <div className="sm:flex sm:items-start">
            <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
              <h3 className="text-2xl leading-6 font-montserrat font-bold text-gray-900 mb-6" id="modal-title">
                Demande de devis
              </h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Votre nom"
                  required
                  className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-sage focus:border-transparent"
                />
                
                <input
                  type="email"
                  name="email"
                  placeholder="Votre email"
                  required
                  className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-sage focus:border-transparent"
                />
                
                <input
                  type="tel"
                  name="phone"
                  placeholder="Votre téléphone"
                  required
                  className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-sage focus:border-transparent"
                />

                <select
                  name="projectType"
                  required
                  className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-sage focus:border-transparent"
                >
                  <option value="">Type de projet</option>
                  <option value="construction">Construction neuve</option>
                  <option value="renovation">Rénovation</option>
                  <option value="decoration">Décoration intérieure</option>
                  <option value="gestion">Gestion immobilière</option>
                </select>

                <select
                  name="budget"
                  required
                  className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-sage focus:border-transparent"
                >
                  <option value="">Budget estimé (FCFA)</option>
                  <option value="moins-5m">Moins de 5 millions</option>
                  <option value="5m-10m">5 - 10 millions</option>
                  <option value="10m-20m">10 - 20 millions</option>
                  <option value="plus-20m">Plus de 20 millions</option>
                </select>

                <textarea
                  name="description"
                  placeholder="Description de votre projet"
                  rows={4}
                  required
                  className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-sage focus:border-transparent"
                ></textarea>

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className={`btn-primary w-full relative ${status === 'loading' ? 'opacity-75' : ''}`}
                >
                  {status === 'loading' ? 'Envoi en cours...' : 'Envoyer'}
                </button>

                {status === 'success' && (
                  <div className="text-green-600 font-medium mt-2 text-center">
                    Votre demande de devis a été envoyée avec succès !
                  </div>
                )}
                
                {status === 'error' && (
                  <div className="text-red-600 font-medium mt-2 text-center">
                    Une erreur est survenue. Veuillez réessayer.
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuoteModal;