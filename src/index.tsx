import React from 'react';
import ReactDOM from 'react-dom';
import { Basic } from './charactors/Basic';

const App: React.FC = () => (
  <>
    <Basic />
  </>
);

ReactDOM.render(<App />, document.getElementById('root'));
