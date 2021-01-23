import React from 'react'

const RestaurantList = () => {
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
