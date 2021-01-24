import React, { useState } from 'react';

const FormErrorMessage = props => {
  const [showMsg, setShowMsg] = useState(true);

  const handleClose = () => {
    setShowMsg(prevState => setShowMsg(!prevState));
  }

  return (
    showMsg && <div className='alert alert-danger'>
      {props.children}
      <button type='button' className='close' onClick={handleClose}>x</button>
    </div>
  )
}

export default FormErrorMessage;
