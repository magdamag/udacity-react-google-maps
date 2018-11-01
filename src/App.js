import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './App.css';
import GoogleMap from './GoogleMap'

class GoogleMapApp extends Component {
  static propTypes = {
    places: PropTypes.array.isRequired
  };

  state = {
    // ;-)
    places: ['start']
  }

  // Populate initial state from props
  static getDerivedStateFromProps(props, state) {
    if (state.places[0] === 'start') {
      return {
        places: props.places
      }
    }
    return null;
  }

  filterPlaces = (query) => {
    let resultPlaces = this.props.places.filter(place => {
      return place.title.toLowerCase().includes(query.toLowerCase())
    })

    this.setState({
      places: resultPlaces
    })
  }

  render() {
    return (
      <div role="application" className="app">
        <GoogleMap places={this.state.places} filterPlaces={this.filterPlaces}/>
      </div>
    )
  }
}

export default GoogleMapApp
