import React, {useEffect} from 'react';
import clearDay from '../img/icons/clear-day.svg';
import clearNight from '../img/icons/clear-night.svg';
import cloudy from '../img/icons/cloudy.svg';
import fog from '../img/icons/fog.svg';
import hail from '../img/icons/hail.svg';
import humidity from '../img/icons/humidity.svg';
import partlyCloudyDay from '../img/icons/partly-cloudy-day.svg';
import partlyCloudyNight from '../img/icons/partly-cloudy-night.svg';
import pressure from '../img/icons/pressure.svg';
import rain from '../img/icons/rain.svg';
import sleet from '../img/icons/sleet.svg';
import snow from '../img/icons/snow.svg';
import thunderstorm from '../img/icons/thunderstorm.svg';
import tornado from '../img/icons/tornado.svg';
import wind from '../img/icons/wind.svg';
import windspeed from '../img/icons/wind-speed.svg';
import NextDayForecast from "./NextDayForecast";
import {useStateValue} from "../store/StateProvider";
import {REMOVE_CITY, TOGGLE_LOADING_ANIMATION} from "../store/reducer";



function WeatherModule({cityName, currentTemp, currentPressure, currentHumidity, currentWindSpeed, icon, forecast, index}) {
    const [, dispatch] = useStateValue();
    const icons = {
        'clear-day': clearDay,
        'clear-night': clearNight,
        cloudy,
        fog,
        hail,
        humidity,
        'partly-cloudy-day': partlyCloudyDay,
        'partly-cloudy-night': partlyCloudyNight,
        pressure,
        rain,
        sleet,
        snow,
        thunderstorm,
        tornado,
        wind,
        windspeed
    }

    function generateWeek() {
        const weekday = [
            "Niedziela",
            "Poniedziałek",
            "Wtorek",
            "Środa",
            "Czwartek",
            "Piątek",
            "Sobota"
        ];
        const d = new Date();
        let week = [];
        let day = d.getDay();
        for (let i = 0; i < 8; i++) {
            week[i] = weekday[(day % 7)];
            day++;
        }
        return week
    }

    const thisWeek = generateWeek();

    useEffect(() => {
        const action = {
            type: TOGGLE_LOADING_ANIMATION
        }
        dispatch(action);
    }, [])

    const removeModule = (index) => {
        const action = {
            type: REMOVE_CITY,
            index
        };
        dispatch(action);
    }

    return (
        <div className="module module__weather__pattern">
            <button className="btn btn--icon btn--close"
                    onClick={() => (removeModule(index))}><i className="material-icons">close</i></button>

            <div className="weather">
                <div className="weather__icon"><img src={icons[icon]}/></div>

                <div className="weather__info">
                    <div className="city">
                        <span className="city__name">{cityName}</span>
                    </div>
                    <div className="temperature"><span className="temperature__value">{currentTemp}</span>&deg;C</div>
                </div>

                <ul className="weather__details">
                    <li><img src={pressure}/> <span className="pressure__value">{currentPressure} hPa</span></li>
                    <li><img src={humidity}/> <span className="humidity__value">{currentHumidity}%</span></li>
                    <li><img src={windspeed}/> <span className="wind-speed__value">{currentWindSpeed} m/s</span></li>
                </ul>

                <ul className="weather__forecast">
                    {
                        forecast.map((day, index) => (
                            <NextDayForecast key={index} forecast={day} day={thisWeek[index + 1]} icon={icons[day.icon]} />
                        ))
                    }
                </ul>
            </div>
        </div>
    )
}

export default WeatherModule;
