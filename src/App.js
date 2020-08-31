import React from 'react';
import './css/App.css';
import SearchModule from "./components/SearchModule";
import Header from './components/Header';

function App() {
  return (
    <div className="App">
        <Header />
        <SearchModule />
    </div>
  );
}

export default App;
