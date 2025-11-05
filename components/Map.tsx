import React, { useState } from 'react';

// A simple, abstract SVG map background that matches the app's dark theme.
const MapBackground = () => (
    <svg width="100%" height="100%" viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice" className="absolute inset-0">
        <rect width="800" height="600" fill="#242f3e" />
        {/* Roads */}
        <path d="M100,0 V600" stroke="#38414e" strokeWidth="15" />
        <path d="M300,0 V600" stroke="#38414e" strokeWidth="25" />
        <path d="M500,0 V600" stroke="#38414e" strokeWidth="10" />
        <path d="M750,0 V600" stroke="#38414e" strokeWidth="15" />
        <path d="M0,100 H800" stroke="#38414e" strokeWidth="10" />
        <path d="M0,250 H800" stroke="#38414e" strokeWidth="20" />
        <path d="M0,500 H800" stroke="#38414e" strokeWidth="15" />
        {/* Curved road */}
        <path d="M 50 150 C 200 200, 400 100, 600 200 S 750 300, 750 400" stroke="#38414e" strokeWidth="12" fill="none" />
        {/* Park */}
        <rect x="550" y="50" width="150" height="100" fill="#263c3f" rx="10" />
        {/* Water */}
        <path d="M 0 550 C 100 520, 200 580, 300 560 S 500 520, 600 550 S 700 580, 800 550 L 800 600 L 0 600 Z" fill="#17263c" />
    </svg>
);


interface MapProps {
    userMode: 'rider' | 'driver';
    userLocation: { lat: number; lon: number } | null;
}

const Map: React.FC<MapProps> = ({ userMode, userLocation }) => {
  const [showTraffic, setShowTraffic] = useState(false);

  return (
    <div className="absolute inset-0 bg-gray-800 overflow-hidden">
        <MapBackground />

        {/* Overlays */}
        <div className="absolute inset-0 pointer-events-none">
             {/* User's Current Location Marker */}
            {userLocation && (
                <div title="Your Location" className="absolute" style={{ top: '50%', left: '50%' }}>
                    <div className="w-4 h-4 bg-blue-500 rounded-full border-2 border-white shadow-lg animate-pulse"></div>
                </div>
            )}
            
            {userMode === 'rider' && (
                // Suggested Pickup Marker
                <div title="Suggested Pickup Point" className="absolute" style={{ top: '40%', left: '40%' }}>
                    <div className="w-5 h-5 bg-cyan-400 rounded-full border-2 border-white"></div>
                     <div className="relative">
                         <div className="absolute -top-10 -left-16 text-xs bg-gray-900/80 text-white px-2 py-1 rounded-md whitespace-nowrap">
                            Suggested Pickup
                         </div>
                     </div>
                </div>
            )}

            {userMode === 'driver' && (
                <>
                    {/* Heatmap Zones */}
                    <div 
                      className="absolute rounded-full"
                      style={{
                        top: '15%', left: '30%', width: '150px', height: '150px',
                        background: 'radial-gradient(circle, rgba(220, 38, 38, 0.5) 0%, rgba(220, 38, 38, 0) 70%)'
                      }}
                    />
                    <div 
                      className="absolute rounded-full"
                      style={{
                        top: '60%', left: '55%', width: '200px', height: '200px',
                        background: 'radial-gradient(circle, rgba(220, 38, 38, 0.4) 0%, rgba(220, 38, 38, 0) 70%)'
                      }}
                    />

                    {/* Traffic Lines */}
                    {showTraffic && (
                      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 800 600" preserveAspectRatio="none">
                          <path d="M300,0 V250" stroke="orange" strokeWidth="5" strokeOpacity="0.9" fill="none" />
                          <path d="M300,250 V600" stroke="#B91C1C" strokeWidth="6" strokeOpacity="0.9" fill="none" />
                          <path d="M0,250 H300" stroke="orange" strokeWidth="5" strokeOpacity="0.9" fill="none" />
                          <path d="M300,250 H800" stroke="#B91C1C" strokeWidth="6" strokeOpacity="0.9" fill="none" />
                      </svg>
                    )}
                </>
            )}
        </div>

        {/* UI Controls for Driver */}
        {userMode === 'driver' && (
            <div className="absolute top-24 right-4 z-10 pointer-events-auto">
                <button
                    onClick={() => setShowTraffic(prev => !prev)}
                    className={`px-3 py-2 text-sm font-semibold rounded-md shadow-lg transition ${showTraffic ? 'bg-cyan-500 text-white' : 'bg-gray-800 text-gray-300'}`}
                >
                    {showTraffic ? 'Hide Traffic' : 'Show Traffic'}
                </button>
            </div>
        )}
    </div>
  );
};

export default Map;