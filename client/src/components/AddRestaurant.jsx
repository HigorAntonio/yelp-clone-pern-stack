import React, { useState, useContext } from 'react';
import { RestaurantsContext } from '../context/RestaurantsContext';
import restaurantFinder from '../apis/restaurantFinder';
import FormErrorMessage from './FormErrorMessage';

const AddRestaurant = () => {
  const { addRestaurants } = useContext(RestaurantsContext);
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [priceRange, setPriceRange] = useState('Faixa de Preço');
  const [validationErrors, setValidationErrors] = useState([]);
  
  const formValidation = () => {
    let validated = true;
      setValidationErrors([]);
      if (!name) {
        validated = false;
        setValidationErrors(prevState => 
          [...prevState, { id: 1, msg: 'Forneça um nome válido.' }]
        );
      }
      if (!location) {
        validated = false;
        setValidationErrors(prevState => 
          [...prevState, { id: 2, msg: 'Forneça uma localização válida.' }]
        );
      }
      if (priceRange === 'Faixa de Preço') {
        validated = false;
        setValidationErrors(prevState => 
          [...prevState, { id: 3, msg: 'Selecione uma faixa de preço.' }]
        );
      }
      return validated;
  }
  
  const handleSubmit = async e => {
    e.preventDefault();
    try {
      if (formValidation()) {
        const response = await restaurantFinder.post('/', {
          name,
          location,
          price_range: priceRange
        });
        addRestaurants(response.data.data.restaurant);
        setName('');
        setLocation('');
        setPriceRange('Faixa de Preço');
      }
    } catch (error) {}
  }

  const dismissErrorMessage = (error) => {
    setValidationErrors(prevState => 
      prevState.filter(e => 
        e.id !== error.id  
      )
    );
  }
  
  return (
    <div className='mb-4'>
      <form action=''>
        <div className='form-row mb-2'>
          <div className='col'>
            <input className='form-control my-1' 
              type='text' 
              value={name}  
              onChange={e => setName(e.target.value)}
              placeholder='nome'
            />
          </div>
          <div className='col'>
            <input className='form-control my-1' 
              type='text' 
              value={location}
              onChange={e => setLocation(e.target.value)}
              placeholder='localização'
            />
          </div>
          <div className='col'>
            <select className='custom-select my-1 mr-sm-2'
              value={priceRange}
              onChange={e => setPriceRange(e.target.value)}
            >
              <option disabled>Faixa de Preço</option>
              <option value='1'>$</option>
              <option value='2'>$$</option>
              <option value='3'>$$$</option>
              <option value='4'>$$$$</option>
              <option value='5'>$$$$$</option>
            </select>
          </div>
          <button className='btn btn-primary my-1'
            type='submit'
            onClick={(e) => handleSubmit(e)}
          >
            Add
          </button>
        </div>
        {
          validationErrors.length > 0 && 
          validationErrors.map(error => 
            <FormErrorMessage key={error.id} 
              dismiss={() => dismissErrorMessage(error)} 
            >
              {error.msg}
            </FormErrorMessage>
          )
        }
      </form>
    </div>
  )
}

export default AddRestaurant;
