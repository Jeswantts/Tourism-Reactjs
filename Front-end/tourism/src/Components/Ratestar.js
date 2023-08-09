import React from 'react';
import { FaStar, FaStarHalfAlt } from 'react-icons/fa';

const Ratestar = ({ rating }) => {
  const totalStars = 5;
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating - fullStars >= 0.5;

  return (
    <div className="rating-stars">
      {[...Array(fullStars)].map((_, index) => (
        <FaStar key={index} color="#ffc107" size={20} />
      ))}
      {hasHalfStar && <FaStarHalfAlt color="#ffc107" size={20} />}
      {[...Array(totalStars - fullStars - (hasHalfStar ? 1 : 0))].map((_, index) => (
        <FaStar key={index} color="#e4e5e9" size={20} />
      ))}
    </div>
  );
};

export default Ratestar;
