import React from 'react';
import WordClock from './wordclock';
import './App.css';

function App() {
  const [curr, setCurr] = React.useState(new Date());
  setInterval(() => setCurr(new Date()),1000);
  return (
    <div className="App">
      <header className="App-header">
        <WordClock date={curr}/>
      </header>
    </div>
  );
}

export default App;
