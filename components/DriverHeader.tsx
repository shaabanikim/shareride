import React from 'react';
import { User } from '../types';

interface DriverHeaderProps {
  user: User;
  onMenuClick: () => void;
  isOnline: boolean;
  onToggleOnline: (isOnline: boolean) => void;
  showToggle: boolean;
}

const MenuIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16m-7 6h7" />
  </svg>
);

const DriverHeader: React.FC<DriverHeaderProps> = ({ user, onMenuClick, isOnline, onToggleOnline, showToggle }) => {
  return (
    <div className="flex justify-between items-center">
      <button onClick={onMenuClick} className="p-2 rounded-full hover:bg-gray-800 transition">
        <MenuIcon />
      </button>

      {showToggle && (
         <div className="flex items-center space-x-2">
            <span className={`text-sm font-medium ${isOnline ? 'text-green-400' : 'text-gray-400'}`}>{isOnline ? 'Online' : 'Offline'}</span>
            <button
                onClick={() => onToggleOnline(!isOnline)}
                className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors duration-300 focus:outline-none ${isOnline ? 'bg-green-500' : 'bg-gray-600'}`}
            >
                <span className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform duration-300 ${isOnline ? 'translate-x-6' : 'translate-x-1'}`} />
            </button>
        </div>
      )}

      <div className="flex items-center space-x-3">
        <img
          src={user.avatarUrl}
          alt={user.name}
          className="h-10 w-10 rounded-full border-2 border-gray-700"
        />
      </div>
    </div>
  );
};

export default DriverHeader;
