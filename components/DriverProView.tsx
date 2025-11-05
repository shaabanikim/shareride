import React from 'react';

const BackIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
    </svg>
);

const GasIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
    </svg>
);

const ToolIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
    </svg>
);

const GraduationCapIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path d="M12 14l9-5-9-5-9 5 9 5z" />
        <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-5.022 12.083 12.083 0 01.665-6.479L12 14z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5zm0 0v6" />
    </svg>
);

interface DriverProViewProps {
    onBack: () => void;
}

const DriverProView: React.FC<DriverProViewProps> = ({ onBack }) => {
    return (
        <div className="h-full flex flex-col text-white">
            <div className="flex items-center p-4 border-b border-gray-800">
                <button onClick={onBack} className="p-2 rounded-full hover:bg-gray-700 transition mr-2">
                    <BackIcon />
                </button>
                <h2 className="text-xl font-bold">ShareRide Pro</h2>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-6">
                {/* Status Card */}
                <div className="bg-gradient-to-br from-gray-700 to-gray-800 p-6 rounded-lg text-center shadow-lg">
                    <p className="text-yellow-400 font-bold">GOLD TIER</p>
                    <h3 className="text-3xl font-bold text-white mt-2">You're a Gold Driver!</h3>
                    <p className="text-gray-300 mt-2">250 / 500 points to Platinum</p>
                    <div className="w-full bg-gray-600 rounded-full h-2.5 mt-3">
                        <div className="bg-yellow-400 h-2.5 rounded-full" style={{width: '50%'}}></div>
                    </div>
                </div>

                {/* Benefits */}
                <div>
                    <h3 className="text-lg font-semibold text-cyan-400 mb-3">Your Gold Benefits</h3>
                    <div className="space-y-3">
                        <div className="flex items-center p-4 bg-gray-800 rounded-lg">
                            <GasIcon />
                            <p className="ml-4 font-semibold">Cash back on gas with Upside</p>
                        </div>
                        <div className="flex items-center p-4 bg-gray-800 rounded-lg">
                            <ToolIcon />
                            <p className="ml-4 font-semibold">Up to 25% off car maintenance</p>
                        </div>
                         <div className="flex items-center p-4 bg-gray-800 rounded-lg">
                             <GraduationCapIcon />
                            <p className="ml-4 font-semibold">100% tuition coverage for you or a family member</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DriverProView;