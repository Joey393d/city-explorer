import axios from 'axios';
import React from 'react';
import './App.css';
import Map from './map';


const apiUrl = process.env.REACT_APP_API_URL;

class App extends React.Component {
  
  state = {
    q: null,
    location: null,
  };

  handleSearch = async event => {
    
    event.preventDefault();

    let form = event.target;
    let input = form.elements.search;
    let q = input.value;
    console.log(q);

    
    this.setState({ q, location: null });

    const url = `https://us1.locationiq.com/v1/search.php`;

    
    const response = await axios.get(url, {
     
      params: {
        
        key: process.env.REACT_APP_LOCATION_KEY,
        q, 
        format: 'json',
      }
    });
    console.log(response);

    const location = response.data[0];
    this.setState({ location });

    this.getWeatherInfo();
  };

  getPhotos = async (query) => {
    const response = await axios.get(`${apiUrl}/photo`, {
      params: {
        q: query,
      },
    });

    this.setState({ photos: response.data });
  }


  getWeatherInfo = async () => {
    let response = await axios.get(`${apiUrl}/weather`);
    console.log("this is the getWeatherInfo", response);

    this.setState({
      weather: response.data,
    });
  };


  render() {
    return (

      

      <div className="App">
        <form onSubmit={this.handleSearch}>
          <label>
            Search for a location:
            {' '} {/* add a space between */}
            <input type="text" name="search" placeholder="Location" />
          </label>
          <div>
            <button type="submit">Search</button>
          </div>
        </form>
        {this.state.weather &&
          <ul>
            {this.state.weather.map(
              (weatherObj, index) => (
                <li key={index}>{weatherObj.Seattle}</li>
            )
            )}

          </ul>
        }
        {this.state.q &&
          <>
            <h2>Search: {this.state.q}</h2>
            {this.state.location ?
            <>
              <p>Display Name: {this.state.location.display_name}</p>
              <p>Latitude = {this.state.location.lat}</p>
              <p>Longitude = {this.state.location.lon}</p>
              <Map location={this.state.location}></Map>
              </>
              : <p>Loading...</p> 
              
            } 
            
            </>  
            
        }
      </div>
      >
       <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around' }}>
       {this.state.photos && this.state.photos.map(photo => (
         <div style={{ width: '200px' }}>
           <h3>By {photo.photographer}</h3>
           <img src={photo.img_url} style={{ width: '100%' }} />
         </div>
       ))}
     </div>
    );
  }


}





export default App;
