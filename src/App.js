import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from './screens/Login';
import SwipeTest from './screens/SwipeTest';

function App() {
  return (
    <Router>
      <Route path="/" exact component={SwipeTest} />
      <Route path="/login" exact component={Login} />
    </Router>
  );
}

export default App;