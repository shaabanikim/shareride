import React from 'react';
import { Ride } from '../types';

interface RideOptionProps {
  ride: Ride;
  basePrice: number;
  eta: number;
  isSelected: boolean;
  isShared: boolean;
  onClick: () => void;
}

const UserIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
  </svg>
);

const RideOption: React.FC<RideOptionProps> = ({ ride, basePrice, eta, isSelected, isShared, onClick }) => {
  const selectedClasses = isSelected
    ? 'bg-gray-700 border-cyan-400'
    : 'bg-gray-800 border-gray-800 hover:border-gray-600';

  const getMaxCapacity = (capacity: string): number => {
    if (capacity.includes('-')) {
        return parseInt(capacity.split('-')[1], 10);
    }
    return parseInt(capacity, 10);
  };

  const getCapacityText = (capacity: string, isShared: boolean): string => {
    if (isShared) {
        return '1 Seat Available';
    }
    const maxCapacity = getMaxCapacity(capacity);
    return `${maxCapacity} Seat${maxCapacity !== 1 ? 's' : ''} Available`;
  };
  
  const totalSeatsInVehicle = getMaxCapacity(ride.capacity);

  let sharedPrice;
  // For motorcycles, a 'shared' ride is a promotional fare at 80% of the base price.
  if (ride.name === 'Motorcycle') {
    sharedPrice = basePrice * 0.8;
  } else {
    // For other vehicles, the shared fare is the base price divided equally among all available seats.
    sharedPrice = basePrice / totalSeatsInVehicle;
  }

  return (
    <div
      onClick={onClick}
      className={`flex items-center p-3 rounded-lg cursor-pointer transition-all duration-200 border-2 ${selectedClasses}`}
    >
      <div className="text-gray-300">{ride.icon}</div>
      <div className="flex-1 ml-4">
        <div className="flex justify-between items-start">
          <h3 className="font-bold text-lg text-white">{ride.name}</h3>
          {isShared ? (
            <div className="text-right">
                <div className="flex items-baseline justify-end">
                    <p className="font-bold text-lg text-white mr-2">${sharedPrice.toFixed(2)}</p>
                    <p className="font-bold text-sm text-gray-500 line-through">${basePrice.toFixed(2)}</p>
                </div>
                <p className="text-xs text-gray-400">
                    {ride.name === 'Motorcycle' ? 'Promotional fare' : `Your share (1 of ${totalSeatsInVehicle})`}
                </p>
            </div>
          ) : (
            <p className="font-bold text-lg text-white">${basePrice.toFixed(2)}</p>
          )}
        </div>
        <div className="flex justify-between items-baseline text-sm mt-1">
          <div className="flex items-center text-gray-400">
            <span>{ride.description}</span>
            <span className="mx-2">·</span>
            <UserIcon />
            <span className="ml-1">{getCapacityText(ride.capacity, isShared)}</span>
          </div>
          <p className="text-gray-400">{eta} min</p>
        </div>
      </div>
    </div>
  );
};

export default RideOption;