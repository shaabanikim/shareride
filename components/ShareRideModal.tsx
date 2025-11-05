import React from 'react';
import { handleShare } from './utils';

interface ShareRideModalProps {
  isOpen: boolean;
  onClose: () => void;
  onShare: () => void; // This will now just be a callback after sharing is complete
  availableSeats: number;
}

const ShareRideModal: React.FC<ShareRideModalProps> = ({ isOpen, onClose, onShare, availableSeats }) => {
  if (!isOpen) return null;

  const shareInvite = () => {
    handleShare(
      'Join my ShareRide!',
      `I'm on a trip and have ${availableSeats} seat(s) available. Join my ride using this link!`,
      'https://shareride.example.com/join/trip/12345' // Mock URL
    ).then(() => {
        onShare(); // Call the original onShare handler after the dialog closes
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4">
      <div className="bg-gray-800 rounded-2xl w-full max-w-sm text-white shadow-lg animate-fade-in-up">
        <div className="p-6 text-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12s-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
          </svg>
          <h2 className="text-xl font-bold mt-4">Share Your Ride?</h2>
          <p className="text-gray-400 mt-2">
            You have <span className="font-bold text-white">{availableSeats}</span> seat{availableSeats !== 1 && 's'} available. Send an invite to a friend to join your trip.
          </p>
        </div>
        
        <div className="flex p-4 space-x-3 border-t border-gray-700">
          <button onClick={onClose} className="flex-1 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg font-bold transition">
            Cancel
          </button>
          <button 
            onClick={shareInvite}
            className="flex-1 py-3 bg-cyan-500 hover:bg-cyan-600 rounded-lg font-bold transition"
          >
            Share Invite Link
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShareRideModal;