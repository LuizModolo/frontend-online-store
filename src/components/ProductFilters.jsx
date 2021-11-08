import PropTypes from 'prop-types';
import React from 'react';
import { getCategories } from '../services/api';

class ProductFilters extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
    };
  }

  componentDidMount() {
    this.getCategoriesList();
  }

  getCategoriesList = () => {
    getCategories().then((e) => {
      this.setState({
        categories: e,
      });
    });
  }

  onChange = ({ target }) => {
    const { value, checked } = target;
    const { onFilter } = this.props;
    if (checked) {
      onFilter(value);
    }
  }

  render() {
    const { categories } = this.state;
    return (
      <div>
        <ul className="categories-list">
          {
            categories.map((category) => (
              <li key={ category.id }>
                {' '}
                <label htmlFor={ category.id }>
                  {category.name}
                  <input
                    data-testid="category"
                    type="radio"
                    name="category-input"
                    id={ category.id }
                    onChange={ this.onChange }
                    value={ category.id }
                  />
                </label>
              </li>
            ))
          }
        </ul>
      </div>
    );
  }
}

ProductFilters.propTypes = {
  onFilter: PropTypes.func.isRequired,
};

export default ProductFilters;
