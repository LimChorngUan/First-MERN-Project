import React, { Component } from 'react';
import api from '../../api';

class EditCountry extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      capitals: '',
      area: '',
      description: '',
      message: ''
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    api.getCountry(this.props.match.params.countryId).then(country => {
      const { name, capitals, area, description } = country.country;
      this.setState({ name, capitals, area, description });
    });
  }

  handleInputChange(e) {
    console.log(e.target.name);
    this.setState({ [e.target.name]: e.target.value });
  }

  handleClick(e) {
    e.preventDefault();

    const data = {
      name: this.state.name,
      capitals: this.state.capitals,
      area: this.state.area,
      description: this.state.description
    };

    api
      .editCountry(this.props.match.params.countryId, data)
      .then(res => {
        this.setState({
          message: 'Country has been updated'
        });
        setTimeout(() => {
          this.setState({ message: '' });
        }, 1500);
      })
      .catch(err => this.setState({ message: err.toString() }));
  }

  render() {
    return (
      <div>
        <h2>Edit Country</h2>
        <form>
          <label htmlFor="name">Name: </label>
          <input
            type="text"
            id="name"
            name="name"
            value={this.state.name}
            onChange={this.handleInputChange}
          />
          <br />
          <label htmlFor="capitals">Capitals: </label>
          <input
            type="text"
            id="capitals"
            name="capitals"
            value={this.state.capitals}
            onChange={this.handleInputChange}
          />
          <br />
          <label htmlFor="area">Area: </label>
          <input
            type="number"
            id="area"
            name="area"
            value={this.state.area}
            onChange={this.handleInputChange}
          />
          <br />
          <label htmlFor="description">Description: </label>
          <textarea
            value={this.state.description}
            cols={30}
            rows={10}
            name="description"
            onChange={this.handleInputChange}
          />
          <br />
          <button onClick={this.handleClick}>Edit</button>
        </form>

        {this.state.message && <p>{this.state.message}</p>}
      </div>
    );
  }
}

export default EditCountry;
