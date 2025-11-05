import React, { useState } from 'react';
import MpesaPromptModal from './MpesaPromptModal';

const BackIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
    </svg>
);

const MpesaIcon = () => <img src="https://img.icons8.com/color/48/000000/mpesa.png" alt="M-Pesa" className="h-6 w-6 mr-3" />;
const CardIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>;

interface PaymentViewProps {
  onBack: () => void;
  mpesaNumber: string;
  onSetMpesaNumber: (number: string) => void;
}

const PaymentView: React.FC<PaymentViewProps> = ({ onBack, mpesaNumber, onSetMpesaNumber }) => {
    const [isMpesaPromptOpen, setIsMpesaPromptOpen] = useState(false);

    const handleConfirmMpesaNumber = (phoneNumber: string) => {
        onSetMpesaNumber(phoneNumber);
        setIsMpesaPromptOpen(false);
    };

    return (
        <div className="text-white">
            <div className="flex items-center mb-4">
                <button onClick={onBack} className="p-2 rounded-full hover:bg-gray-700 transition mr-2">
                    <BackIcon />
                </button>
                <h2 className="text-xl font-bold">Payment Methods</h2>
            </div>
            <div className="space-y-4">
                <div className="p-4 bg-gray-800 rounded-lg flex items-center">
                    <CardIcon />
                    <span className="font-semibold">Visa **** 4242</span>
                </div>
                {mpesaNumber && (
                    <div className="p-4 bg-gray-800 rounded-lg flex items-center">
                        <MpesaIcon />
                        <span className="font-semibold">{mpesaNumber}</span>
                    </div>
                )}


                <div className="pt-4 border-t border-gray-700">
                    <h3 className="font-semibold mb-2">Add Payment Method</h3>
                    <div className="space-y-2">
                        <button onClick={() => alert('Add Card functionality coming soon!')} className="w-full flex items-center p-3 bg-gray-700 rounded-lg hover:bg-gray-600 transition">
                            <CardIcon /> Add Credit/Debit Card
                        </button>
                        <button onClick={() => setIsMpesaPromptOpen(true)} className="w-full flex items-center p-3 bg-gray-700 rounded-lg hover:bg-gray-600 transition">
                            <MpesaIcon /> {mpesaNumber ? 'Edit' : 'Add'} M-Pesa
                        </button>
                    </div>
                </div>
            </div>

            <MpesaPromptModal
                isOpen={isMpesaPromptOpen}
                onClose={() => setIsMpesaPromptOpen(false)}
                onConfirm={handleConfirmMpesaNumber}
            />
        </div>
    );
};

export default PaymentView;
