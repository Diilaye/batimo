import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Mail, CheckCircle } from 'lucide-react';
import toast from 'react-hot-toast';

interface Message {
  _id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
  isRead: boolean;
}

const MessagesList: React.FC = () => {
  const queryClient = useQueryClient();

  const { data: messages, isLoading, error } = useQuery({
    queryKey: ['messages'],
    queryFn: async () => {
      const response = await axios.get('http://localhost:3011/api/messages', {
        withCredentials: true
      });
      return response.data as Message[];
    }
  });

  const markAsRead = async (id: string) => {
    const toastId = toast.loading('Marquage du message comme lu...');
    try {
      await axios.patch(
        `http://localhost:3011/api/messages/${id}/read`,
        {},
        { withCredentials: true }
      );
      
      await queryClient.invalidateQueries({ queryKey: ['messages'] });
      
      toast.success('Message marqué comme lu', { id: toastId });
    } catch (error) {
      toast.error('Erreur lors de la mise à jour du message', { id: toastId });
      console.error('Error marking message as read:', error);
    }
  };

  if (isLoading) return <div>Chargement...</div>;
  if (error) return <div>Une erreur est survenue</div>;

  return (
    <div className="bg-white shadow rounded-lg">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">Messages</h3>
        <p className="mt-1 text-sm text-gray-500">
          Liste des messages reçus via le formulaire de contact
        </p>
      </div>
      <div className="border-t border-gray-200">
        <ul role="list" className="divide-y divide-gray-200">
          {messages?.map((message) => (
            <li
              key={message._id}
              className={`hover:bg-gray-50 transition-colors ${
                !message.isRead ? 'bg-blue-50' : ''
              }`}
            >
              <Link to={`/dashboard/messages/${message._id}`} className="block">
                <div className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <Mail
                          className={`h-6 w-6 ${
                            message.isRead ? 'text-gray-400' : 'text-blue-500'
                          }`}
                        />
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">
                          {message.name}
                        </p>
                        <p className="text-sm text-gray-500">{message.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <p className="text-sm text-gray-500">
                        {format(new Date(message.createdAt), 'PPP', { locale: fr })}
                      </p>
                      {!message.isRead && (
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            markAsRead(message._id);
                          }}
                          className="ml-4 text-sage hover:text-sage/80 transition-colors duration-200"
                          title="Marquer comme lu"
                        >
                          <CheckCircle className="h-5 w-5" />
                        </button>
                      )}
                    </div>
                  </div>
                  <div className="mt-2">
                    <p className="text-sm text-gray-600 line-clamp-2">{message.message}</p>
                  </div>
                </div>
              </Link>
            </li>
          ))}
          {messages?.length === 0 && (
            <li className="p-4 text-center text-gray-500">
              Aucun message reçu
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default MessagesList;