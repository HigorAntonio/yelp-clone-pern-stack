import React, { useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import restaurantFinder from '../apis/restaurantFinder';
import { RestaurantsContext } from '../context/RestaurantsContext';

const RestaurantList = props => {
  const { restaurants, setRestaurants } = useContext(RestaurantsContext);
  let history = useHistory();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await restaurantFinder.get('/');
        setRestaurants(response.data.data.restaurants);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, [setRestaurants]);
  
  const handleRestaurantSelect = id => {
    history.push(`/restaurants/${id}`);
  }

  const handleDelete = async (e, id) => {
    e.stopPropagation();
    try {
      await restaurantFinder.delete(`/${id}`);
      setRestaurants(prevState => prevState.filter(
        restaurant => restaurant.id !== id
      ));
    } catch (error) {
      console.log(error);
    }
  }

  const handleUpdate = (e, id) => {
    e.stopPropagation();
    history.push(`/restaurants/${id}/update`);
  }

  return (
    <div className='list-group'>
      <table className='table table-hover table-dark'>
        <thead>
          <tr className='bg-primary'>
            <th scope='col'>Restaurante</th>
            <th scope='col'>Localização</th>
            <th scope='col'>Faixa de Preço</th>
            <th scope='col'>Avaliações</th>
            <th scope='col'>Editar</th>
            <th scope='col'>Excluir</th>
          </tr>
        </thead>
        <tbody>
          {restaurants && restaurants.map(restaurant => 
            <tr key={restaurant.id}
              onClick={() => handleRestaurantSelect(restaurant.id)}
            >
              <td>{restaurant.name}</td>
              <td>{restaurant.location}</td>
              <td>{'$'.repeat(restaurant.price_range)}</td>
              <td>Rating</td>
              <td>
                <button className='btn btn-warning' 
                  onClick={e => handleUpdate(e, restaurant.id)}
                >
                  Editar
                </button>
              </td>
              <td>
                <button className='btn btn-danger' 
                  onClick={e => handleDelete(e, restaurant.id)}
                >
                  Excluir
                </button>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default RestaurantList;
