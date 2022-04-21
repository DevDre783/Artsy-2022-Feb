import React, { useEffect, useState } from 'react'
import { FaStar } from 'react-icons/fa'
import "./StarRating.css"

const StarRating = () => {
    const [rating, setRating] = useState(null);
    const [hover, setHover] = useState(null);

    return (
        <div className='rating_container'>
            {[...Array(5)].map((star, i) => {
                const ratingValue = i + 1;

                return (
                    <label key={i}>
                        <input
                            type='radio'
                            name="rating"
                            value={ratingValue}
                            onClick={() => setRating(ratingValue)}
                        />
                        <FaStar className='star' color={ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"} size={35}
                            onMouseEnter={() => setHover(ratingValue)}
                            onMouseLeave={() => setHover(null)}
                        />
                    </label>
                )
            })}
                (coming soon...)
        </div>
    )
}

export default StarRating;
