import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import restaurantFinder from '../apis/restaurantFinder';
import Reviews from '../components/Reviews';
import { RestaurantsContext } from '../context/RestaurantsContext';

const RestaurantDetailPage = () => {
  const { id } = useParams();
  const { selectedRestaurant, setSelectedRestaurant } = useContext(RestaurantsContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await restaurantFinder.get(`/${id}`);
        setSelectedRestaurant(response.data.data.restaurant);
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
        <h1 className='text-center display-2 font-weight-light'>{selectedRestaurant.name}</h1>
        <div className='mt-3'>
          <Reviews />
        </div>
      </>
      )}
    </div>
  )
}

export default RestaurantDetailPage;
