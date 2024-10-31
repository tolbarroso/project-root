import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Top10 from './pages/Top10';
import SiteDiaWine from './pages/SiteDiaWine';
import Ofertas from './pages/Ofertas';

const App = () => (
  <div>
    <Navbar />
    <Switch>
      <Route exact path="/" component={Dashboard} />
      <Route path="/top10" component={Top10} />
      <Route path="/site-diawine" component={SiteDiaWine} />
      <Route path="/ofertas" component={Ofertas} />
    </Switch>
  </div>
);

export default App;
