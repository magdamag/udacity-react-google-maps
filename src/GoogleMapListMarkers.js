import React from 'react';
import PropTypes from 'prop-types';

const GoogleMapmarkers = ({markers, onMarkerClick}) => {
  return(
    <ol className="markers">
    {markers.map((marker, index) => (
      <li tabIndex={index+2} onClick={e => onMarkerClick(marker.props)} key={marker.key}>
        {marker.props.name}
      </li>
    ))}
    </ol>
  )
}

GoogleMapmarkers.propTypes = {
  markers: PropTypes.array.isRequired,
  onMarkerClick: PropTypes.func.isRequired
};

export default GoogleMapmarkers
