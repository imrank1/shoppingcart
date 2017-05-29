import React, { Component } from 'react';
import ShoppingCart from './components/ShoppingCart';
import configureStore from './store.js'
import './App.css';

const store = configureStore();

class App extends Component {
  constructor(props) {
      super()
      this.store = props.store;
  }

  render() {
    return (
      <div className="App">
      <ShoppingCart store={store}></ShoppingCart>
      </div>
    );
  }
}

export default App;
