import React from 'react';
import { Home } from './home';
import NavBar from './layout/navBar';


const App: React.FC = () => {
  return (
    <div>
      <NavBar />
      <Home />
    </div>
  );
}

export default App;
