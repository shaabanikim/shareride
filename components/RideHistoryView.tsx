import React from 'react';
import { handleShare } from './utils';

const ShareIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
    </svg>
);


interface RideHistoryViewProps {
  onBack: () => void;
}

const BackIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
    </svg>
);

const mockRides = [
    { id: 1, date: 'Today, 6:30 PM', from: '123 Main Street, Anytown', to: '456 Oak Ave, Anytown', price: '$15.50', type: 'ShareRide X' },
    { id: 2, date: 'Yesterday, 9:00 AM', from: 'Anytown Airport (ATW)', to: 'Downtown Hotel', price: '$28.00', type: 'Comfort' },
    { id: 3, date: 'Oct 15, 2023', from: 'Central Park', to: 'Brooklyn Museum', price: '$22.75', type: 'ShareRide X' },
    { id: 4, date: 'Oct 12, 2023', from: 'Grand Central Terminal', to: 'JFK Airport', price: '$65.00', type: 'ShareRide Black' },
    { id: 5, date: 'Oct 10, 2023', from: 'Work Office', to: 'Home', price: '$12.20', type: 'Motorcycle' },
];

const RideHistoryView: React.FC<RideHistoryViewProps> = ({ onBack }) => {

  const shareTrip = (e: React.MouseEvent, ride: typeof mockRides[0]) => {
    e.stopPropagation(); // Prevent the main card click event
    handleShare(
        `My ${ride.type} Trip`,
        `Check out my ShareRide trip from ${ride.from} to ${ride.to} for ${ride.price}!`
    );
  }

  return (
    <div className="text-white flex flex-col">
      <div className="flex items-center mb-4">
        <button onClick={onBack} className="p-2 rounded-full hover:bg-gray-700 transition mr-2">
          <BackIcon />
        </button>
        <h2 className="text-xl font-bold">Ride History</h2>
      </div>

      <div className="flex-1 overflow-y-auto max-h-80 pr-2 space-y-3">
        {mockRides.map(ride => (
          <div key={ride.id} className="p-4 bg-gray-800 rounded-lg hover:bg-gray-700/50 transition-colors cursor-pointer">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-semibold text-white">{ride.type}</p>
                <p className="text-sm text-gray-400">{ride.date}</p>
              </div>
              <p className="font-bold text-white">{ride.price}</p>
            </div>
            <div className="mt-3 pt-3 border-t border-gray-700">
                <div className="flex items-center text-sm text-gray-300">
                    <div className="w-2.5 h-2.5 bg-gray-400 rounded-full mr-3 flex-shrink-0"></div>
                    <span className="truncate">{ride.from}</span>
                </div>
                 <div className="flex items-center text-sm text-gray-300 mt-2">
                    <div className="w-2.5 h-2.5 bg-white mr-3 flex-shrink-0"></div>
                    <span className="truncate">{ride.to}</span>
                </div>
            </div>
            <div className="mt-3 text-right">
                <button onClick={(e) => shareTrip(e, ride)} className="inline-flex items-center px-3 py-1 text-xs font-semibold bg-gray-700 hover:bg-gray-600 rounded-full transition">
                    <ShareIcon />
                    <span className="ml-1.5">Share</span>
                </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RideHistoryView;