import React from 'react';
import { User } from '../types';

interface ContactModalProps {
  isOpen: boolean;
  user: User;
  onClose: () => void;
}

const ContactModal: React.FC<ContactModalProps> = ({ isOpen, user, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4">
      <div className="bg-gray-800 rounded-2xl w-full max-w-sm text-white shadow-lg animate-fade-in-up">
        <div className="p-6 text-center">
          <img src={user.avatarUrl} alt={user.name} className="h-20 w-20 rounded-full mx-auto mb-4 border-2 border-gray-700" />
          <h2 className="text-xl font-bold">Contact {user.name}</h2>
          <p className="text-sm text-gray-400 mt-1">Your number is kept private.</p>
        </div>
        
        <div className="p-4 space-y-3 border-t border-gray-700">
          <button 
            onClick={() => { alert(`Calling ${user.name}...`); onClose(); }}
            className="w-full flex items-center justify-center py-3 bg-green-500 hover:bg-green-600 rounded-lg font-bold transition"
          >
             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" /></svg>
            Call
          </button>
          <button 
             onClick={() => { alert(`Messaging ${user.name}...`); onClose(); }}
            className="w-full flex items-center justify-center py-3 bg-cyan-500 hover:bg-cyan-600 rounded-lg font-bold transition"
          >
             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z" clipRule="evenodd" /></svg>
            Message
          </button>
        </div>
        
        <div className="p-4">
          <button onClick={onClose} className="w-full py-2 bg-gray-700 hover:bg-gray-600 rounded-lg font-semibold transition">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContactModal;
