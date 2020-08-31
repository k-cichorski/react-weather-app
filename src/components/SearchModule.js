import React, {useState} from 'react';
import '../css/style.css';
import {useStateValue} from '../store/StateProvider';
import {TOGGLE_LOADING_ANIMATION, HIDE, ADD_CITY} from "../store/reducer";

function SearchModule() {
    const [{hidden}, dispatch] = useStateValue();
    const [searchCityName, setSearchCityName] = useState('');

    const getWeather = async (lat, lon) => {
        try {
            let weather = await fetch(`https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/d3862a3bd8444732969612f2e09f0e92/${lat},${lon}?units=si&lang=pl`);
            if (weather.ok) {
                weather = await weather.json();
                return weather
            } else {
                alert(weather.statusText);
            }

        } catch(err) {
            alert(err);
        }
    }

    const hideSelf = () => {
        let hide = {
            type: HIDE,
            element: 'SearchModule'
        }
        dispatch(hide);
    }

    const searchCity = async (e) => {
        e.preventDefault();
        let toggleLoading = {
            type: TOGGLE_LOADING_ANIMATION
        }
        hideSelf();
        dispatch(toggleLoading);
        try {
            const response = await fetch(`https://cors-anywhere.herokuapp.com/http://api.positionstack.com/v1/forward?access_key=7c47d1f326b1d04fd55ed7685d5d87c3&query=${searchCityName}`);
            if (response.ok) {
                try {
                    let location = await response.json();
                    if (location.data.length > 0) {
                        const lat = location['data'][0]['latitude'];
                        const lon = location['data'][0]['longitude'];
                        let city = location['data'][0]['name'];
                        let region = location['data'][0]['country'];
                        const weather = await getWeather(lat, lon);
                        const currently = weather['currently'];
                        const daily = weather['daily']['data'];
                        const cityWeather = {
                            name: `${city}, ${region}`,
                            current: {
                                temp: currently['temperature'].toFixed(1),
                                humidity: currently['humidity'],
                                pressure: Math.floor(currently['pressure']),
                                windspeed: currently['windSpeed'],
                                icon: currently['icon']
                            },
                            forecast: [
                                daily[0],
                                daily[1],
                                daily[2],
                                daily[3],
                                daily[4]
                            ]
                        }
                        const action = {
                            type: ADD_CITY,
                            city: cityWeather
                        }
                        dispatch(action);
                        setSearchCityName('');
                    }
                } catch(err) {
                    alert(err);
                }
            } else {
                alert(response.statusText);
            }
        } catch(err) {
            alert(err);
        }
    }

    return (
        <div className="module module__form" hidden={hidden.SearchModule}>
            <button className="btn btn--icon btn--close" onClick={hideSelf}><i className="material-icons">close</i></button>
            <h2>Znajdź miasto</h2>

            <form noValidate autoComplete="off" className="find-city">
                <input type="text" name="search" id="search" placeholder="np. Wrocław"
                       onChange={e =>setSearchCityName(e.target.value)} value={searchCityName}/>
                <button type="submit" onClick={e => searchCity(e)}><i className="material-icons">search</i></button>
            </form>
            <div className="search-error"></div>
        </div>
    )
}

export default SearchModule;
