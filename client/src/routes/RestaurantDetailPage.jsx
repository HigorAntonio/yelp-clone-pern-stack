import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import restaurantFinder from '../apis/restaurantFinder';
import AddReview from '../components/AddReview';
import Reviews from '../components/Reviews';
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
        <h1 className='text-center display-2'>{selectedRestaurant.restaurant.name}</h1>
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
