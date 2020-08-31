import React from 'react';

function NextDayForecast({forecast, day, icon}) {
    return (
        <li>
            <span className="day">{day}</span> <img src={icon}/>
            <span className="temperature"><span className="temperature__value">{forecast['temperatureHigh'].toFixed(1)}</span>&deg;C</span>
        </li>
    )
}

export default NextDayForecast;
