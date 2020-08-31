import React from 'react';
import '../css/style.css';
import {useStateValue} from '../store/StateProvider';

function SearchModule() {
    const [{hidden}] = useStateValue();

    return (
        <div className="module module__form" hidden={hidden.SearchModule}>
            <button className="btn btn--icon btn--close"><i className="material-icons">close</i></button>
            <h2>Znajdź miasto</h2>

            <form noValidate autoComplete="off" className="find-city">
                <input type="text" name="search" id="search" placeholder="np. Wrocław"/>
                <button type="submit"><i className="material-icons">search</i></button>
            </form>
            <div className="search-error"></div>
        </div>
    )
}

export default SearchModule;
