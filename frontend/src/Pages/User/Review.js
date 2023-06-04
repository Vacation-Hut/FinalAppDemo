import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Rating from '@material-ui/lab/Rating';
import StarIcon from '@material-ui/icons/Star';
import '../../App.css'


function Review() {
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const response = await axios.get('http://localhost:5000/reviews');
      setReviews(response.data);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };

  const submitReview = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:5000/reviews', { rating, comment });
      fetchReviews();
      setRating(0);
      setComment('');
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };

  return (
    <div>
      <h4 className='reviewheadingalign'>Customer Reviews</h4>
      <form onSubmit={submitReview}>
        <div>
          {/* <label htmlFor="rating">Rating:</label> */}
          <Rating
            id="rating"
            name="rating"
            value={rating}
            onChange={(event, newValue) => setRating(newValue)}
            required
            icon={<StarIcon />}
          />
        </div>
        <div>
          {/* <label htmlFor="comment">Comment:</label> */}
          <textarea
            id="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
          />
        </div>
        <button type="submit" className='landbtn'>Submit Review</button>
      </form>
      {/* <h2>Reviews:</h2>
      {reviews.map((review) => (
        <div key={review._id}>
          <p>Rating: <Rating value={review.rating} icon={<StarIcon />} readOnly /></p>
          <p>Comment: {review.comment}</p>
        </div>
      ))} */}
    </div>
  );
}

export default Review;
