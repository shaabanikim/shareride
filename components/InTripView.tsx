

import React, { useState } from 'react';
import { Ride, User } from '../types';
import SafetyPanel from './SafetyPanel';
import ContactModal from './ContactModal';

interface InTripViewProps {
  driver: User;
  selectedRide: Ride;
  onFinishTrip: () => void;
  onShareRide: () => void;
}

const InTripView: React.FC<InTripViewProps> = ({ driver, selectedRide, onFinishTrip, onShareRide }) => {
  const [isSafetyPanelOpen, setIsSafetyPanelOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  
  // Mock ETA countdown
  const [eta, setEta] = React.useState(5);
  React.useEffect(() => {
    if (eta > 0) {
      const timer = setTimeout(() => setEta(eta - 1), 60 * 1000);
      return () => clearTimeout(timer);
    } else {
        // Simulate trip progress and completion
        const tripTimer = setTimeout(onFinishTrip, 15 * 1000); // Trip lasts 15s for demo
        return () => clearTimeout(tripTimer);
    }
  }, [eta, onFinishTrip]);

  const getMaxCapacity = (capacity: string): number => {
    if (capacity.includes('-')) {
        return parseInt(capacity.split('-')[1], 10);
    }
    return parseInt(capacity, 10);
  };

  const availableSeats = getMaxCapacity(selectedRide.capacity) - 1;


  return (
    <div className="text-white animate-fade-in">
      <div className="text-center mb-4">
        <h2 className="text-2xl font-bold">
            {eta > 0 ? `Arriving in ${eta} min` : "You are on your trip"}
        </h2>
        <p className="text-gray-400">{eta > 0 ? `Your ${selectedRide.name} is on the way` : "Enjoy your ride!"}</p>
      </div>

      <div className="bg-gray-800 rounded-lg p-3 my-4 flex items-center justify-between">
        <div className="flex items-center">
            <img src={driver.avatarUrl} alt={driver.name} className="h-12 w-12 rounded-full" />
            <div className="ml-3">
                <p className="font-semibold">{driver.name}</p>
                <p className="text-sm text-yellow-400">⭐ 4.9</p>
            </div>
        </div>
        <div className="text-right">
            <p className="font-bold text-lg">Toyota Camry</p>
            <p className="text-sm bg-gray-700 px-2 py-0.5 rounded">ABC-123</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 mt-4">
        <button 
          onClick={onShareRide} 
          disabled={availableSeats <= 0}
          className="bg-gray-700 hover:bg-gray-600 font-semibold py-3 rounded-lg transition disabled:bg-gray-800 disabled:text-gray-500 disabled:cursor-not-allowed flex flex-col items-center justify-center"
        >
          <span>Add Rider</span>
          <span className="text-xs">({availableSeats} seats left)</span>
        </button>
        <button onClick={() => setIsContactModalOpen(true)} className="bg-gray-700 hover:bg-gray-600 font-semibold py-3 rounded-lg transition">
          Contact
        </button>
        <button onClick={() => setIsSafetyPanelOpen(true)} className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-3 rounded-lg transition">
          Safety
        </button>
      </div>
      
      <SafetyPanel isOpen={isSafetyPanelOpen} onClose={() => setIsSafetyPanelOpen(false)} />
      <ContactModal isOpen={isContactModalOpen} user={driver} onClose={() => setIsContactModalOpen(false)} />
    </div>
  );
};

export default InTripView;