import React from 'react';
import ReactDOM from 'react-dom';
import {
  Basic,
  LineChart,
  BarChart,
  BBTimeline,
  RaceChart,
  TreeChart,
} from './charactors';
import './index.css';

const App: React.FC = () => (
  <>
    <Basic />
    <LineChart />
    <BarChart />
    <BBTimeline />
    <RaceChart />
    <TreeChart />
  </>
);

ReactDOM.render(<App />, document.getElementById('root'));
