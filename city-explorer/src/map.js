import React from 'react'

const key = process.env.REACT_APP_LOCATION_KEY;
const staticMapUrl = 'https://maps.locationiq.com/v3/staticmap'

export default class Map extends React.Component{
  render() {
    let location = this.props.location;

    let src = `${staticMapUrl}?key=${key}&center=${this.state.location.lat},${this.state.location.lon}$zoom=11` ;

    return (
      <div id="map">
        <h2>Map of {location.display_name}</h2>
        
        <img src={src}></img>
        </div>

      ) 
    }
  }