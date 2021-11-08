import React from 'react';
import { Link } from 'react-router-dom';
import ProductFilters from '../components/ProductFilters';
import ProductSearch from '../components/ProductSearch';
import ProductsList from '../components/ProductsList';
import { getProductsFromCategoryAndQuery } from '../services/api';
import Cart from '../components/cart/Cart';

class ProductsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      category: '',
      query: '',
      productsList: [],
      initialMessage: true,
      loading: false,
      quantity: 0,
    };
  }

  componentDidMount() {
    this.getQuantity();
  }

  getQuantity = () => {
    const getItems = JSON.parse(localStorage.getItem('products'));
    const quantity = getItems ? getItems.reduce((total, i) => {
      total += Number(i.quantity);
      return total;
    }, 0) : 0;
    this.setState({
      quantity,
    });
  }

  listProducts = () => {
    const { query, category } = this.state;
    this.setState({
      initialMessage: false,
      loading: true,
    });
    getProductsFromCategoryAndQuery(category, query).then((products) => {
      this.setState({
        productsList: products.results,
        loading: false,
      });
    });
  }

  onSearch = (query) => {
    this.setState({
      query,
    }, this.listProducts);
  }

  onFilter = (category) => {
    this.setState({
      category,
    }, this.listProducts);
  }

  render() {
    const { productsList, loading, initialMessage, quantity } = this.state;
    return (
      <div>
        <ProductSearch onSearch={ this.onSearch } />
        <Link
          to="/shopping-cart"
          data-testid="shopping-cart-button"
        >
          <Cart quantity={ quantity } />
        </Link>
        <ProductsList
          products={ productsList }
          loading={ loading }
          initialMessage={ initialMessage }
          getQuantity={ this.getQuantity }
        />
        <ProductFilters onFilter={ this.onFilter } />
      </div>
    );
  }
}

export default ProductsPage;
