import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import GoogleMapMarkers from './GoogleMapMarkers'

var foursquare = require('react-foursquare')({
  clientID: 'TIJC50S4VNWIX4IQDA22FBPUMSIQFSYATXK34152EV5HOPYE',
  clientSecret: 'OYURRIVO3GNBSF00RM0BAH2CSENAVCOZJ3CO1KGQXHF3GI53'
});

class MapContainer extends Component {
  state = {
    // Welcome to Seattle!
    activePosition: {
      lat: 47.608013,
      lng: -122.335167
    },
    foursquare: {
      photo: '',
      rating: ''
    },
    selectedPositionName: '',
    showingInfoWindow: false
  }

  static propTypes = {
    places: PropTypes.array.isRequired,
    filterPlaces: PropTypes.func.isRequired
  };

  onMarkerClick = (props) => {
    this.setState({
      activePosition: props.position,
      selectedPositionName: props.name,
      showingInfoWindow: true
    });

    foursquare.venues.getVenues({
      ll: `${props.position.lat},${props.position.lng}`,
      query: props.title,
      limit: 1
    })
    .then(res => {
      return foursquare.venues.getVenue({
        venue_id: res.response.venues[0].id
      })
    })
    .then(res => {
      const {venue} = res.response
      if (venue) {
        this.setState({
          foursquare: {
            photo: `${venue.bestPhoto.prefix}100x100${venue.bestPhoto.suffix}`,
            rating: venue.rating
          }
        })
      }
    })
    .catch(reason => {
      console.log(reason)
    });
  };

  onInfoWindowClose = () =>
    this.setState({
      activePosition: {
        lat: 47.608013,
        lng: -122.335167
      },
      showingInfoWindow: false
    });

  onMapClicked = () => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activePosition: {
          lat: 47.608013,
          lng: -122.335167
        }
      })
    }
  };

  render() {
    const {google, places, filterPlaces} = this.props
    const {activePosition, showingInfoWindow, selectedPositionName, foursquare} = this.state
    const style = {
      width: '80%',
      height: '100%',
      position: 'relative',
      float: 'right'
    }
    const defaultIcon = {
      url: 'http://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|0091ff|40|_|%E2%80%A2',
      scaledSize: new google.maps.Size(30, 40)
    };
    const highlightedIcon = {
      url:  'http://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|FFFF24|40|_|%E2%80%A2',
      scaledSize: new this.props.google.maps.Size(30, 40)
    };

    let markers = places.map(place => {
      let marker = <Marker
        key={place.name}
        title={place.title}
        name={place.name}
        position={place.position}
        onClick={this.onMarkerClick}
        icon={place.position === activePosition ? highlightedIcon : defaultIcon}
      />
      return marker
    })

    return (
      <Map
        google={google}
        style={style}
        className={'map'}
        initialCenter={activePosition}
        zoom={13}
        onClick={this.onMapClicked}
      >
      {markers}
        <InfoWindow
          position={activePosition}
          visible={showingInfoWindow}
          onClose={this.onInfoWindowClose}
        >
          <div>
            <div>{selectedPositionName}</div>
            <img alt={selectedPositionName} src={foursquare.photo}/>
            <div>Rating: {foursquare.rating}</div>
          </div>
        </InfoWindow>
      <GoogleMapMarkers
        markers={markers}
        filterPlaces={filterPlaces}
        onMarkerClick={this.onMarkerClick}
      />
      </Map>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyAqQqk514xFqX3X8TSv-iugcK6dMIZnNRk'
})(MapContainer)
