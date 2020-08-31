import React from 'react';
import './css/style.css';
import './css/App.css';
import './css/LoadingSpinner.css';
import SearchModule from "./components/SearchModule";
import Header from './components/Header';
import {useStateValue} from "./store/StateProvider";
import WeatherModule from "./components/WeatherModule";
import CircularProgress from '@material-ui/core/CircularProgress';

function App() {
    const [{loading, cities}] = useStateValue();

    return (
    <div className="App">
        <Header />
        <div className="container">
            {loading && <CircularProgress className="loading_spinner" />}
            <SearchModule />
            {
                cities.map((city, index) => (
                    <WeatherModule key={index} cityName={city.name} currentTemp={city.current.temp}
                                   currentPressure={city.current.pressure} currentHumidity={city.current.humidity}
                                   currentWindSpeed={city.current.windspeed} forecast={city.forecast} icon={city.current.icon}
                                   index={index} />
                ))
            }
        </div>
    </div>
    );
}

export default App;
