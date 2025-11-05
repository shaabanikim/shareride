
import React, { useState, useEffect } from 'react';
import { User, Trip } from '../types';
import DriverHeader from './DriverHeader';
import DriverRegistrationView from './DriverRegistrationView';
import DriverDashboardView from './DriverDashboardView';
import TripRequestModal from './TripRequestModal';
import DriverTripView from './DriverTripView';
import RateRiderView from './RateRiderView';
import DriverEarningsView from './DriverEarningsView';
import DriverProView from './DriverProView';

type DriverState = 'registration' | 'dashboard' | 'onTrip' | 'postTrip' | 'earnings' | 'pro';

interface DriverAppProps {
  user: User;
  onSwitchMode: () => void;
}

const mockTripRequest: Trip = {
    rider: {
        name: 'Alex Ray',
        avatarUrl: 'https://i.pravatar.cc/150?u=a042581f4e29026704a',
    },
    pickup: '123 Main Street, Anytown',
    destination: '456 Oak Ave, Anytown',
    fare: 15.50
};

const DriverApp: React.FC<DriverAppProps> = ({ user, onSwitchMode }) => {
  const [driverState, setDriverState] = useState<DriverState>('registration');
  const [isOnline, setIsOnline] = useState(false);
  const [showTripRequest, setShowTripRequest] = useState(false);
  const [currentTrip, setCurrentTrip] = useState<Trip | null>(null);

  useEffect(() => {
    // Fix: Changed NodeJS.Timeout to ReturnType<typeof setTimeout> for browser compatibility.
    let requestTimer: ReturnType<typeof setTimeout>;
    if (isOnline && driverState === 'dashboard') {
      // Simulate a trip request after a delay
      requestTimer = setTimeout(() => {
        setCurrentTrip(mockTripRequest);
        setShowTripRequest(true);
      }, 8000);
    }
    return () => clearTimeout(requestTimer);
  }, [isOnline, driverState]);
  
  const handleRegistrationSubmit = () => {
    // Simulate API call and approval
    setTimeout(() => {
        setDriverState('dashboard');
    }, 1500);
  };
  
  const handleToggleOnline = (online: boolean) => {
    setIsOnline(online);
    if (!online) {
      setShowTripRequest(false);
      setCurrentTrip(null);
    }
  };

  const handleAcceptTrip = () => {
    setShowTripRequest(false);
    setDriverState('onTrip');
  };

  const handleDeclineTrip = () => {
    setShowTripRequest(false);
    setCurrentTrip(null);
  };

  const handleCompleteTrip = () => {
    setDriverState('postTrip');
  };

  const handleRateRider = () => {
    setCurrentTrip(null);
    setDriverState('dashboard');
  };
  
  const handleNavigate = (view: 'earnings' | 'pro') => {
      setDriverState(view);
  }

  const handleBackToDashboard = () => {
      setDriverState('dashboard');
  }

  const renderContent = () => {
    switch (driverState) {
      case 'registration':
        return <DriverRegistrationView onSubmit={handleRegistrationSubmit} />;
      case 'dashboard':
        return <DriverDashboardView isOnline={isOnline} onNavigate={handleNavigate} />;
      case 'onTrip':
        return <DriverTripView rider={currentTrip!.rider} onCompleteTrip={handleCompleteTrip} />;
      case 'postTrip':
        return <RateRiderView rider={currentTrip!.rider} onComplete={handleRateRider} />;
      case 'earnings':
        return <DriverEarningsView onBack={handleBackToDashboard} />;
      case 'pro':
        return <DriverProView onBack={handleBackToDashboard} />;
      default:
        return null;
    }
  };

  return (
    <>
      <div className="pointer-events-auto">
        <DriverHeader
          user={user}
          onMenuClick={onSwitchMode}
          isOnline={isOnline}
          onToggleOnline={handleToggleOnline}
          showToggle={driverState !== 'registration'}
        />
      </div>
      <div className="flex-grow" />
      <div className="bg-gray-900/80 backdrop-blur-md rounded-2xl p-4 shadow-2xl pointer-events-auto max-h-[60vh] flex flex-col">
         <div className="flex-1 overflow-y-auto">
            {renderContent()}
        </div>
      </div>
      <TripRequestModal 
        isOpen={showTripRequest}
        trip={currentTrip}
        onAccept={handleAcceptTrip}
        onDecline={handleDeclineTrip}
      />
    </>
  );
};

export default DriverApp;
