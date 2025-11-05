import React, { useRef } from 'react';
import { User } from '../types';

const BackIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
    </svg>
);

interface ProfileViewProps {
  user: User;
  onUpdateAvatar: (url: string) => void;
  onBack: () => void;
}

const ProfileView: React.FC<ProfileViewProps> = ({ user, onUpdateAvatar, onBack }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePhotoClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onUpdateAvatar(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
        alert("Please select a valid image file.");
    }
  };

  return (
    <div className="text-white">
      <div className="flex items-center mb-6">
        <button onClick={onBack} className="p-2 rounded-full hover:bg-gray-700 transition mr-2">
          <BackIcon />
        </button>
        <h2 className="text-xl font-bold">Edit Profile</h2>
      </div>

      <div className="flex flex-col items-center">
        <div className="relative group cursor-pointer" onClick={handlePhotoClick}>
          <img
            src={user.avatarUrl}
            alt={user.name}
            className="h-32 w-32 rounded-full border-4 border-gray-700 object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <span className="text-white text-sm font-semibold">Change</span>
          </div>
        </div>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          className="hidden"
        />

        <p className="text-2xl font-bold mt-4">{user.name}</p>
        <p className="text-gray-400">Rider & Driver</p>

        <button 
          onClick={handlePhotoClick} 
          className="mt-6 bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2 px-6 rounded-lg transition"
        >
          Change Photo
        </button>
      </div>
    </div>
  );
};

export default ProfileView;
