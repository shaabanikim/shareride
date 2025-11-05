// Fix: Implemented the ProfileHeader component to display user information and a menu toggle button.
// This resolves the syntax errors caused by placeholder content.
import React from 'react';
import { User } from '../types';

interface ProfileHeaderProps {
  user: User;
  onMenuClick: () => void;
}

const MenuIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16m-7 6h7" />
  </svg>
);

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ user, onMenuClick }) => {
  return (
    <div className="flex justify-between items-center">
      <button onClick={onMenuClick} className="p-2 rounded-full hover:bg-gray-800 transition">
        <MenuIcon />
      </button>
      <div className="flex items-center space-x-3">
        <span className="font-semibold text-white">{user.name}</span>
        <img
          src={user.avatarUrl}
          alt={user.name}
          className="h-10 w-10 rounded-full border-2 border-gray-700"
        />
      </div>
    </div>
  );
};

export default ProfileHeader;
