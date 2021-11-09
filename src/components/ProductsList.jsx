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
        ? 
        <div className='noProductParagraph'>
          <p>Nenhum produto foi encontrado</p>
        </div> : 
          <div className='productsBoard'> { products.map((product) => (
            <div key={ product.id }>
              <ProductCard
                key={ product.id }
                productInfo={ product }
                hasClicked={ this.hasClicked }
              />
            </div>)) } 
          </div>;
      return result;
    };
    return (
      <div className='serachParagraph'>
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
