import React from 'react';

const BackIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
    </svg>
);

const ChevronRightIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
);

interface HelpCenterViewProps {
  onBack: () => void;
}

const helpTopics = [
    { title: 'A recent trip', description: 'Get help with a trip that just ended.' },
    { title: 'Account & Payment Options', description: 'Manage your account and payment methods.' },
    { title: 'Safety & Security', description: 'Learn about our safety features.' },
    { title: 'Using ShareRide', description: 'A guide to getting the most out of the app.' },
    { title: 'COVID-19 Safety', description: 'Information on our health and safety policies.' },
];

const HelpCenterView: React.FC<HelpCenterViewProps> = ({ onBack }) => {
  return (
    <div className="text-white">
      <div className="flex items-center mb-4">
        <button onClick={onBack} className="p-2 rounded-full hover:bg-gray-700 transition mr-2">
          <BackIcon />
        </button>
        <h2 className="text-xl font-bold">Help Center</h2>
      </div>

      <div className="space-y-3">
        <input
          type="text"
          placeholder="Search help topics..."
          className="w-full bg-gray-800 text-white border border-gray-700 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition mb-2"
        />

        {helpTopics.map(topic => (
          <button key={topic.title} className="w-full flex justify-between items-center p-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition text-left">
            <div>
              <p className="font-semibold">{topic.title}</p>
              <p className="text-sm text-gray-400">{topic.description}</p>
            </div>
            <ChevronRightIcon />
          </button>
        ))}
      </div>
    </div>
  );
};

export default HelpCenterView;
