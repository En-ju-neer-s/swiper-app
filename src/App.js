import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import SwipeTest from './screens/SwipeTest';

function App() {
  return (
    <Router>
      <Route path="/" exact component={SwipeTest} />
    </Router>
  );
}

export default App;