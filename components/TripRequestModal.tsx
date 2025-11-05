import React, { useState, useEffect } from 'react';
import { Trip } from '../types';

interface TripRequestModalProps {
  isOpen: boolean;
  trip: Trip | null;
  onAccept: () => void;
  onDecline: () => void;
}

const TripRequestModal: React.FC<TripRequestModalProps> = ({ isOpen, trip, onAccept, onDecline }) => {
  const [countdown, setCountdown] = useState(15);

  useEffect(() => {
    if (isOpen) {
      setCountdown(15);
      const timer = setInterval(() => {
        setCountdown(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            onDecline();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [isOpen, onDecline]);

  if (!isOpen || !trip) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4">
      <div className="bg-gray-800 rounded-2xl w-full max-w-sm text-white shadow-lg animate-fade-in-up">
        <div className="p-6 text-center">
            <div className="relative w-24 h-24 mx-auto">
                <svg className="w-full h-full" viewBox="0 0 100 100">
                    <circle className="text-gray-700" strokeWidth="5" stroke="currentColor" fill="transparent" r="45" cx="50" cy="50" />
                    <circle
                        className="text-cyan-400"
                        strokeWidth="5"
                        strokeDasharray={2 * Math.PI * 45}
                        strokeDashoffset={(2 * Math.PI * 45) * (1 - (countdown / 15))}
                        strokeLinecap="round"
                        stroke="currentColor"
                        fill="transparent"
                        r="45"
                        cx="50"
                        cy="50"
                        style={{ transform: 'rotate(-90deg)', transformOrigin: '50% 50%' }}
                    />
                    <text x="50" y="55" textAnchor="middle" className="text-3xl font-bold fill-current text-white">{countdown}</text>
                </svg>
            </div>
            
          <h2 className="text-xl font-bold mt-4">New Ride Request</h2>
          <p className="text-lg font-bold text-green-400">${trip.fare.toFixed(2)}</p>
        </div>
        
        <div className="px-6 pb-4 space-y-1 border-t border-gray-700 pt-4">
           <div className="flex items-center text-sm text-gray-300">
                <div className="w-2.5 h-2.5 bg-gray-400 rounded-full mr-3 flex-shrink-0"></div>
                <span className="truncate">{trip.pickup}</span>
            </div>
             <div className="flex items-center text-sm text-gray-300 mt-2">
                <div className="w-2.5 h-2.5 bg-white mr-3 flex-shrink-0"></div>
                <span className="truncate">{trip.destination}</span>
            </div>
        </div>
        
        <div className="flex p-4 space-x-3 mt-2">
          <button onClick={onDecline} className="flex-1 py-3 bg-red-600 hover:bg-red-700 rounded-lg font-bold transition">
            Decline
          </button>
          <button 
            onClick={onAccept}
            className="flex-1 py-3 bg-green-500 hover:bg-green-600 rounded-lg font-bold transition"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
};

export default TripRequestModal;
