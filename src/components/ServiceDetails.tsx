import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, X, ChevronLeft, ChevronRight, ImageOff } from 'lucide-react';
import QuoteModal from './QuoteModal';

interface ServiceDetail {
  title: string;
  description: string;
  image: string;
  features: string[];
  benefits: string[];
  gallery: {
    title: string;
    description: string;
    image: string;
  }[];
}

interface ImageModalProps {
  images: string[];
  titles: string[];
  descriptions: string[];
  currentIndex: number;
  onClose: () => void;
  onPrevious: () => void;
  onNext: () => void;
}

const ImageModal: React.FC<ImageModalProps> = ({ 
  images, 
  titles, 
  descriptions, 
  currentIndex, 
  onClose, 
  onPrevious, 
  onNext 
}) => {
  const [imageError, setImageError] = useState(false);

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

      <div className="max-w-4xl mx-auto px-4">
        {imageError ? (
          <div className="flex flex-col items-center text-white">
            <ImageOff size={48} />
            <p className="mt-4">Image non disponible</p>
          </div>
        ) : (
          <>
            <img
              src={images[currentIndex]}
              alt={titles[currentIndex]}
              className="max-h-[70vh] w-full object-contain mb-4"
              onError={() => setImageError(true)}
            />
            <div className="text-white">
              <h3 className="text-xl font-montserrat font-semibold mb-2">{titles[currentIndex]}</h3>
              <p className="text-gray-300">{descriptions[currentIndex]}</p>
            </div>
          </>
        )}
      </div>

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

const servicesData: Record<string, ServiceDetail> = {
  construction: {
    title: 'Construction',
    description: 'La construction d\'un bâtiment est un processus délicat et rigoureux qui nécessite une connaissance approfondie. Notre équipe d\'experts assure une approche méthodique pour chaque étape du projet, de la fondation jusqu\'aux finitions.',
    image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
    features: [
      'Études préliminaires et conception',
      'Gestion de projet complète',
      'Suivi de chantier rigoureux',
      'Respect des normes et réglementations',
      'Utilisation de matériaux de qualité'
    ],
    benefits: [
      'Expertise technique approfondie',
      'Respect des délais',
      'Garantie de qualité',
      'Accompagnement personnalisé',
      'Solutions innovantes'
    ],
    gallery: [
      {
        title: 'Villa Moderne',
        description: 'Construction d\'une villa moderne avec piscine à Dakar',
        image: 'https://images.unsplash.com/photo-1600566752355-35792bedcfea?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80'
      },
      {
        title: 'Immeuble Résidentiel',
        description: 'Projet d\'immeuble résidentiel de standing',
        image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80'
      },
      {
        title: 'Maison Contemporaine',
        description: 'Construction d\'une maison contemporaine avec jardin',
        image: 'https://images.unsplash.com/photo-1600573472550-8090b5e0745e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80'
      }
    ]
  },
  decoration: {
    title: 'Décoration intérieur',
    description: 'Notre service de décoration intérieure transforme vos espaces en lieux de vie uniques et personnalisés. Nous créons des ambiances qui reflètent votre personnalité tout en optimisant la fonctionnalité de chaque pièce.',
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
    features: [
      'Conseil en aménagement',
      'Sélection de mobilier',
      'Choix des couleurs et matériaux',
      'Éclairage sur mesure',
      'Accessoires et finitions'
    ],
    benefits: [
      'Design personnalisé',
      'Optimisation de l\'espace',
      'Harmonie des styles',
      'Confort optimal',
      'Valorisation du bien'
    ],
    gallery: [
      {
        title: 'Salon Moderne',
        description: 'Décoration d\'un salon moderne aux tons neutres',
        image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80'
      },
      {
        title: 'Chambre Principal',
        description: 'Aménagement d\'une suite parentale luxueuse',
        image: 'https://images.unsplash.com/photo-1615873968403-89e068629265?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80'
      },
      {
        title: 'Espace Bureau',
        description: 'Création d\'un espace de travail ergonomique',
        image: 'https://images.unsplash.com/photo-1585412727339-54e4bae3bbf9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80'
      }
    ]
  },
  gestion: {
    title: 'Gestion Immobilière',
    description: 'Notre service de gestion immobilière offre des solutions complètes pour propriétaires et investisseurs. Nous prenons en charge tous les aspects de la gestion de vos biens immobiliers.',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
    features: [
      'Gestion locative complète',
      'Suivi des paiements',
      'Maintenance préventive',
      'Reporting mensuel',
      'Gestion administrative'
    ],
    benefits: [
      'Tranquillité d\'esprit',
      'Optimisation des revenus',
      'Réduction des coûts',
      'Valorisation du patrimoine',
      'Service professionnel'
    ],
    gallery: [
      {
        title: 'Résidence Premium',
        description: 'Gestion d\'une résidence haut de gamme',
        image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80'
      },
      {
        title: 'Immeuble de Bureaux',
        description: 'Administration d\'un immeuble de bureaux moderne',
        image: 'https://images.unsplash.com/photo-1562664377-709f2c337eb2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80'
      },
      {
        title: 'Complex Résidentiel',
        description: 'Gestion d\'un complexe résidentiel avec services',
        image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80'
      }
    ]
  },
  transport: {
    title: 'Transport Logistique',
    description: 'Notre service de transport et logistique assure une gestion efficace des ressources et des flux de matériaux. Nous optimisons chaque aspect de la chaîne logistique pour garantir des livraisons ponctuelles et sécurisées.',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
    features: [
      'Planification logistique',
      'Transport sécurisé',
      'Gestion des stocks',
      'Suivi en temps réel',
      'Solutions sur mesure'
    ],
    benefits: [
      'Efficacité optimale',
      'Réduction des délais',
      'Sécurité garantie',
      'Flexibilité',
      'Économies d\'échelle'
    ],
    gallery: [
      {
        title: 'Flotte de Véhicules',
        description: 'Notre flotte moderne de véhicules de transport',
        image: 'https://images.unsplash.com/photo-1519003722824-194d4455a60c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80'
      },
      {
        title: 'Centre Logistique',
        description: 'Notre centre logistique principal',
        image: 'https://images.unsplash.com/photo-1586528116493-d787c31bdc46?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80'
      },
      {
        title: 'Livraison Chantier',
        description: 'Livraison de matériaux sur un chantier',
        image: 'https://images.unsplash.com/photo-1587293852726-70cdb56c2866?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80'
      }
    ]
  }
};

const ServiceDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const service = id ? servicesData[id] : null;
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [galleryErrors, setGalleryErrors] = useState<boolean[]>([]);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);

  React.useEffect(() => {
    if (service) {
      setGalleryErrors(new Array(service.gallery.length).fill(false));
    }
  }, [service]);

  if (!service) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Service non trouvé</h2>
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
    if (selectedImageIndex !== null && selectedImageIndex < service.gallery.length - 1) {
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
    <>
      <div className="min-h-screen bg-gray-50">
        <div className="relative h-[50vh] overflow-hidden">
          <img
            src={service.image}
            alt={service.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <h1 className="text-4xl md:text-5xl text-white font-montserrat font-bold">
              {service.title}
            </h1>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <Link to="/" className="inline-flex items-center text-sage hover:text-sage/80 mb-8">
            <ArrowLeft className="mr-2" size={20} />
            Retour à l'accueil
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-montserrat font-bold mb-6">Description du service</h2>
              <p className="text-gray-600 leading-relaxed mb-8">{service.description}</p>
              
              <h3 className="text-2xl font-montserrat font-semibold mb-4">Caractéristiques</h3>
              <ul className="space-y-3 mb-8">
                {service.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <span className="h-6 w-6 rounded-full bg-sage/20 text-sage flex items-center justify-center mr-3 mt-0.5">
                      {index + 1}
                    </span>
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <h3 className="text-2xl font-montserrat font-semibold mb-6">Nos Réalisations</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {service.gallery.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => !galleryErrors[index] && setSelectedImageIndex(index)}
                    className="relative group overflow-hidden rounded-lg shadow-md transition-transform duration-300 hover:scale-105 focus:outline-none"
                  >
                    {galleryErrors[index] ? (
                      <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                        <div className="text-center text-gray-500">
                          <ImageOff size={24} className="mx-auto mb-2" />
                          <p className="text-sm">Image non disponible</p>
                        </div>
                      </div>
                    ) : (
                      <>
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-48 object-cover"
                          onError={() => handleGalleryImageError(index)}
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex items-center justify-center">
                          <div className="text-white text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4">
                            <h4 className="text-lg font-semibold mb-2">{item.title}</h4>
                            <p className="text-sm">{item.description}</p>
                          </div>
                        </div>
                      </>
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-montserrat font-semibold mb-6">Avantages</h3>
              <div className="bg-white rounded-xl shadow-lg p-8">
                <ul className="space-y-6">
                  {service.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-center">
                      <div className="h-12 w-12 rounded-full bg-sage/10 text-sage flex items-center justify-center mr-4">
                        <span className="text-xl font-semibold">{index + 1}</span>
                      </div>
                      <span className="text-gray-800 font-medium">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 bg-sage/10 rounded-xl p-8">
                <h3 className="text-xl font-montserrat font-semibold mb-4">Vous êtes intéressé ?</h3>
                <p className="text-gray-600 mb-6">
                  Contactez-nous pour discuter de votre projet et obtenir un devis personnalisé.
                </p>
                <button
                  onClick={() => setIsQuoteModalOpen(true)}
                  className="btn-primary inline-block"
                >
                  Demander un devis
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {selectedImageIndex !== null && (
        <ImageModal
          images={service.gallery.map(item => item.image)}
          titles={service.gallery.map(item => item.title)}
          descriptions={service.gallery.map(item => item.description)}
          currentIndex={selectedImageIndex}
          onClose={() => setSelectedImageIndex(null)}
          onPrevious={handlePreviousImage}
          onNext={handleNextImage}
        />
      )}

      <QuoteModal 
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
      />
    </>
  );
};

export default ServiceDetails;