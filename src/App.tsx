import React from 'react';
import { Slider } from './Slider';

function App() {
  return (
    <div style={{ width: '100vw' }}>
      <Slider>
        <div
          style={{ backgroundColor: 'black', height: '300px', width: '100%' }}
        />
        <div
          style={{ backgroundColor: 'red', height: '100%', width: '100%' }}
        />
        <div
          style={{ backgroundColor: 'green', height: '100%', width: '100%' }}
        />
        <div
          style={{ backgroundColor: 'orange', height: '100%', width: '100%' }}
        />
        <div
          style={{ backgroundColor: 'pink', height: '100%', width: '100%' }}
        />
      </Slider>
    </div>
  );
}

export default App;
