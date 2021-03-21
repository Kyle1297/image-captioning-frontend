import React from 'react';
import BackgroundCover from './backgroundCover';
import ImagesGrid from './imagesGrid';
import NavBar from '../layout/navBar';
import BottomNavBar from '../layout/bottomNavBar';
import { Grid } from '@material-ui/core';


const Home = () => {
  return (
    <Grid container style={{ minHeight: '100vh' }} justify="space-between" direction="column">
      <Grid item xs>
        <NavBar />
        <BackgroundCover />
        <ImagesGrid />
      </Grid>
      <Grid item>
        <BottomNavBar />
      </Grid>
    </Grid>
  );
};

export default Home;