import React from 'react';
import { User } from '../types';

const ProfileIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>;
const RideHistoryIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
const PaymentIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>;
const HelpIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
const LogoutIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>;
const SwitchIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" /></svg>;

interface SideMenuProps {
  isOpen: boolean;
  user: User;
  onClose: () => void;
  onNavigate: (view: 'main' | 'history' | 'payment' | 'help' | 'profile') => void;
  onLogout: () => void;
  onSwitchMode: () => void;
  userMode: 'rider' | 'driver';
}

const SideMenu: React.FC<SideMenuProps> = ({ isOpen, user, onClose, onNavigate, onLogout, onSwitchMode, userMode }) => {
  const menuItems = [
    { text: 'Profile', icon: <ProfileIcon />, action: () => onNavigate('profile') },
    { text: 'Ride History', icon: <RideHistoryIcon />, action: () => onNavigate('history') },
    { text: 'Payment', icon: <PaymentIcon />, action: () => onNavigate('payment') },
    { text: 'Help', icon: <HelpIcon />, action: () => onNavigate('help') },
    { text: `Switch to ${userMode === 'rider' ? 'Driving' : 'Riding'}`, icon: <SwitchIcon />, action: onSwitchMode },
    { text: 'Log Out', icon: <LogoutIcon />, action: onLogout },
  ];
  
  return (
    <>
      <div 
        onClick={onClose}
        className={`fixed inset-0 bg-black z-20 transition-opacity duration-300 ${isOpen ? 'opacity-50' : 'opacity-0 pointer-events-none'}`}
      />
      <div className={`fixed top-0 left-0 h-full bg-gray-900 w-72 z-30 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-6 h-full flex flex-col text-white">
          <div className="flex items-center mb-8">
             <img src={user.avatarUrl} alt={user.name} className="h-12 w-12 rounded-full" />
             <div className="ml-3">
                <p className="font-semibold text-lg">{user.name}</p>
             </div>
          </div>

          <nav className="flex-1">
            <ul className="space-y-2">
              {menuItems.map(item => (
                <li key={item.text}>
                  <button onClick={item.action} className="w-full flex items-center p-3 rounded-lg text-lg text-gray-300 hover:bg-gray-800 hover:text-white transition-colors">
                    {item.icon}
                    <span>{item.text}</span>
                  </button>
                </li>
              ))}
            </ul>
          </nav>
          <div className="text-xs text-gray-500">
            Version 1.0.0
          </div>
        </div>
      </div>
    </>
  );
};

export default SideMenu;