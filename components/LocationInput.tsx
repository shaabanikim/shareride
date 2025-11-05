import React from 'react';

interface LocationInputProps {
  userLocation: { lat: number; lon: number } | null;
  locationError: string | null;
}

const LocationInput: React.FC<LocationInputProps> = ({ userLocation, locationError }) => {
  const getPlaceholderText = () => {
    if (locationError) return "Could not get location";
    if (!userLocation) return "Fetching location...";
    return "Current Location";
  };

  return (
    <div>
      <div className="relative mb-1">
        <div className="absolute top-1/2 -translate-y-1/2 left-3 flex items-center pointer-events-none">
          <div className="w-2.5 h-2.5 bg-gray-400 rounded-full"></div>
        </div>
        <input
          type="text"
          placeholder={getPlaceholderText()}
          defaultValue={userLocation ? "Your Current Location" : ""}
          readOnly
          className="w-full bg-gray-800 text-white border border-gray-700 rounded-lg py-3 pl-8 pr-4 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition"
        />
      </div>
       {locationError && (
        <p className="text-xs text-red-400 px-2 mb-2">{locationError}</p>
      )}
       {!locationError && (
        <div className="text-center text-xs text-cyan-400 mb-2">
            For a faster pickup, meet at 125 Main Street
        </div>
       )}
      <div className="relative">
        <div className="absolute top-1/2 -translate-y-1/2 left-3 flex items-center pointer-events-none">
          <div className="w-2.5 h-2.5 bg-white"></div>
        </div>
        <input
          type="text"
          placeholder="Where to?"
          className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg py-3 pl-8 pr-4 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition"
        />
      </div>
    </div>
  );
};

export default LocationInput;