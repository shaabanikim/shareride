import React, { useState } from 'react';
import { User } from '../types';

interface RateRiderViewProps {
  rider: User;
  onComplete: () => void;
}

const StarIcon: React.FC<{ filled: boolean; onClick: () => void }> = ({ filled, onClick }) => (
    <svg
      onClick={onClick}
      xmlns="http://www.w3.org/2000/svg"
      className={`h-8 w-8 cursor-pointer ${filled ? 'text-yellow-400' : 'text-gray-600'}`}
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  );

const RateRiderView: React.FC<RateRiderViewProps> = ({ rider, onComplete }) => {
  const [rating, setRating] = useState(0);

  return (
    <div className="text-white animate-fade-in text-center">
        <h2 className="text-2xl font-bold">Rate Your Rider</h2>
        <p className="text-gray-400 mt-1">{rider.name}</p>

        <div className="flex justify-center my-4">
            <img src={rider.avatarUrl} alt={rider.name} className="h-20 w-20 rounded-full border-2 border-gray-700" />
        </div>
        
        <div className="flex justify-center space-x-2 my-4">
            {[1, 2, 3, 4, 5].map((star) => (
                <StarIcon key={star} filled={star <= rating} onClick={() => setRating(star)} />
            ))}
        </div>

        <button
            onClick={onComplete}
            disabled={rating === 0}
            className="w-full mt-4 bg-cyan-500 text-white font-bold py-3 rounded-lg transition-colors duration-300 disabled:bg-gray-600 disabled:cursor-not-allowed hover:bg-cyan-600"
        >
            Submit Rating
        </button>
    </div>
  );
};

export default RateRiderView;
