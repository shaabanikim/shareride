
import React from 'react';

const EarningsIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" /></svg>;
const ProIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>;

interface DriverDashboardViewProps {
    isOnline: boolean;
    onNavigate: (view: 'earnings' | 'pro') => void;
}

const DriverDashboardView: React.FC<DriverDashboardViewProps> = ({ isOnline, onNavigate }) => {
    return (
        <div className="text-center">
            <h2 className="text-3xl font-bold text-white">
                {isOnline ? "You're Online" : "You're Offline"}
            </h2>
            <p className="text-gray-400 mt-2">
                {isOnline ? "Waiting for ride requests..." : "Go online to start receiving requests."}
            </p>

            <div className="mt-8 space-y-3">
                 <button onClick={() => onNavigate('earnings')} className="w-full flex items-center p-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition">
                    <EarningsIcon />
                    <span className="ml-4 font-semibold">Earnings</span>
                </button>
                 <button onClick={() => onNavigate('pro')} className="w-full flex items-center p-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition">
                    <ProIcon />
                    <span className="ml-4 font-semibold">ShareRide Pro</span>
                </button>
            </div>
        </div>
    );
};

export default DriverDashboardView;
