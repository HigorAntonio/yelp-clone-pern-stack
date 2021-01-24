import React from 'react';

const FormErrorMessage = props => {
  return (
    <div className='alert alert-danger'>
      {props.children}
      <button type='button' className='close' onClick={props.dismiss}>x</button>
    </div>
  )
}

export default FormErrorMessage;
