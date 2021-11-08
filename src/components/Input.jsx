import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Input extends Component {
  render() {
    const { labelText, testId, name, type, value, onChange, maxLength } = this.props;
    return (
      <div>
        <label htmlFor={ name }>
          { labelText }
          <input
            data-testid={ testId }
            id={ name }
            type={ type }
            name={ name }
            value={ value }
            onChange={ onChange }
            maxLength={ maxLength }
          />
        </label>
      </div>
    );
  }
}

Input.propTypes = {
  labelText: PropTypes.string.isRequired,
  testId: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  maxLength: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Input;
