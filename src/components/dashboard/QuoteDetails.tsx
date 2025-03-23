import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { ArrowLeft, FileText, Trash2, Send, X } from 'lucide-react';
import toast from 'react-hot-toast';

interface Admin {
  _id: string;
  email: string;
}

interface Comment {
  _id: string;
  content: string;
  author: Admin;
  mentions: Admin[];
  createdAt: string;
}

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
  comments: Comment[];
}

const statusLabels = {
  pending: 'En attente',
  reviewed: 'Examiné',
  accepted: 'Accepté',
  rejected: 'Refusé'
};

const statusColors = {
  pending: 'bg-yellow-100 text-yellow-800',
  reviewed: 'bg-blue-100 text-blue-800',
  accepted: 'bg-green-100 text-green-800',
  rejected: 'bg-red-100 text-red-800'
};

const statusMessages = {
  pending: 'Devis mis en attente',
  reviewed: 'Devis marqué comme examiné',
  accepted: 'Devis accepté avec succès',
  rejected: 'Devis refusé'
};

const QuoteDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [newComment, setNewComment] = useState('');
  const [selectedMentions, setSelectedMentions] = useState<string[]>([]);
  const [showMentionsList, setShowMentionsList] = useState(false);

  const { data: quote, isLoading: quoteLoading } = useQuery({
    queryKey: ['quote', id],
    queryFn: async () => {
      const response = await axios.get(`http://localhost:3011/api/quotes/${id}`, {
        withCredentials: true
      });
      return response.data as Quote;
    }
  });

  const { data: admins, isLoading: adminsLoading } = useQuery({
    queryKey: ['admins'],
    queryFn: async () => {
      const response = await axios.get('http://localhost:3011/api/admins', {
        withCredentials: true
      });
      return response.data as Admin[];
    }
  });

  const updateStatus = async (status: Quote['status']) => {
    const toastId = toast.loading('Mise à jour du statut...');
    try {
      await axios.patch(
        `http://localhost:3011/api/quotes/${id}/status`,
        { status },
        { withCredentials: true }
      );
      
      await queryClient.invalidateQueries({ queryKey: ['quote', id] });
      await queryClient.invalidateQueries({ queryKey: ['quotes'] });
      
      toast.success(statusMessages[status], { id: toastId });
    } catch (error) {
      toast.error('Erreur lors de la mise à jour du statut', { id: toastId });
    }
  };

  const deleteQuote = async () => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce devis ?')) return;

    const toastId = toast.loading('Suppression du devis...');
    try {
      await axios.delete(`http://localhost:3011/api/quotes/${id}`, {
        withCredentials: true
      });
      
      toast.success('Devis supprimé avec succès', { id: toastId });
      navigate('/dashboard/quotes');
    } catch (error) {
      toast.error('Erreur lors de la suppression du devis', { id: toastId });
    }
  };

  const addComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const toastId = toast.loading('Ajout du commentaire...');
    try {
      await axios.post(
        `http://localhost:3011/api/quotes/${id}/comments`,
        {
          content: newComment,
          mentions: selectedMentions
        },
        { withCredentials: true }
      );

      await queryClient.invalidateQueries({ queryKey: ['quote', id] });
      setNewComment('');
      setSelectedMentions([]);
      toast.success('Commentaire ajouté avec succès', { id: toastId });
    } catch (error) {
      toast.error('Erreur lors de l\'ajout du commentaire', { id: toastId });
    }
  };

  const deleteComment = async (commentId: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce commentaire ?')) return;

    const toastId = toast.loading('Suppression du commentaire...');
    try {
      await axios.delete(
        `http://localhost:3011/api/quotes/${id}/comments/${commentId}`,
        { withCredentials: true }
      );

      await queryClient.invalidateQueries({ queryKey: ['quote', id] });
      toast.success('Commentaire supprimé avec succès', { id: toastId });
    } catch (error) {
      toast.error('Erreur lors de la suppression du commentaire', { id: toastId });
    }
  };

  const toggleMention = (adminId: string) => {
    setSelectedMentions(prev => 
      prev.includes(adminId)
        ? prev.filter(id => id !== adminId)
        : [...prev, adminId]
    );
  };

  if (quoteLoading || adminsLoading) return <div className="p-4">Chargement...</div>;
  if (!quote) return <div className="p-4">Devis non trouvé</div>;

  return (
    <div className="bg-white shadow rounded-lg">
      <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Link
            to="/dashboard/quotes"
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <ArrowLeft size={24} />
          </Link>
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Détails du devis
          </h3>
        </div>
        <div className="flex items-center gap-2">
          <select
            value={quote.status}
            onChange={(e) => updateStatus(e.target.value as Quote['status'])}
            className="rounded-md border-gray-300 shadow-sm focus:border-sage focus:ring focus:ring-sage focus:ring-opacity-50"
          >
            {Object.entries(statusLabels).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
          <button
            onClick={deleteQuote}
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
                statusColors[quote.status]
              }`}>
                {statusLabels[quote.status]}
              </span>
            </dd>
          </div>
          <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 bg-gray-50">
            <dt className="text-sm font-medium text-gray-500">Client</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {quote.name}
            </dd>
          </div>
          <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Email</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              <a href={`mailto:${quote.email}`} className="text-sage hover:underline">
                {quote.email}
              </a>
            </dd>
          </div>
          <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 bg-gray-50">
            <dt className="text-sm font-medium text-gray-500">Téléphone</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              <a href={`tel:${quote.phone}`} className="text-sage hover:underline">
                {quote.phone}
              </a>
            </dd>
          </div>
          <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Type de projet</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {quote.projectType}
            </dd>
          </div>
          <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 bg-gray-50">
            <dt className="text-sm font-medium text-gray-500">Budget</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {quote.budget}
            </dd>
          </div>
          <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Date de réception</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {format(new Date(quote.createdAt), 'PPP à HH:mm', { locale: fr })}
            </dd>
          </div>
          <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 bg-gray-50">
            <dt className="text-sm font-medium text-gray-500">Description</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 whitespace-pre-wrap">
              {quote.message}
            </dd>
          </div>
        </dl>
      </div>

      {/* Comments section */}
      <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
        <h4 className="text-lg font-medium text-gray-900 mb-4">Commentaires</h4>
        
        <div className="space-y-4 mb-6">
          {quote.comments.map((comment) => (
            <div key={comment._id} className="bg-gray-50 rounded-lg p-4">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {comment.author.email}
                  </p>
                  <p className="text-xs text-gray-500">
                    {format(new Date(comment.createdAt), 'PPP à HH:mm', { locale: fr })}
                  </p>
                </div>
                <button
                  onClick={() => deleteComment(comment._id)}
                  className="text-gray-400 hover:text-red-600 transition-colors"
                >
                  <X size={16} />
                </button>
              </div>
              <p className="mt-2 text-sm text-gray-700">{comment.content}</p>
              {comment.mentions.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-2">
                  {comment.mentions.map((mention) => (
                    <span
                      key={mention._id}
                      className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-sage/10 text-sage"
                    >
                      @{mention.email}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        <form onSubmit={addComment} className="space-y-4">
          <div className="relative">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Ajouter un commentaire..."
              className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-sage focus:border-transparent"
              rows={3}
            />
            
            {/* Mentions section */}
            <div className="mt-2">
              <button
                type="button"
                onClick={() => setShowMentionsList(!showMentionsList)}
                className="inline-flex items-center px-3 py-1 text-sm text-sage hover:bg-sage/10 rounded-md"
              >
                @ Mentionner un administrateur
              </button>
              
              {showMentionsList && admins && (
                <div className="mt-2 p-2 bg-white border border-gray-200 rounded-md shadow-sm">
                  {admins.map((admin) => (
                    <label
                      key={admin._id}
                      className="flex items-center p-2 hover:bg-gray-50 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={selectedMentions.includes(admin._id)}
                        onChange={() => toggleMention(admin._id)}
                        className="rounded border-gray-300 text-sage focus:ring-sage"
                      />
                      <span className="ml-2 text-sm text-gray-700">{admin.email}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={!newComment.trim()}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-sage hover:bg-sage/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sage disabled:opacity-50"
            >
              <Send size={16} className="mr-2" />
              Envoyer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default QuoteDetails;