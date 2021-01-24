import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import restaurantFinder from '../apis/restaurantFinder';
import FormErrorMessage from './FormErrorMessage';

const UpdateRestaurant = () => {
  const { id } = useParams();
  const history = useHistory();
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [priceRange, setPriceRange] = useState('Faixa de Preço');
  const [validationErrors, setValidationErrors] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await restaurantFinder.get(`/${id}`);
        setName(response.data.data.restaurant.name);
        setLocation(response.data.data.restaurant.location);
        setPriceRange(response.data.data.restaurant.price_range);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, [id]);
  
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
        await restaurantFinder.put(`/${id}`, {
          name,
          location,
          price_range: priceRange
        });
        history.push('/');
      }
    } catch (error) {
      console.log(error);
    }
  }

  const dismissErrorMessage = (error) => {
    setValidationErrors(prevState => 
      prevState.filter(e => 
        e.id !== error.id  
      )
    );
  }

  return (
    <div>
      <form action=''>
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
        <div className='form-group'>
          <label htmlFor='name'>Nome</label>
          <input id='name' 
            className='form-control' 
            type='text'
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='location'>Localização</label>
          <input id='location' 
            className='form-control' 
            type='text'
            value={location}
            onChange={e => setLocation(e.target.value)}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='price_range'>Faixa de Preço</label>
          <select id='price_range' 
            className='form-control'
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
        <button className='btn btn-primary' 
          type='submit'
          onClick={e => handleSubmit(e)}
        >
          Enviar
        </button>
      </form>
    </div>
  )
}

export default UpdateRestaurant;
