import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Building2, PlusCircle, Edit, Trash2, ImageOff } from 'lucide-react';

interface Service {
  _id: string;
  title: string;
  description: string;
  image: string;
  features: string[];
  benefits: string[];
  createdAt: string;
  updatedAt: string;
}

const ServicesList: React.FC = () => {
  const { data: services, isLoading, error } = useQuery({
    queryKey: ['services'],
    queryFn: async () => {
      const response = await axios.get('http://localhost:3000/api/services', {
        withCredentials: true
      });
      return response.data as Service[];
    }
  });

  const handleAddService = () => {
    // TODO: Implement service creation
  };

  const handleEditService = (id: string) => {
    // TODO: Implement service editing
  };

  const handleDeleteService = async (id: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce service ?')) return;
    
    try {
      await axios.delete(`http://localhost:3000/api/services/${id}`, {
        withCredentials: true
      });
      // Refresh services list
    } catch (error) {
      console.error('Error deleting service:', error);
    }
  };

  if (isLoading) return <div>Chargement...</div>;
  if (error) return <div>Une erreur est survenue</div>;

  return (
    <div className="bg-white shadow rounded-lg">
      <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
        <div>
          <h3 className="text-lg leading-6 font-medium text-gray-900">Services</h3>
          <p className="mt-1 text-sm text-gray-500">
            Gérez les services proposés par BATIMO
          </p>
        </div>
        <button
          onClick={handleAddService}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-sage hover:bg-sage/90"
        >
          <PlusCircle className="mr-2" size={20} />
          Ajouter un service
        </button>
      </div>
      
      <div className="border-t border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
          {services?.map((service) => (
            <div
              key={service._id}
              className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="relative h-48 rounded-t-lg overflow-hidden">
                {service.image ? (
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = 'https://via.placeholder.com/400x300?text=Image+non+disponible';
                    }}
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                    <ImageOff className="text-gray-400" size={48} />
                  </div>
                )}
              </div>
              
              <div className="p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-1">
                      {service.title}
                    </h4>
                    <p className="text-sm text-gray-500 mb-2">
                      Modifié le {format(new Date(service.updatedAt), 'PPP', { locale: fr })}
                    </p>
                  </div>
                  <Building2 className="text-sage" size={24} />
                </div>
                
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {service.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {service.features.slice(0, 3).map((feature, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-sage/10 text-sage"
                    >
                      {feature}
                    </span>
                  ))}
                  {service.features.length > 3 && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                      +{service.features.length - 3}
                    </span>
                  )}
                </div>
                
                <div className="flex justify-end space-x-2">
                  <button
                    onClick={() => handleEditService(service._id)}
                    className="inline-flex items-center px-3 py-1.5 border border-sage text-sm font-medium rounded-md text-sage hover:bg-sage/10"
                  >
                    <Edit size={16} className="mr-1" />
                    Modifier
                  </button>
                  <button
                    onClick={() => handleDeleteService(service._id)}
                    className="inline-flex items-center px-3 py-1.5 border border-red-600 text-sm font-medium rounded-md text-red-600 hover:bg-red-50"
                  >
                    <Trash2 size={16} className="mr-1" />
                    Supprimer
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServicesList;