import React from 'react';
import { Instagram, Linkedin, Building2 } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="text-xl font-montserrat font-bold mb-4">BATIMO<span className="text-sage">ENTREPRISE</span></h3>
            <p className="text-gray-600">
              Une équipe jeune, dynamique et professionnelle pour vous écouter, vous comprendre et construire ensemble votre projet.
            </p>
          </div>
          
          <div>
            <h4 className="font-montserrat font-semibold mb-4">Nos Valeurs</h4>
            <ul className="grid grid-cols-2 gap-2">
              <li className="text-gray-600">Respect</li>
              <li className="text-gray-600">Sérieux</li>
              <li className="text-gray-600">Confiance</li>
              <li className="text-gray-600">Disponibilité</li>
              <li className="text-gray-600">Qualité</li>
              <li className="text-gray-600">Communication</li>
              <li className="text-gray-600">Progrès</li>
              <li className="text-gray-600">Modernité</li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-montserrat font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-gray-600">
              <li>Lot 04 Cité APIX,</li>
              <li>Médinatoul Mounawara</li>
              <li>Tél: 78 660 49 49</li>
              <li>batimoentreprise@gmail.com</li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-montserrat font-semibold mb-4">Navigation</h4>
            <ul className="space-y-2">
              <li><a href="#home" className="text-gray-600 hover:text-sage">Accueil</a></li>
              <li><a href="#services" className="text-gray-600 hover:text-sage">Services</a></li>
              <li><a href="#projects" className="text-gray-600 hover:text-sage">Réalisations</a></li>
              <li><a href="#contact" className="text-gray-600 hover:text-sage">Contact</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm mb-4 md:mb-0">
              © 2024 Batimo Entreprise Sarl. Tous droits réservés.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-600 hover:text-sage transition-colors">
                <Instagram size={24} />
              </a>
              <a href="#" className="text-gray-600 hover:text-sage transition-colors">
                <Linkedin size={24} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;