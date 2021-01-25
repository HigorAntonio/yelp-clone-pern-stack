import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import restaurantFinder from '../apis/restaurantFinder';
import AddReview from '../components/AddReview';
import Reviews from '../components/Reviews';
import StarRating from '../components/StarRating';
import { RestaurantsContext } from '../context/RestaurantsContext';

const RestaurantDetailPage = () => {
  const { id } = useParams();
  const { selectedRestaurant, setSelectedRestaurant } = useContext(RestaurantsContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await restaurantFinder.get(`/${id}`);
        setSelectedRestaurant(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [id, setSelectedRestaurant]);

  return (
    <div>
      {selectedRestaurant && (
      <>
        <h1 className='text-center display-2'>
          {selectedRestaurant.restaurant.name}
        </h1>
        <div className='text-center'>
          {
            selectedRestaurant.restaurant.count > 0 ?
            <>
              <StarRating rating={selectedRestaurant.restaurant.average_rating} 
                style={{ textShadow: '1px 1px 2px #222, 0 0 1em #aaa, 0 0 0.2em #ddd' }}
              />
              <span className='ml-1 font-weight-bold' style={{
                color: '#ffc107',
                letterSpacing: '1px',
                textShadow: '1px 1px 3px #222, 0 0 1em #888, 0 0 0.2em #333'
              }}>
                ({selectedRestaurant.restaurant.count})
              </span>
            </> :
            <span className='ml-1 font-weight-bold' style={{
              color: '#ffc107',
              textShadow: '1px 1px 3px #000, 0 0 1em #888, 0 0 0.2em #333'
            }}>
              (Sem avaliações)
            </span>
          }
        </div>
        <div className='mt-3'>
          <Reviews reviews={selectedRestaurant.reviews} />
        </div>
        <AddReview />
      </>
      )}
    </div>
  )
}

export default RestaurantDetailPage;
