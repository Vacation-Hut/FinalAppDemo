import React, { useEffect, useRef ,useState} from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import Rating from '@material-ui/lab/Rating';
import StarIcon from '@material-ui/icons/Star';
import "./styles.css";

const useStyles = makeStyles(() => ({
  carouselImage: {
    width: '100%',
    height: 'auto',
  },
}));
const SlickCarousel = () => {
  const classes = useStyles();
  const sliderRef = useRef(null);
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
  useEffect(() => {
    if (sliderRef.current) {
      sliderRef.current.slickGoTo(0);
    }
  }, []);
  const settings = {
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1500,
    arrows: false,
    dots: false,
    pauseOnHover: false,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 520,
        settings: {
          slidesToShow: 3,
        },
      },
    ],
  };
  return (
    <div className="container reviewstyle">
      <h2 className='reviewheadingfeedback' style={{ fontFamily: 'Pacifico, cursive', fontWeight:'bold', color:'#4E0D0D'  }}>Our Customers Feedback</h2>
      <Slider {...settings} ref={sliderRef}>
      {reviews.map((review) => (
        <div key={review._id} className="slide">
          <p className='reviewheadingfeedback'><Rating value={review.rating} icon={<StarIcon />} readOnly /></p>
          <p>Comment: {review.comment}</p>
        </div>
      ))}
      </Slider>
    </div>
  );
};
export default SlickCarousel;







