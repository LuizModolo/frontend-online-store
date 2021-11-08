import PropTypes from 'prop-types';
import React from 'react';
import ProductCard from './ProductCard';

class ProductsList extends React.Component {
  hasClicked = () => {
    const { getQuantity } = this.props;
    getQuantity();
  }

  render() {
    const { products, loading, initialMessage } = this.props;
    const renderProductsList = () => {
      const noResults = !loading && !initialMessage && products.length === 0;
      const result = noResults
        ? <p>Nenhum produto foi encontrado</p> : products
          .map((product) => (
            <ProductCard
              key={ product.id }
              productInfo={ product }
              hasClicked={ this.hasClicked }
            />));
      return result;
    };
    return (
      <div>
        {
          (!loading && initialMessage)
            && (
              <p data-testid="home-initial-message">
                Digite algum termo de pesquisa ou escolha uma categoria.
              </p>)
        }
        { renderProductsList() }
      </div>
    );
  }
}

ProductsList.propTypes = {
  products: PropTypes.arrayOf(PropTypes.object).isRequired,
  loading: PropTypes.bool.isRequired,
  initialMessage: PropTypes.bool.isRequired,
  getQuantity: PropTypes.func.isRequired,
};

export default ProductsList;
