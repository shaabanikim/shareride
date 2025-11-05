import React from 'react';

const UploadIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
    </svg>
);

interface DriverRegistrationViewProps {
    onSubmit: () => void;
}

const DriverRegistrationView: React.FC<DriverRegistrationViewProps> = ({ onSubmit }) => {
    return (
        <div className="h-full flex flex-col">
            <h2 className="text-2xl font-bold text-white mb-4">Become a Driver</h2>
            <div className="flex-1 overflow-y-auto pr-2 space-y-6">
                
                {/* Required Documents */}
                <div>
                    <h3 className="text-lg font-semibold text-cyan-400 mb-2">Required Documents</h3>
                    <div className="space-y-3">
                        <button className="w-full flex items-center justify-between p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition">
                            <span>Driver's License</span>
                            <UploadIcon />
                        </button>
                        <button className="w-full flex items-center justify-between p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition">
                            <span>Proof of Insurance</span>
                            <UploadIcon />
                        </button>
                    </div>
                </div>

                {/* Vehicle Information */}
                <div>
                    <h3 className="text-lg font-semibold text-cyan-400 mb-2">Vehicle Information</h3>
                    <div className="space-y-3">
                        <input type="text" placeholder="Make (e.g., Toyota)" className="w-full bg-gray-800 text-white border border-gray-700 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-cyan-500" />
                        <input type="text" placeholder="Model (e.g., Camry)" className="w-full bg-gray-800 text-white border border-gray-700 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-cyan-500" />
                        <input type="text" placeholder="License Plate" className="w-full bg-gray-800 text-white border border-gray-700 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-cyan-500" />
                    </div>
                </div>

                {/* Background Check */}
                 <div>
                    <h3 className="text-lg font-semibold text-cyan-400 mb-2">Background Check</h3>
                    <div className="p-3 bg-gray-800 rounded-lg">
                        <p className="text-gray-300">A background check is required. By submitting, you agree to a check by a third-party service.</p>
                        <p className="text-yellow-400 text-sm mt-2">Status: Pending Submission</p>
                    </div>
                </div>
            </div>

            <button
                onClick={onSubmit}
                className="w-full mt-4 bg-cyan-500 text-white font-bold py-3 rounded-lg transition-colors duration-300 hover:bg-cyan-600"
            >
                Submit for Review
            </button>
        </div>
    );
};

export default DriverRegistrationView;
