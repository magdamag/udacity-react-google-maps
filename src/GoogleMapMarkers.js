import React, {Component} from 'react';
import PropTypes from 'prop-types';
import GoogleMapListMarkers from './GoogleMapListMarkers'

class GoogleMapMarkers extends Component {
  constructor(props) {
    super(props);
    this.focusSearch = () => {
      this.search.focus();
    };
  }

  static propTypes = {
    markers: PropTypes.array.isRequired,
    filterPlaces: PropTypes.func.isRequired,
    onMarkerClick: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.focusSearch();
  }

  // Populate query and kick off search
  onInputChange = () => {
    this.props.filterPlaces(this.search.value)
  }

  render() {
    const {markers, onMarkerClick} = this.props

    return(
      <div className="markersMainContainer">
        <h2 className="markersTitle">Visible markers</h2>
        <form>
          <input
            type="text"
            placeholder="Search for place..."
            tabIndex="1"
            ref={input => this.search = input}
            onChange={this.onInputChange}
          />
        </form>
        <div className="markersContainer">
          <GoogleMapListMarkers markers={markers} onMarkerClick={onMarkerClick}/>
        </div>
      </div>
    )
  };
};

export default GoogleMapMarkers
