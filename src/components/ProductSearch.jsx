import PropTypes from 'prop-types';
import React from 'react';

class ProductSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
    };
  }

  onChange = ({ target }) => {
    const { value } = target;
    this.setState({
      query: value,
    });
  }

  onClick = (event) => {
    event.preventDefault();
    const { query } = this.state;
    const { onSearch } = this.props;
    onSearch(query);
  }

  render() {
    return (
      <div className='searchInto'>
        <input
          data-testid="query-input"
          onChange={ this.onChange }
        />
        <button
          data-testid="query-button"
          type="button"
          onClick={ this.onClick }
        >
          Procurar
        </button>
      </div>
    );
  }
}

ProductSearch.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

export default ProductSearch;
