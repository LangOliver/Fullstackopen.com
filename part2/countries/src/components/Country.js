import React from 'react';
import CountryDetail from './CountryDetails';
class Country  extends React.Component {

   state = {
    showDetails : false,
    apikey : ""
   } 
    
   onClick=(e)=>{
    this.setState({showDetails: !this.state.showDetails})
}
    render() {


        return (
            <div>
                <li key={this.props.filteredCountry.name}>
                {this.props.filteredCountry.name}
                <button onClick={this.onClick}>show</button></li>
                {this.state.showDetails ? 
                <CountryDetail filteredCountry = {this.props.filteredCountry}/> : null }
            </div>
            )
    }    
}



export default Country;
