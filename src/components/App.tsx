import React from 'react';
import Hand from './Hand';
import './styles/app.scss';

const App = () => (
  <>
    <Hand hand={[]} title="Dealer's Hand" />
    <Hand hand={[]} title="Player's Hand" />
  </>
);

export default App;
