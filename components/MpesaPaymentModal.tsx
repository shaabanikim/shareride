import React, { useState, useEffect } from 'react';
import { initiateStkPush } from '../mpesa';

type PaymentStatus = 'confirm' | 'pending' | 'success' | 'failed';

interface MpesaPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: (success: boolean) => void;
  phoneNumber: string;
  fare: number | null;
}

const Spinner = () => (
  <svg className="animate-spin h-16 w-16 text-cyan-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
  </svg>
);

const SuccessIcon = () => (
    <svg className="h-16 w-16 text-green-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

const FailedIcon = () => (
    <svg className="h-16 w-16 text-red-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);


const MpesaPaymentModal: React.FC<MpesaPaymentModalProps> = ({ isOpen, onClose, onComplete, phoneNumber, fare }) => {
  const [status, setStatus] = useState<PaymentStatus>('confirm');

  useEffect(() => {
    if (isOpen) {
      setStatus('confirm');
    }
  }, [isOpen]);
  
  const handleConfirm = async () => {
    if (!fare) return;
    setStatus('pending');
    try {
      const result = await initiateStkPush(phoneNumber, fare);
      setStatus(result);
    } catch (error) {
      console.error("M-Pesa push simulation failed:", error);
      setStatus('failed');
    }
  };

  if (!isOpen) return null;

  const renderContent = () => {
    switch (status) {
      case 'confirm':
        return (
            <>
                <img src="https://img.icons8.com/color/48/000000/mpesa.png" alt="M-Pesa" className="h-16 w-16" />
                <h2 className="text-xl font-bold mt-4">Confirm Payment</h2>
                <p className="text-sm text-gray-400 mt-2">
                  Pay <span className="font-bold text-white">${(fare ?? 0).toFixed(2)}</span> with M-Pesa number <span className="font-semibold text-white">{phoneNumber}</span>?
                </p>
          </>
        )
      case 'pending':
        return (
          <>
            <Spinner />
            <h2 className="text-xl font-bold mt-4">Check Your Phone</h2>
            <p className="text-sm text-gray-400 mt-2">
              An M-Pesa STK push has been sent to <span className="font-semibold">{phoneNumber}</span>. Please enter your PIN to authorize the payment of <span className="font-bold text-white">${(fare ?? 0).toFixed(2)}</span>.
            </p>
          </>
        );
      case 'success':
        return (
          <>
            <SuccessIcon />
            <h2 className="text-xl font-bold mt-4">Payment Successful!</h2>
            <p className="text-sm text-gray-400 mt-2">
              We're now finding a driver for you.
            </p>
          </>
        );
      case 'failed':
        return (
          <>
            <FailedIcon />
            <h2 className="text-xl font-bold mt-4">Payment Failed</h2>
            <p className="text-sm text-gray-400 mt-2">
              The M-Pesa request was not completed. Please try again.
            </p>
          </>
        );
    }
  };
  
  const renderButtons = () => {
      switch(status) {
          case 'confirm':
            return (
                <div className="flex p-4 space-x-3 border-t border-gray-700">
                    <button onClick={onClose} className="flex-1 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg font-bold transition">Cancel</button>
                    <button onClick={handleConfirm} className="flex-1 py-3 bg-green-500 hover:bg-green-600 rounded-lg font-bold transition">Confirm</button>
                </div>
            )
          case 'pending':
            return (
                 <div className="p-4 border-t border-gray-700">
                    <button onClick={onClose} className="w-full py-3 bg-gray-700 hover:bg-gray-600 rounded-lg font-bold transition">Cancel Payment</button>
                 </div>
            )
          case 'success':
              return (
                 <div className="p-4 border-t border-gray-700">
                    <button onClick={() => onComplete(true)} className="w-full py-3 bg-cyan-500 hover:bg-cyan-600 rounded-lg font-bold transition">Continue</button>
                 </div>
              )
          case 'failed':
              return (
                 <div className="p-4 border-t border-gray-700">
                    <button onClick={() => onComplete(false)} className="w-full py-3 bg-gray-700 hover:bg-gray-600 rounded-lg font-bold transition">Close</button>
                 </div>
              )
      }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4">
      <div className="bg-gray-800 rounded-2xl w-full max-w-sm text-white shadow-lg animate-fade-in-up">
        <div className="p-6 text-center min-h-[250px] flex flex-col items-center justify-center">
            {renderContent()}
        </div>
        {renderButtons()}
      </div>
    </div>
  );
};

export default MpesaPaymentModal;
