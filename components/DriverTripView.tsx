import React from 'react';
import { User } from '../types';

interface DriverTripViewProps {
  rider: User;
  onCompleteTrip: () => void;
}

const DriverTripView: React.FC<DriverTripViewProps> = ({ rider, onCompleteTrip }) => {
  return (
    <div className="text-white animate-fade-in">
      <div className="text-center mb-4">
        <h2 className="text-2xl font-bold">On Trip</h2>
        <p className="text-gray-400">Driving to destination</p>
      </div>

      <div className="bg-gray-800 rounded-lg p-3 my-4 flex items-center justify-between">
        <div className="flex items-center">
            <img src={rider.avatarUrl} alt={rider.name} className="h-12 w-12 rounded-full" />
            <div className="ml-3">
                <p className="font-semibold">Rider: {rider.name}</p>
                <p className="text-sm text-gray-400">Destination: 456 Oak Ave</p>
            </div>
        </div>
      </div>

      {/* Mock Navigation UI */}
      <div className="bg-gray-800 rounded-lg p-3 my-4 text-center">
        <p className="text-lg font-bold">Next Turn: Left on Maple St</p>
        <p className="text-gray-400">in 200 meters</p>
      </div>

      <button 
        onClick={onCompleteTrip} 
        className="w-full mt-4 bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-lg transition"
      >
        Complete Trip
      </button>
    </div>
  );
};

export default DriverTripView;
