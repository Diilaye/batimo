import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, MapPin, User, X, ChevronLeft, ChevronRight, ImageOff } from 'lucide-react';

interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  client: string;
  location: string;
  date: string;
  mainImage: string;
  gallery: string[];
  features: string[];
  testimonial?: {
    text: string;
    author: string;
    role: string;
  };
}

const projectsData: Record<string, Project> = {
  'construction-residentielle': {
    id: 'construction-residentielle',
    title: 'Construction Résidentielle',
    category: 'Construction',
    description: 'Un projet de construction résidentielle moderne combinant esthétique contemporaine et fonctionnalité. Cette réalisation illustre notre capacité à créer des espaces de vie exceptionnels.',
    client: 'M. et Mme Diop',
    location: 'Dakar, Sénégal',
    date: 'Janvier 2024',
    mainImage: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1600566752355-35792bedcfea?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
      'https://images.unsplash.com/photo-1600573472550-8090b5e0745e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80'
    ],
    features: [
      'Architecture moderne',
      'Matériaux écologiques',
      'Optimisation énergétique',
      'Espaces personnalisés',
      'Finitions haut de gamme'
    ],
    testimonial: {
      text: 'BATIMO a transformé notre vision en réalité. Leur professionnalisme et leur attention aux détails ont dépassé nos attentes.',
      author: 'Fatou Diop',
      role: 'Propriétaire'
    }
  },
  'gestion-immobiliere': {
    id: 'gestion-immobiliere',
    title: 'Gestion Immobilière',
    category: 'Immobilier',
    description: 'Un projet de gestion immobilière complexe démontrant notre expertise dans l\'optimisation et la valorisation de patrimoine immobilier.',
    client: 'Groupe Immobilier XYZ',
    location: 'Saint-Louis, Sénégal',
    date: 'Mars 2024',
    mainImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
      'https://images.unsplash.com/photo-1562664377-709f2c337eb2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
      'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80'
    ],
    features: [
      'Gestion locative complète',
      'Maintenance préventive',
      'Optimisation des revenus',
      'Reporting détaillé',
      'Service client premium'
    ]
  },
  'design-interieur': {
    id: 'design-interieur',
    title: 'Design Intérieur',
    category: 'Décoration',
    description: 'Un projet de design intérieur alliant élégance et fonctionnalité, créant des espaces de vie uniques et personnalisés.',
    client: 'Restaurant Le Baobab',
    location: 'Dakar, Sénégal',
    date: 'Février 2024',
    mainImage: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
      'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
      'https://images.unsplash.com/photo-1615873968403-89e068629265?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80'
    ],
    features: [
      'Design sur mesure',
      'Mobilier personnalisé',
      'Éclairage innovant',
      'Matériaux nobles',
      'Harmonie des espaces'
    ],
    testimonial: {
      text: 'Le résultat final est spectaculaire. BATIMO a su capturer l\'essence de notre vision tout en apportant leur expertise unique.',
      author: 'Amadou Sow',
      role: 'Directeur du Restaurant'
    }
  }
};

interface ImageModalProps {
  images: string[];
  currentIndex: number;
  onClose: () => void;
  onPrevious: () => void;
  onNext: () => void;
}

const ImageModal: React.FC<ImageModalProps> = ({ images, currentIndex, onClose, onPrevious, onNext }) => {
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
      >
        <X size={32} />
      </button>
      
      <button
        onClick={onPrevious}
        className="absolute left-4 text-white hover:text-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={currentIndex === 0}
      >
        <ChevronLeft size={48} />
      </button>

      {imageError ? (
        <div className="flex flex-col items-center text-white">
          <ImageOff size={48} />
          <p className="mt-4">Image non disponible</p>
        </div>
      ) : (
        <img
          src={images[currentIndex]}
          alt={`Image ${currentIndex + 1}`}
          className="max-h-[90vh] max-w-[90vw] object-contain"
          onError={handleImageError}
        />
      )}

      <button
        onClick={onNext}
        className="absolute right-4 text-white hover:text-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={currentIndex === images.length - 1}
      >
        <ChevronRight size={48} />
      </button>

      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white">
        {currentIndex + 1} / {images.length}
      </div>
    </div>
  );
};

const ProjectDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const project = id ? projectsData[id] : null;
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [mainImageError, setMainImageError] = useState(false);
  const [galleryErrors, setGalleryErrors] = useState<boolean[]>([]);

  React.useEffect(() => {
    if (project) {
      setGalleryErrors(new Array(project.gallery.length).fill(false));
    }
  }, [project]);

  if (!project) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Projet non trouvé</h2>
          <Link to="/" className="mt-4 text-sage hover:text-sage/80 inline-flex items-center">
            <ArrowLeft className="mr-2" size={20} />
            Retour à l'accueil
          </Link>
        </div>
      </div>
    );
  }

  const handlePreviousImage = () => {
    if (selectedImageIndex !== null && selectedImageIndex > 0) {
      setSelectedImageIndex(selectedImageIndex - 1);
    }
  };

  const handleNextImage = () => {
    if (selectedImageIndex !== null && selectedImageIndex < project.gallery.length - 1) {
      setSelectedImageIndex(selectedImageIndex + 1);
    }
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (selectedImageIndex === null) return;

    switch (e.key) {
      case 'ArrowLeft':
        handlePreviousImage();
        break;
      case 'ArrowRight':
        handleNextImage();
        break;
      case 'Escape':
        setSelectedImageIndex(null);
        break;
    }
  };

  const handleGalleryImageError = (index: number) => {
    setGalleryErrors(prev => {
      const newErrors = [...prev];
      newErrors[index] = true;
      return newErrors;
    });
  };

  React.useEffect(() => {
    if (selectedImageIndex !== null) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [selectedImageIndex]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="relative h-[60vh] overflow-hidden">
        {mainImageError ? (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <div className="text-center text-gray-500">
              <ImageOff size={48} className="mx-auto mb-4" />
              <p>Image non disponible</p>
            </div>
          </div>
        ) : (
          <img
            src={project.mainImage}
            alt={project.title}
            className="w-full h-full object-cover"
            onError={() => setMainImageError(true)}
          />
        )}
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <div className="text-center">
            <span className="text-sage font-medium mb-4 block">{project.category}</span>
            <h1 className="text-4xl md:text-5xl text-white font-montserrat font-bold">
              {project.title}
            </h1>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Link to="/" className="inline-flex items-center text-sage hover:text-sage/80 mb-8">
          <ArrowLeft className="mr-2" size={20} />
          Retour à l'accueil
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <h2 className="text-3xl font-montserrat font-bold mb-6">À propos du projet</h2>
            <p className="text-gray-600 leading-relaxed mb-8">{project.description}</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="flex items-center space-x-3">
                <User className="text-sage" size={24} />
                <div>
                  <p className="text-sm text-gray-500">Client</p>
                  <p className="font-medium">{project.client}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="text-sage" size={24} />
                <div>
                  <p className="text-sm text-gray-500">Localisation</p>
                  <p className="font-medium">{project.location}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Calendar className="text-sage" size={24} />
                <div>
                  <p className="text-sm text-gray-500">Date</p>
                  <p className="font-medium">{project.date}</p>
                </div>
              </div>
            </div>

            <h3 className="text-2xl font-montserrat font-semibold mb-6">Galerie</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {project.gallery.map((image, index) => (
                <button
                  key={index}
                  onClick={() => !galleryErrors[index] && setSelectedImageIndex(index)}
                  className="relative group overflow-hidden rounded-lg shadow-md transition-transform duration-300 hover:scale-105 focus:outline-none"
                >
                  {galleryErrors[index] ? (
                    <div className="w-full h-64 bg-gray-200 flex items-center justify-center">
                      <div className="text-center text-gray-500">
                        <ImageOff size={24} className="mx-auto mb-2" />
                        <p className="text-sm">Image non disponible</p>
                      </div>
                    </div>
                  ) : (
                    <>
                      <img
                        src={image}
                        alt={`${project.title} - Image ${index + 1}`}
                        className="w-full h-64 object-cover"
                        onError={() => handleGalleryImageError(index)}
                      />
                      <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-30 transition-opacity duration-300" />
                    </>
                  )}
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
              <h3 className="text-xl font-montserrat font-semibold mb-6">Caractéristiques</h3>
              <ul className="space-y-4">
                {project.features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <span className="h-2 w-2 rounded-full bg-sage mr-3"></span>
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {project.testimonial && (
              <div className="bg-sage/10 rounded-xl p-8">
                <h3 className="text-xl font-montserrat font-semibold mb-4">Témoignage</h3>
                <blockquote className="text-gray-600 italic mb-4">
                  "{project.testimonial.text}"
                </blockquote>
                <div>
                  <p className="font-medium text-gray-900">{project.testimonial.author}</p>
                  <p className="text-sm text-gray-500">{project.testimonial.role}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {selectedImageIndex !== null && (
        <ImageModal
          images={project.gallery}
          currentIndex={selectedImageIndex}
          onClose={() => setSelectedImageIndex(null)}
          onPrevious={handlePreviousImage}
          onNext={handleNextImage}
        />
      )}
    </div>
  );
};

export default ProjectDetails;