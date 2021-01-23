import React, { useEffect, useContext } from 'react';
import restaurantFinder from '../apis/restaurantFinder';
import { RestaurantsContext } from '../context/RestaurantsContext';

const RestaurantList = props => {
  const { restaurants, setRestaurants } = useContext(RestaurantsContext);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await restaurantFinder.get('/');
        setRestaurants(response.data.data.restaurants);
      } catch (error) {}
    }
    fetchData();
  }, [setRestaurants]);

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
          <tr>
            <td>mc'donalds</td>
            <td>Juiz de Fora</td>
            <td>$$</td>
            <td>Rating</td>
            <td><button className='btn btn-warning'>Editar</button></td>
            <td><button className='btn btn-danger'>Excluir</button></td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default RestaurantList;
