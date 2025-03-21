import React from 'react';
import { Link } from 'react-router-dom';

const projects = [
  {
    image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    title: 'Construction Résidentielle',
    category: 'Construction',
    id: 'construction-residentielle'
  },
  {
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    title: 'Gestion Immobilière',
    category: 'Immobilier',
    id: 'gestion-immobiliere'
  },
  {
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    title: 'Design Intérieur',
    category: 'Décoration',
    id: 'design-interieur'
  }
];

const Projects: React.FC = () => {
  return (
    <section id="projects" className="py-20 bg-beige">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="section-title text-center">Nos Réalisations</h2>
        <p className="section-subtitle">
          Découvrez nos projets et réalisations
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <Link 
              key={index}
              to={`/projects/${project.id}`}
              className="group relative overflow-hidden rounded-lg shadow-lg fade-in"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <img 
                src={project.image} 
                alt={project.title}
                className="w-full h-80 object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                <div className="text-white">
                  <h3 className="text-xl font-montserrat font-semibold mb-1">{project.title}</h3>
                  <p className="text-white/80">{project.category}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;