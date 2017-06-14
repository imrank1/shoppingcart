import React, { Component } from 'react';
import ShoppingCartComponent from './components/ShoppingCart';
import configureStore from './store.js';
import { Provider } from 'react-redux'

import './App.css';

const store = configureStore();

class App extends Component {
  constructor(props) {
      super()
      this.store = props.store;
  }

  render() {
    return (
        <Provider store={store}>
            <ShoppingCartComponent/>
        </Provider>
    );
  }
}

export default App;
