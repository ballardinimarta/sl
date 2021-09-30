import React from 'react';
import './App.scss'
import FindLocation from './components/FindLocation';

function App() {
  return (
    <div className="App">
      <FindLocation/>
      <p>hitta detta repo på github <a style={{color: 'inherit'}} href="https://github.com/ballardinimarta/sl"> HÄR!</a></p>
    </div>
  );
}

export default App;
