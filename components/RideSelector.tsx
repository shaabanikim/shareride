import React, { useState } from 'react';
import { Ride } from '../types';
import { RIDE_OPTIONS } from '../constants';
import RideOption from './RideOption';
import { handleShare } from './utils';

const ShareIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
    </svg>
);


interface RideSelectorProps {
  selectedRide: Ride | null;
  onSelectRide: (ride: Ride) => void;
  onConfirm: (fare: number) => void;
  paymentMethod: string;
}

const RideSelector: React.FC<RideSelectorProps> = ({ selectedRide, onSelectRide, onConfirm, paymentMethod }) => {
  const [isShared, setIsShared] = useState(false);

  // Mocked base price and ETA
  const basePrice = 12.50;
  const eta = 8;
  
  const getMaxCapacity = (capacity: string): number => {
    if (capacity.includes('-')) {
        return parseInt(capacity.split('-')[1], 10);
    }
    return parseInt(capacity, 10);
  };

  let finalPrice = 0;
  if (selectedRide) {
    const rideBasePrice = basePrice * selectedRide.multiplier;
    if (isShared) {
        // For motorcycles, a 'shared' ride is a promotional fare.
        if (selectedRide.name === 'Motorcycle') {
            finalPrice = rideBasePrice * 0.8;
        } else {
            // For other vehicles, divide the fare by the number of seats.
            const totalSeatsInVehicle = getMaxCapacity(selectedRide.capacity);
            finalPrice = rideBasePrice / totalSeatsInVehicle;
        }
    } else {
        finalPrice = rideBasePrice;
    }
  }

  const shareRideDetails = () => {
    const rideInfo = selectedRide 
        ? `I'm looking at a ${selectedRide.name} ride on ShareRide!` 
        : "I'm planning a trip on ShareRide. Check it out!";
    handleShare('ShareRide Trip', rideInfo);
  };


  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-xl font-bold text-white">Choose a ride</h2>
        <div className="flex items-center space-x-4">
             <button onClick={shareRideDetails} className="p-2 rounded-full hover:bg-gray-700 transition">
                <ShareIcon />
            </button>
            <div className="flex items-center">
                <span className="text-sm text-gray-300 mr-2">Share & save</span>
                 <button
                    onClick={() => setIsShared(prev => !prev)}
                    className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors duration-300 focus:outline-none ${isShared ? 'bg-cyan-500' : 'bg-gray-600'}`}
                >
                    <span className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform duration-300 ${isShared ? 'translate-x-6' : 'translate-x-1'}`} />
                </button>
            </div>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto pr-2 space-y-3">
        {RIDE_OPTIONS.map((ride) => (
          <RideOption
            key={ride.id}
            ride={ride}
            basePrice={basePrice * ride.multiplier}
            eta={eta}
            isSelected={selectedRide?.id === ride.id}
            isShared={isShared}
            onClick={() => onSelectRide(ride)}
          />
        ))}
      </div>
      
      <div className="mt-4 pt-4 border-t border-gray-700">
        <div className="flex justify-between items-center text-sm mb-3">
          <span className="text-gray-400">Payment</span>
          <span className="font-semibold text-white">{paymentMethod}</span>
        </div>
        <button
          onClick={() => onConfirm(finalPrice)}
          disabled={!selectedRide}
          className="w-full bg-cyan-500 text-white font-bold py-3 rounded-lg transition-colors duration-300 disabled:bg-gray-600 disabled:cursor-not-allowed hover:bg-cyan-600"
        >
          {selectedRide ? `Confirm Ride - $${finalPrice.toFixed(2)}` : 'Select a Ride'}
        </button>
      </div>
    </div>
  );
};

export default RideSelector;