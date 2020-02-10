import React from 'react';
import ReactDOM from 'react-dom';
import { Basic, LineChart, BarChart, BBTimeline } from './charactors';
import './index.css';

const App: React.FC = () => (
  <>
    <Basic />
    <LineChart />
    <BarChart />
    <BBTimeline />
  </>
);

ReactDOM.render(<App />, document.getElementById('root'));
