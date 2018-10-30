import React from "react";
import {render} from "react-dom";
import App from './App';

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

render(
  <App places={places} />,
  document.getElementById("root")
);
