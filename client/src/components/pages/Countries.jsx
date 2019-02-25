import React, { Component } from 'react';
import api from '../../api';
import { Link } from 'react-router-dom';

class Countries extends Component {
  constructor(props) {
    super(props);
    this.state = {
      countries: [],
      message: null
    };
  }

  deleteCountry(countryId) {
    api.deleteCountry(countryId).then(data => {
      this.setState({
        countries: this.state.countries.filter(c => c._id !== countryId),
        message: data.message
      });
      setTimeout(() => {
        this.setState({ message: null });
      }, 2000);
    }).catch(err => this.setState({ message: err.toString() }));
  }

  render() {
    return (
      <div className="Countries">
        <h2>List of countries</h2>
        <ul>
          {this.state.countries.map(c => (
            <li key={c._id}>
              {c.name}
              <br/>
              {c._creator.username} shared this 
              <br/>
              <Link to={`/countries/${c._id}`}>Details </Link>
              <Link to={`/edit-country/${c._id}`}>Edit </Link>
              <button onClick={() => this.deleteCountry(c._id)}>Delete</button>
            </li>
          ))}
        </ul>
        {this.state.message && <p>{this.state.message}</p>}
      </div>
    );
  }

  componentDidMount() {
    api
      .getCountries()
      .then(countries => {
        console.log(countries);
        this.setState({
          countries: countries
        });
      })
      .catch(err => console.log(err));
  }
}

export default Countries;
