import React, {Component} from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import GoogleMapListMarkers from './GoogleMapListMarkers'

var foursquare = require('react-foursquare')({
  clientID: 'TIJC50S4VNWIX4IQDA22FBPUMSIQFSYATXK34152EV5HOPYE',
  clientSecret: 'OYURRIVO3GNBSF00RM0BAH2CSENAVCOZJ3CO1KGQXHF3GI53'
});

export class MapContainer extends Component {
  state = {
    activeMarker: {},
    foursquare: {
      photo: '',
      rating: ''
    },
    listMarkers: [],
    selectedPlace: {},
    showingInfoWindow: false,
  };

  onMarkerMounted = element => {
    this.setState(prevState => ({
      listMarkers: [...prevState.listMarkers, element.marker]
    }))
  };

  onMarkerClick = (props, marker, e) => {
    this.setState({
      activeMarker: marker,
      selectedPlace: props,
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
      activeMarker: null,
      showingInfoWindow: false
    });

  onMapClicked = () => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  };

  render() {
    const {google} = this.props
    const style = {
      width: '80%',
      height: '100%',
      position: 'relative',
      float: 'right'
    }
    const places = [
      {
        title: 'Pike Place Market',
        name: 'Pike Place Market',
        position: {
          lat: 47.6090472,
          lng: -122.3426436
        }
      },
      {
        title: 'Space Needle',
        name: 'Space Needle',
        position: {
          lat: 47.6205099,
          lng: -122.3514661
        }
      },
      {
        title: 'Seattle Japanese Garden',
        name: 'Seattle Japanese Garden',
        position: {
          lat: 47.629011,
          lng: -122.296403
        }
      },
      {
        title: 'General Porpoise Coffee & Doughnuts',
        name: 'General Porpoise Coffee & Doughnuts',
        position: {
          lat: 47.613060,
          lng: -122.318400
        }
      },
      {
        title: 'Pioneer Square',
        name: 'Pioneer Square',
        position: {
          lat: 47.602041,
          lng: -122.333848
        }
      }
    ]
    const initialCenter = {
      // Welcome to Seattle!
      lat: 47.608013,
      lng: -122.335167
    }

    return (
      <Map
        google={google}
        style={style}
        className={'map'}
        initialCenter={initialCenter}
        zoom={13}
        onClick={this.onMapClicked}
      >
      <GoogleMapListMarkers markers={this.state.listMarkers}/>
      {places.map((place, index) =>
        <Marker
          /* Curtesy of https://stackoverflow.com/questions/51579671/how-to-get-all-markers-in-google-maps-react */
          ref={this.onMarkerMounted}
          key={index}
          title={place.title}
          name={place.name}
          position={place.position}
          onClick={this.onMarkerClick}
        />
      )}
        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
          onClose={this.onInfoWindowClose}
        >
          <div>
            <div>{this.state.selectedPlace.name}</div>
            <img alt={this.state.selectedPlace.name} src={this.state.foursquare.photo}/>
            <div>Rating: {this.state.foursquare.rating}</div>
          </div>
        </InfoWindow>
      </Map>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyAqQqk514xFqX3X8TSv-iugcK6dMIZnNRk'
})(MapContainer)
