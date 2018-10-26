import React from 'react';
import PropTypes from 'prop-types';
import sortBy from 'sort-by';

const GoogleMapmarkers = ({markers}) => {
  return(
    <div className="markersMainContainer">
      <h2 className="markersTitle">Visible markers</h2>
      <div className="markersContainer">
        <ol className="markers">
        {markers.sort(sortBy('name')).map((marker, index) => (
          <li key={index}>
            {marker.name}
          </li>
        ))}
        </ol>
      </div>
    </div>
  )
}

GoogleMapmarkers.propTypes = {
    markers: PropTypes.array.isRequired,
};

export default GoogleMapmarkers
