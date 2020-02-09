import React from 'react';
import ReactDOM from 'react-dom';
import { Basic, LineChart, BarChart } from './charactors';
import './index.css';

const App: React.FC = () => (
  <>
    <Basic />
    <LineChart />
    <BarChart />
  </>
);

ReactDOM.render(<App />, document.getElementById('root'));
