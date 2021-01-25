import React from 'react';

const StarRating = ({rating, style}) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      stars.push(
        <i key={i} className='fas fa-star' style={{
          color: '#ffc107',
          ...style
        }}></i>
      )
    } else if (i === Math.ceil(rating) && !Number.isInteger(rating)) {
      stars.push(
        <i key={i} className='fas fa-star-half-alt' style={{
          color: '#ffc107',
          ...style
        }}></i>)
    } else {
      stars.push(
        <i key={i} className='far fa-star' style={{
          color: '#ffc107',
          ...style
        }}></i>)
    }
  }

  return (
    <>
      {stars}
    </>
  )
}

export default StarRating;
