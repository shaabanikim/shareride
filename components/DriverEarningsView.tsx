import React from 'react';

const BackIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
    </svg>
);

interface DriverEarningsViewProps {
    onBack: () => void;
}

const mockTransactions = [
    { id: 1, type: 'Trip with Jane', time: 'Today, 3:45 PM', amount: 15.50, isTip: false },
    { id: 2, type: 'Tip from Jane', time: 'Today, 3:46 PM', amount: 3.00, isTip: true },
    { id: 3, type: 'Trip with Mike', time: 'Today, 1:20 PM', amount: 22.00, isTip: false },
    { id: 4, type: 'Trip with Sarah', time: 'Today, 11:15 AM', amount: 12.75, isTip: false },
];

const DriverEarningsView: React.FC<DriverEarningsViewProps> = ({ onBack }) => {
    return (
        <div className="h-full flex flex-col text-white">
            <div className="flex items-center p-4 border-b border-gray-800">
                <button onClick={onBack} className="p-2 rounded-full hover:bg-gray-700 transition mr-2">
                    <BackIcon />
                </button>
                <h2 className="text-xl font-bold">Earnings</h2>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-6">
                {/* Balance & Payout */}
                <div className="bg-gray-800 p-4 rounded-lg text-center">
                    <p className="text-gray-400">Available Balance</p>
                    <p className="text-4xl font-bold text-white my-2">$182.75</p>
                    <button className="w-full mt-2 bg-cyan-500 text-white font-bold py-3 rounded-lg transition hover:bg-cyan-600">
                        Cash Out Instantly
                    </button>
                </div>

                {/* Promotions */}
                <div>
                    <h3 className="text-lg font-semibold text-cyan-400 mb-2">Active Promotions</h3>
                    <div className="space-y-3">
                        <div className="p-3 bg-gray-800 rounded-lg">
                            <p className="font-bold">Weekend Quest</p>
                            <p className="text-sm text-gray-300">Complete 20 trips this weekend for a $50 bonus.</p>
                            <div className="w-full bg-gray-700 rounded-full h-2.5 mt-2">
                                <div className="bg-green-500 h-2.5 rounded-full" style={{width: '75%'}}></div>
                            </div>
                            <p className="text-xs text-gray-400 mt-1">15 of 20 trips completed</p>
                        </div>
                    </div>
                </div>

                {/* Recent Activity */}
                <div>
                    <h3 className="text-lg font-semibold text-cyan-400 mb-2">Recent Activity</h3>
                    <div className="space-y-2">
                        {mockTransactions.map(tx => (
                            <div key={tx.id} className="flex justify-between items-center p-3 bg-gray-800 rounded-lg">
                                <div>
                                    <p className="font-semibold">{tx.type}</p>
                                    <p className="text-xs text-gray-400">{tx.time}</p>
                                </div>
                                <p className={`font-bold ${tx.isTip ? 'text-purple-400' : 'text-green-400'}`}>+${tx.amount.toFixed(2)}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DriverEarningsView;