import React from 'react';
import '../css/style.css';
import logo from '../img/icons/logo.svg';
import {useStateValue} from "../store/StateProvider";
import {SHOW} from '../store/reducer';

function Header() {
    const [{loading}, dispatch] = useStateValue();
    const showSearch = () => {
        const action = {
            type: SHOW,
            element: 'SearchModule'
        }
        dispatch(action);
    }

    return (
        <header>
            <div className="container">
                <div className="logo"><img alt="logo" src={logo}/> Weather App</div>
                <button className="btn" id="add-city" onClick={!loading? showSearch:null}>Add city <i className="material-icons">add_circle</i></button>
            </div>
        </header>
    )
}

export default Header;
