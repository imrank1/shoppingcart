import React, { Component } from 'react';
import Item from './components/Item';
import ShoppingCart from './components/ShoppingCart';

import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
      <ShoppingCart></ShoppingCart>
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload....Imran Khawaja
        </p>
        <Item></Item>
      </div>
    );
  }
}

export default App;
