import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import ShoppingCart from './pages/ShoppingCart';
import ProductsPage from './pages/ProductsPage';
import ProductDetails from './pages/ProductDetails';
import Checkout from './pages/Checkout';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <header>
            <img src='./logoloja.png' alt='logoLoja' />
        </header>
        <Switch>
          <Route exact path="/" render={ () => <ProductsPage /> } />
          <Route path="/shopping-cart" component={ ShoppingCart } />
          <Route path="/product/:id" component={ ProductDetails } />
          <Route path="/checkout" component={ Checkout } />
        </Switch>
        <footer className="footer">
          <h4>
            All rights reserved to Módolo group
            {' '}
            <span>&#169;</span>
          </h4>
          <p><a href="https://www.linkedin.com/in/luizfcmodolo/" target="_blank" rel="noopener noreferrer">Luiz Modolo</a></p>
        </footer>
      </BrowserRouter>
    );
  }
}

export default App;
