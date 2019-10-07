import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from './screens/Home';
import SwipeTest from './screens/SwipeTest';

function App() {
  return (
    <Router>
      <Route path="/" exact component={Home} />
      <Route path="/swiper-test" exact component={SwipeTest} />
    </Router>
  );
}

export default App;