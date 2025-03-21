import React from 'react';
import { Paintbrush, Building2, Truck, Home } from 'lucide-react';
import { Link } from 'react-router-dom';

const services = [
  {
    icon: <Home size={32} className="text-white" />,
    title: 'Construction',
    description: 'La construction d\'un bâtiment est un processus délicat et rigoureux qui nécessite une connaissance approfondie. Notre équipe d\'experts assure une approche méthodique pour chaque étape.',
    bgImage: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    id: 'construction'
  },
  {
    icon: <Paintbrush size={32} className="text-white" />,
    title: 'Décoration intérieur',
    description: 'Nous vous accompagnons et créons pour vous des collections tendance aux styles variés pour embellir votre maison. Chaque espace mérite d\'être une œuvre d\'art fonctionnelle.',
    bgImage: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    id: 'decoration'
  },
  {
    icon: <Building2 size={32} className="text-white" />,
    title: 'Gestion Immobilière',
    description: 'Solutions complètes pour propriétaires et investisseurs, de la conception des projets jusqu\'à la gestion quotidienne des biens immobiliers.',
    bgImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    id: 'gestion'
  },
  {
    icon: <Truck size={32} className="text-white" />,
    title: 'Transport Logistique',
    description: 'Gestion efficace des ressources et des flux de matériaux pour une organisation performante du chantier, optimisant les coûts et réduisant l\'impact environnemental.',
    bgImage: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    id: 'transport'
  }
];

const Services: React.FC = () => {
  return (
    <section id="services" className="py-0 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="section-title text-center">Nos Services</h2>
        <p className="section-subtitle">
          Une expertise complète en construction et gestion immobilière
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          {services.map((service, index) => (
            <Link 
              key={index}
              to={`/services/${service.id}`}
              className="relative group overflow-hidden rounded-xl h-[400px] fade-in cursor-pointer"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                style={{ 
                  backgroundImage: `url('${service.bgImage}')`,
                }}
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/70 to-black/20 opacity-80 group-hover:opacity-90 transition-opacity duration-500" />
              
              <div className="relative h-full p-8 flex flex-col justify-end text-white transform transition-transform duration-500 group-hover:translate-y-[-10px]">
                <div className="mb-4 transform transition-all duration-500 group-hover:scale-110 group-hover:translate-y-[-10px]">
                  {service.icon}
                </div>
                <h3 className="text-2xl font-montserrat font-semibold mb-4 transform transition-transform duration-500 group-hover:translate-y-[-10px]">
                  {service.title}
                </h3>
                <p className="text-white/90 text-base leading-relaxed transform transition-all duration-500 opacity-80 group-hover:opacity-100 group-hover:translate-y-[-5px]">
                  {service.description}
                </p>
                
                <div className="mt-6 transform transition-all duration-500 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100">
                  <span className="text-sage hover:text-white transition-colors duration-300 flex items-center gap-2 text-sm font-semibold">
                    En savoir plus
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </div>
              </div>
              
              <div className="absolute inset-0 border-2 border-transparent transition-all duration-500 group-hover:border-sage/30 rounded-xl" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;