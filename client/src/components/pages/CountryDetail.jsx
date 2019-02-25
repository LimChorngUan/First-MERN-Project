import React, { Component } from 'react';
import api from '../../api';

class CountryDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      country: null
    };
  }

  componentDidMount() {
    api.getCountry(this.props.match.params.countryId).then(country => {
      this.setState({ country: country.country });
    });
  }

  render() {
    if (!this.state.country) {
      return (
        <div>
          <p>Country Loading</p>
        </div>
      );
    }
    return (
      <div>
        <h2>Country Details</h2>
        <p>Country: {this.state.country.name}</p>
        <p>Capital: {this.state.country.capitals[0]}</p>
        <p>
          Area: {this.state.country.area}km<sup>2</sup>
        </p>
        <p>Description: {this.state.country.description}</p>
        <p>{this.state.country._creator.username} shared this</p>
      </div>
    );
  }
}

export default CountryDetail;
