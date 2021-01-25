import React, { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import restaurantFinder from '../apis/restaurantFinder';
import { RestaurantsContext } from '../context/RestaurantsContext';
import FormErrorMessage from './FormErrorMessage';

const AddReview = () => {
  const { id } = useParams();
  const [name, setName] = useState('');
  const [rating, setRating] = useState('Nota');
  const [reviewText, setReviewText] = useState('');
  const [validationErrors, setValidationErrors] = useState([]);
  const { setSelectedRestaurant } = useContext(RestaurantsContext);

  const formValidation = () => {
    let validated = true;
      setValidationErrors([]);
      if (!name) {
        validated = false;
        setValidationErrors(prevState => 
          [...prevState, { id: 1, msg: 'Forneça um nome válido.' }]
        );
      }
      if (rating === 'Nota') {
        validated = false;
        setValidationErrors(prevState => 
          [...prevState, { id: 2, msg: 'Forneça uma nota válida.' }]
        );
      }
      if (!reviewText) {
        validated = false;
        setValidationErrors(prevState => 
          [...prevState, { id: 3, msg: 'Forneça uma análise válida.' }]
        );
      }
      return validated;
  }
  
  const handleSubmit = async e => {
    e.preventDefault();
    try {
      if (formValidation()) {
        const response = await restaurantFinder.post(`/${id}/addReview`, {
          name,
          rating,
          review: reviewText
        });

        setSelectedRestaurant(prevState => ({
          restaurant: prevState.restaurant,
          reviews: [...prevState.reviews, response.data.data.review]
        }));

        setName('');
        setRating('Nota');
        setReviewText('')
      }
    } catch (error) {
      console.log(error);
    }
  };

  const dismissErrorMessage = (error) => {
    setValidationErrors(prevState => 
      prevState.filter(e => 
        e.id !== error.id  
      )
    );
  }

  return (
    <div className='mb-3'>
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
        <div className='form-row'>
          <div className='form-group col-8'>
            <label htmlFor='name'>Nome</label>
            <input id='name' 
              className='form-control' 
              type='text'
              placeholder='Nome'
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </div>
          <div className='form-group col-4'>
            <label htmlFor='rating'>Avaliação</label>
            <select id='rating' className='custom-select'
              value={rating}
              onChange={e => setRating(e.target.value)}
            >
              <option disabled>Nota</option>
              <option value='1'>1</option>
              <option value='2'>2</option>
              <option value='3'>3</option>
              <option value='4'>4</option>
              <option value='5'>5</option>
            </select>
          </div>
        </div>
        <div className='form-group'>
          <label htmlFor='Review'>Análise</label>
          <textarea id='Review' className='form-control'
            value={reviewText}
            onChange={e => setReviewText(e.target.value)}
          ></textarea>
        </div>
        <button type='submit' className='btn btn-primary'
          onClick={e => handleSubmit(e)}
        >
          Enviar
        </button>
      </form>
    </div>
  )
}

export default AddReview;
