import React, {Component, useEffect} from 'react';
import axios from 'axios';

class Weather  extends React.Component {

    state = {
     current_weather : []
    } 

    render() {
        return (
            <div>
                <p>temperatur: {this.state.current_weather.temperature}</p>
                <p>wind: {this.state.current_weather.wind_speed} mph
               direction {this.state.current_weather.wind_dir}</p>
               <div></div>
                <img src={this.state.current_weather.weather_icons}></img>
            </div>
        )
    }
    async componentDidMount() {
            const weatherApiCall = 
            "http://api.weatherstack.com/current?access_key="+process.env.REACT_APP_API_KEY+"&query="+this.props.country
            console.log('axios call',
            weatherApiCall) 
                axios
                    .get(weatherApiCall)
                    .then(response => {
                        this.setState({current_weather: response.data.current})
                        console.log('response current', response.data.current)
                    })
                }
            
 
}

export default Weather;