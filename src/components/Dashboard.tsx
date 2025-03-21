import React from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import { Mail, FileText, Building2, LogOut } from 'lucide-react';
import MessagesList from './dashboard/MessagesList';
import MessageDetails from './dashboard/MessageDetails';
import QuotesList from './dashboard/QuotesList';
import QuoteDetails from './dashboard/QuoteDetails';
import ServicesList from './dashboard/ServicesList';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <h1 className="text-2xl font-montserrat font-bold">
                  BATIMO<span className="text-sage">ENTREPRISE</span>
                </h1>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                <Link
                  to="/dashboard/messages"
                  className="border-transparent text-gray-500 hover:border-sage hover:text-sage inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                >
                  <Mail className="mr-2" size={20} />
                  Messages
                </Link>
                <Link
                  to="/dashboard/quotes"
                  className="border-transparent text-gray-500 hover:border-sage hover:text-sage inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                >
                  <FileText className="mr-2" size={20} />
                  Devis
                </Link>
                <Link
                  to="/dashboard/services"
                  className="border-transparent text-gray-500 hover:border-sage hover:text-sage inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                >
                  <Building2 className="mr-2" size={20} />
                  Services
                </Link>
              </div>
            </div>
            <div className="flex items-center">
              <button
                onClick={handleLogout}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-sage hover:bg-sage/90"
              >
                <LogOut className="mr-2" size={20} />
                Déconnexion
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <Routes>
          <Route path="/" element={<MessagesList />} />
          <Route path="/messages" element={<MessagesList />} />
          <Route path="/messages/:id" element={<MessageDetails />} />
          <Route path="/quotes" element={<QuotesList />} />
          <Route path="/quotes/:id" element={<QuoteDetails />} />
          <Route path="/services" element={<ServicesList />} />
        </Routes>
      </div>
    </div>
  );
};

export default Dashboard;