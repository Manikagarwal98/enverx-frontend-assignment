import React from 'react';
import logo from './logo.svg';

import './App.css';
import { Provider } from 'react-redux';
import  store  from "./redux/store";
import Dashboard from './components/Dashboard/index';
import TransactionForm from './components/Transaction';
import Container from '@mui/material/Container';

function App() {
  return (
    <div className="App">
    <Provider store={store}>
      <Container maxWidth="lg">
        <Dashboard />
      </Container>
      </Provider>
   </div>
  );
}

export default App;
