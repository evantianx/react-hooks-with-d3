import React from 'react';
import ReactDOM from 'react-dom';
import { Basic, LineChart } from './charactors';
import './index.css';

const App: React.FC = () => (
  <>
    <Basic />
    <LineChart />
  </>
);

ReactDOM.render(<App />, document.getElementById('root'));
