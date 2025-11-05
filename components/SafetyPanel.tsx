import React from 'react';
import { handleShare } from './utils';

interface SafetyPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const SafetyPanel: React.FC<SafetyPanelProps> = ({ isOpen, onClose }) => {

  const shareTripStatus = () => {
    handleShare(
      'My ShareRide Trip', 
      'I\'m on my way with ShareRide. You can follow my trip status here!', 
      'https://shareride.example.com/trip/12345' // Mock URL
    );
  };

  return (
    <>
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-black z-40 transition-opacity duration-300 ${isOpen ? 'opacity-50' : 'opacity-0 pointer-events-none'}`}
      />
      <div
        className={`fixed bottom-0 left-0 w-full bg-gray-900 p-4 rounded-t-2xl z-50 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-y-0' : 'translate-y-full'}`}
      >
        <div className="w-12 h-1.5 bg-gray-700 rounded-full mx-auto mb-4" />
        <h2 className="text-xl font-bold text-center text-white mb-4">Safety Tools</h2>
        <div className="space-y-3">
          <button onClick={() => alert('Emergency services contacted!')} className="w-full flex items-center p-4 bg-red-600/80 rounded-lg text-white font-bold transition hover:bg-red-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
            Emergency Assistance
          </button>
          <button onClick={shareTripStatus} className="w-full flex items-center p-4 bg-gray-800 rounded-lg text-white transition hover:bg-gray-700">
             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12s-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" /></svg>
            Share Trip Status
          </button>
          <button onClick={() => alert('Safety issue reported.')} className="w-full flex items-center p-4 bg-gray-800 rounded-lg text-white transition hover:bg-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6H8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" /></svg>
            Report Safety Issue
          </button>
        </div>
      </div>
    </>
  );
};

export default SafetyPanel;