
import React, { useEffect, useState } from 'react';

interface NotificationBannerProps {
  message: string;
  type: 'info' | 'success' | 'error';
  onClose: () => void;
}

const NotificationBanner: React.FC<NotificationBannerProps> = ({ message, type, onClose }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
    const timer = setTimeout(() => {
      handleClose();
    }, 5000);
    return () => clearTimeout(timer);
  }, [message]);

  const handleClose = () => {
    setVisible(false);
    // Allow for fade-out transition before calling onClose
    const closeTimer = setTimeout(onClose, 300);
    return () => clearTimeout(closeTimer);
  };

  const baseClasses = "w-full p-3 rounded-lg flex items-center justify-between shadow-lg transition-all duration-300";
  const typeClasses = {
    info: 'bg-cyan-500/80 backdrop-blur text-white',
    success: 'bg-green-500/80 backdrop-blur text-white',
    error: 'bg-red-500/80 backdrop-blur text-white',
  };

  return (
    <div
      className={`${baseClasses} ${typeClasses[type]} ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full'}`}
    >
      <span>{message}</span>
      <button onClick={handleClose} className="p-1 rounded-full hover:bg-white/20">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
};

export default NotificationBanner;
