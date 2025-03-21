import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { ArrowLeft, CheckCircle, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';

interface Message {
  _id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
  isRead: boolean;
}

const MessageDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: message, isLoading, error } = useQuery({
    queryKey: ['message', id],
    queryFn: async () => {
      const response = await axios.get(`http://localhost:3000/api/messages/${id}`, {
        withCredentials: true
      });
      return response.data as Message;
    }
  });

  const markAsRead = async () => {
    if (!message || message.isRead) return;

    const toastId = toast.loading('Marquage du message comme lu...');
    try {
      await axios.patch(
        `http://localhost:3000/api/messages/${id}/read`,
        {},
        { withCredentials: true }
      );
      
      await queryClient.invalidateQueries({ queryKey: ['message', id] });
      await queryClient.invalidateQueries({ queryKey: ['messages'] });
      
      toast.success('Message marqué comme lu', { id: toastId });
    } catch (error) {
      toast.error('Erreur lors de la mise à jour du message', { id: toastId });
    }
  };

  const deleteMessage = async () => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce message ?')) return;

    const toastId = toast.loading('Suppression du message...');
    try {
      await axios.delete(`http://localhost:3000/api/messages/${id}`, {
        withCredentials: true
      });
      
      toast.success('Message supprimé avec succès', { id: toastId });
      navigate('/dashboard/messages');
    } catch (error) {
      toast.error('Erreur lors de la suppression du message', { id: toastId });
    }
  };

  if (isLoading) return <div className="p-4">Chargement...</div>;
  if (error) return <div className="p-4">Une erreur est survenue</div>;
  if (!message) return <div className="p-4">Message non trouvé</div>;

  return (
    <div className="bg-white shadow rounded-lg">
      <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Link
            to="/dashboard/messages"
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <ArrowLeft size={24} />
          </Link>
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Détails du message
          </h3>
        </div>
        <div className="flex items-center gap-2">
          {!message.isRead && (
            <button
              onClick={markAsRead}
              className="inline-flex items-center px-3 py-2 border border-sage text-sm font-medium rounded-md text-sage hover:bg-sage/10 transition-colors"
            >
              <CheckCircle size={16} className="mr-2" />
              Marquer comme lu
            </button>
          )}
          <button
            onClick={deleteMessage}
            className="inline-flex items-center px-3 py-2 border border-red-600 text-sm font-medium rounded-md text-red-600 hover:bg-red-50 transition-colors"
          >
            <Trash2 size={16} className="mr-2" />
            Supprimer
          </button>
        </div>
      </div>
      
      <div className="border-t border-gray-200">
        <dl>
          <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Statut</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                message.isRead ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
              }`}>
                {message.isRead ? 'Lu' : 'Non lu'}
              </span>
            </dd>
          </div>
          <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 bg-gray-50">
            <dt className="text-sm font-medium text-gray-500">Expéditeur</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {message.name}
            </dd>
          </div>
          <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Email</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              <a href={`mailto:${message.email}`} className="text-sage hover:underline">
                {message.email}
              </a>
            </dd>
          </div>
          <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 bg-gray-50">
            <dt className="text-sm font-medium text-gray-500">Date de réception</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {format(new Date(message.createdAt), 'PPP à HH:mm', { locale: fr })}
            </dd>
          </div>
          <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Message</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 whitespace-pre-wrap">
              {message.message}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
};

export default MessageDetails;