import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './routes/Home';
import RestaurantDetailPage from './routes/RestaurantDetailPage';
import UpdateRestaurantPage from './routes/UpdateRestaurantPage';

const App = () => {
  return (
    <div className='container'>
      <Router>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/restaurants/:id/update' component={UpdateRestaurantPage} />
          <Route exact path='/restaurants/:id' component={RestaurantDetailPage} />
        </Switch>
      </Router>
    </div>
  )
};

export default App;