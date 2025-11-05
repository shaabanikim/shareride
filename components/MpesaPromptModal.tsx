
import React, { useState } from 'react';

interface MpesaPromptModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (phoneNumber: string) => void;
}

const MpesaPromptModal: React.FC<MpesaPromptModalProps> = ({ isOpen, onClose, onConfirm }) => {
  const [phoneNumber, setPhoneNumber] = useState('');

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (phoneNumber.trim()) {
      onConfirm(phoneNumber);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4">
      <div className="bg-gray-800 rounded-2xl w-full max-w-sm text-white shadow-lg animate-fade-in-up">
        <div className="p-6">
          <h2 className="text-xl font-bold text-center mb-4">Add M-Pesa Number</h2>
          <p className="text-sm text-gray-400 text-center mb-4">
            Enter your M-Pesa registered phone number to add it as a payment method.
          </p>
          <input
            type="tel"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="e.g., 0712345678"
            className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition"
          />
        </div>
        
        <div className="flex p-4 space-x-3 border-t border-gray-700">
          <button onClick={onClose} className="flex-1 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg font-bold transition">
            Cancel
          </button>
          <button 
            onClick={handleSubmit}
            disabled={!phoneNumber.trim()}
            className="flex-1 py-3 bg-green-500 hover:bg-green-600 rounded-lg font-bold transition disabled:bg-gray-600"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default MpesaPromptModal;
