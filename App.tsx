import React, { useState, useEffect } from 'react';
import { Ride, User } from './types';
import Map from './components/Map';
import ProfileHeader from './components/ProfileHeader';
import SideMenu from './components/SideMenu';
import LocationInput from './components/LocationInput';
import RideSelector from './components/RideSelector';
import InTripView from './components/InTripView';
import PostRideView from './components/PostRideView';
import Login from './components/Login';
import DriverApp from './components/DriverApp';
import RideHistoryView from './components/RideHistoryView';
import PaymentView from './components/PaymentView';
import HelpCenterView from './components/HelpCenterView';
import ProfileView from './components/ProfileView';
import MpesaPaymentModal from './components/MpesaPaymentModal';
import NotificationBanner from './components/NotificationBanner';
import ShareRideModal from './components/ShareRideModal';

type AppState = 'login' | 'main' | 'selectingRide' | 'inTrip' | 'postRide' | 'menuView';
type MenuView = 'history' | 'payment' | 'help' | 'profile';

const mockUser: User = {
  name: 'Jane Doe',
  avatarUrl: 'https://i.pravatar.cc/150?u=a042581f4e29026704d',
};

const mockDriver: User = {
  name: 'John Smith',
  avatarUrl: 'https://i.pravatar.cc/150?u=a042581f4e29026704e',
};

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>('login');
  const [userMode, setUserMode] = useState<'rider' | 'driver'>('rider');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userLocation, setUserLocation] = useState<{ lat: number; lon: number } | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [selectedRide, setSelectedRide] = useState<Ride | null>(null);
  const [currentUser, setCurrentUser] = useState<User>(mockUser);
  const [currentMenuView, setCurrentMenuView] = useState<MenuView | null>(null);
  const [mpesaNumber, setMpesaNumber] = useState<string>('0712345678');
  const [isMpesaPaymentOpen, setIsMpesaPaymentOpen] = useState(false);
  const [paymentFare, setPaymentFare] = useState<number | null>(null);
  const [notification, setNotification] = useState<{message: string, type: 'info' | 'success' | 'error'} | null>(null);
  const [isShareRideModalOpen, setIsShareRideModalOpen] = useState(false);


  useEffect(() => {
    if (appState !== 'login') {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          });
          setLocationError(null);
        },
        (error) => {
          setLocationError(`Error: ${error.message}`);
        },
        { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
      );
    }
  }, [appState]);

  const handleLogin = () => {
    setAppState('main');
  };

  const handleLogout = () => {
    setIsMenuOpen(false);
    setAppState('login');
  };

  const handleSelectRide = (ride: Ride) => {
    setSelectedRide(ride);
    setAppState('selectingRide');
  };

  const handleConfirmRide = (fare: number) => {
    if (selectedRide) {
      setPaymentFare(fare);
      setIsMpesaPaymentOpen(true);
    }
  };
  
  const handleMpesaComplete = (success: boolean) => {
    setIsMpesaPaymentOpen(false);
    setPaymentFare(null);
    if (success) {
      setAppState('inTrip');
    }
  };

  const handleFinishTrip = () => {
    setAppState('postRide');
  };
  
  const handlePostRideComplete = () => {
      setSelectedRide(null);
      setAppState('main');
  };

  const handleSwitchMode = () => {
    setUserMode(prev => prev === 'rider' ? 'driver' : 'rider');
    setIsMenuOpen(false);
    setAppState('main');
  };

  const handleNavigateMenu = (view: MenuView) => {
    setCurrentMenuView(view);
    setAppState('menuView');
    setIsMenuOpen(false);
  }

  const handleBackToMain = () => {
    setCurrentMenuView(null);
    setAppState('main');
  }

  const handleUpdateAvatar = (url: string) => {
    setCurrentUser(prev => ({ ...prev, avatarUrl: url }));
  }
  
  const handleShareInvite = () => {
    setIsShareRideModalOpen(false);
    setNotification({ message: 'Ride invite sent!', type: 'success' });
  };

  const getMaxCapacity = (capacity: string): number => {
    if (capacity.includes('-')) {
        return parseInt(capacity.split('-')[1], 10);
    }
    return parseInt(capacity, 10);
  };

  const availableSeats = selectedRide ? getMaxCapacity(selectedRide.capacity) - 1 : 0;

  const renderRiderContent = () => {
    switch (appState) {
      case 'main':
      case 'selectingRide':
        return <RideSelector 
                  selectedRide={selectedRide} 
                  onSelectRide={handleSelectRide} 
                  onConfirm={handleConfirmRide}
                  paymentMethod={`M-Pesa: ${mpesaNumber}`}
                />;
      case 'inTrip':
        return <InTripView driver={mockDriver} selectedRide={selectedRide!} onFinishTrip={handleFinishTrip} onShareRide={() => setIsShareRideModalOpen(true)} />;
      case 'postRide':
        return <PostRideView driver={mockDriver} rideDetails={selectedRide!} onComplete={handlePostRideComplete} />;
      case 'menuView':
          switch(currentMenuView) {
            case 'history': return <RideHistoryView onBack={handleBackToMain} />;
            case 'payment': return <PaymentView onBack={handleBackToMain} mpesaNumber={mpesaNumber} onSetMpesaNumber={setMpesaNumber} />;
            case 'help': return <HelpCenterView onBack={handleBackToMain} />;
            case 'profile': return <ProfileView user={currentUser} onUpdateAvatar={handleUpdateAvatar} onBack={handleBackToMain} />;
            default: return null;
          }
      default:
        return null;
    }
  };

  if (appState === 'login') {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="h-screen w-screen bg-gray-900 text-gray-200 flex flex-col overflow-hidden">
      <Map userMode={userMode} userLocation={userLocation} />

      <div className="absolute top-4 left-4 right-4 z-10 pointer-events-auto">
        {notification && <NotificationBanner message={notification.message} type={notification.type} onClose={() => setNotification(null)} />}
      </div>

      <div className="absolute inset-0 p-4 md:p-6 flex flex-col pointer-events-none">
        {userMode === 'rider' ? (
          <>
            <div className="pointer-events-auto">
              <ProfileHeader user={currentUser} onMenuClick={() => setIsMenuOpen(true)} />
            </div>
            <div className="flex-grow" />
            <div className="bg-gray-900/80 backdrop-blur-md rounded-2xl p-4 shadow-2xl pointer-events-auto max-h-[60vh] flex flex-col">
                {(appState === 'main' || appState === 'selectingRide') && <LocationInput userLocation={userLocation} locationError={locationError}/>}
                <div className={`${(appState === 'main' || appState === 'selectingRide') ? 'mt-4' : ''} flex-1 overflow-y-auto`}>
                    {renderRiderContent()}
                </div>
            </div>
          </>
        ) : (
          <DriverApp user={currentUser} onSwitchMode={handleSwitchMode} />
        )}
      </div>
      
      <SideMenu
        isOpen={isMenuOpen}
        user={currentUser}
        onClose={() => setIsMenuOpen(false)}
        onNavigate={handleNavigateMenu as any}
        onLogout={handleLogout}
        onSwitchMode={handleSwitchMode}
        userMode={userMode}
      />
      
      <MpesaPaymentModal
        isOpen={isMpesaPaymentOpen}
        phoneNumber={mpesaNumber}
        fare={paymentFare}
        onComplete={handleMpesaComplete}
        onClose={() => setIsMpesaPaymentOpen(false)}
      />
      
      <ShareRideModal
        isOpen={isShareRideModalOpen}
        onClose={() => setIsShareRideModalOpen(false)}
        onShare={handleShareInvite}
        availableSeats={availableSeats}
      />
    </div>
  );
};

export default App;