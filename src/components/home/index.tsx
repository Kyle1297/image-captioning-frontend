import React from 'react';
import BackgroundCover from './backgroundCover';
import ImagesGrid from './imagesGrid';
import NavBar from '../layout/navBar';


const Home = () => {
  return (
    <div>
      <NavBar />
      <BackgroundCover />
      <ImagesGrid />
    </div>
  );
};

export default Home;