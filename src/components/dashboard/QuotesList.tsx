import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { FileText, CheckCircle, XCircle, Clock } from 'lucide-react';
import toast from 'react-hot-toast';

interface Quote {
  _id: string;
  name: string;
  email: string;
  phone: string;
  projectType: string;
  budget: string;
  message: string;
  createdAt: string;
  status: 'pending' | 'reviewed' | 'accepted' | 'rejected';
}

const statusIcons = {
  pending: <Clock className="h-5 w-5 text-yellow-500" />,
  reviewed: <CheckCircle className="h-5 w-5 text-blue-500" />,
  accepted: <CheckCircle className="h-5 w-5 text-green-500" />,
  rejected: <XCircle className="h-5 w-5 text-red-500" />
};

const statusLabels = {
  pending: 'En attente',
  reviewed: 'Examiné',
  accepted: 'Accepté',
  rejected: 'Refusé'
};

const statusMessages = {
  pending: 'Devis mis en attente',
  reviewed: 'Devis marqué comme examiné',
  accepted: 'Devis accepté avec succès',
  rejected: 'Devis refusé'
};

const QuotesList: React.FC = () => {
  const queryClient = useQueryClient();
  
  const { data: quotes, isLoading, error } = useQuery({
    queryKey: ['quotes'],
    queryFn: async () => {
      const response = await axios.get('http://localhost:3011/api/quotes', {
        withCredentials: true
      });
      return response.data as Quote[];
    }
  });

  const updateStatus = async (id: string, status: Quote['status']) => {
    const toastId = toast.loading('Mise à jour du statut...');
    
    try {
      await axios.patch(
        `http://localhost:3011/api/quotes/${id}/status`,
        { status },
        { withCredentials: true }
      );
      
      await queryClient.invalidateQueries({ queryKey: ['quotes'] });
      
      toast.success(statusMessages[status], { id: toastId });
    } catch (error) {
      toast.error('Erreur lors de la mise à jour du statut', { id: toastId });
      console.error('Error updating quote status:', error);
    }
  };

  if (isLoading) return <div>Chargement...</div>;
  if (error) return <div>Une erreur est survenue</div>;

  return (
    <div className="bg-white shadow rounded-lg">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">Devis</h3>
        <p className="mt-1 text-sm text-gray-500">
          Liste des demandes de devis reçues
        </p>
      </div>
      <div className="border-t border-gray-200">
        <ul role="list" className="divide-y divide-gray-200">
          {quotes?.map((quote) => (
            <li key={quote._id} className="hover:bg-gray-50 transition-colors">
              <Link to={`/dashboard/quotes/${quote._id}`} className="block">
                <div className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <FileText className="h-6 w-6 text-gray-400" />
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">
                          {quote.name}
                        </p>
                        <p className="text-sm text-gray-500">{quote.email}</p>
                        <p className="text-sm text-gray-500">{quote.phone}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center">
                        {statusIcons[quote.status]}
                        <span className="ml-2 text-sm text-gray-500">
                          {statusLabels[quote.status]}
                        </span>
                      </div>
                      <select
                        value={quote.status}
                        onChange={(e) => {
                          e.preventDefault();
                          updateStatus(quote._id, e.target.value as Quote['status']);
                        }}
                        onClick={(e) => e.stopPropagation()}
                        className="ml-4 rounded-md border-gray-300 shadow-sm focus:border-sage focus:ring focus:ring-sage focus:ring-opacity-50"
                      >
                        {Object.entries(statusLabels).map(([value, label]) => (
                          <option key={value} value={value}>
                            {label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="mt-2 grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        Type de projet
                      </p>
                      <p className="mt-1 text-sm text-gray-900">
                        {quote.projectType}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Budget</p>
                      <p className="mt-1 text-sm text-gray-900">{quote.budget}</p>
                    </div>
                  </div>
                  <div className="mt-4">
                    <p className="text-sm font-medium text-gray-500">Description</p>
                    <p className="mt-1 text-sm text-gray-900 line-clamp-2">{quote.message}</p>
                  </div>
                  <div className="mt-2 text-sm text-gray-500">
                    Reçu le{' '}
                    {format(new Date(quote.createdAt), 'PPP', { locale: fr })}
                  </div>
                </div>
              </Link>
            </li>
          ))}
          {quotes?.length === 0 && (
            <li className="p-4 text-center text-gray-500">
              Aucun devis reçu
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default QuotesList;