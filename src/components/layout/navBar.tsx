import React from 'react';
import { createStyles, makeStyles, Theme, useTheme } from '@material-ui/core/styles';
import { AppBar, Toolbar, Button, useMediaQuery, Grid, IconButton, useScrollTrigger } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';


const NavBar = () => {
  // access style classes and detect scrolling
  const styles = useStyles();
  const scrollTrigger = useScrollTrigger();

  // handle various screen sizes
  const theme = useTheme();
  const smallScreen = useMediaQuery(theme.breakpoints.down('xs'));

  return (
    <div className={styles.root}>
      <AppBar color="default" className={scrollTrigger ? styles.navHide : ''}>
        <Toolbar>
          <img 
            className={styles.logo} 
            src={smallScreen ? "/logo/logoSmall.png" : "/logo/logoLeft.png"} 
            alt="logo" 
          />
          <Grid container justify="flex-end">
            {smallScreen ? (
              <IconButton edge="end">
                <MenuIcon fontSize="large"/>
              </IconButton>
            ) : (
              <Button>Login</Button>
            )}
          </Grid>
        </Toolbar>
      </AppBar>
    </div>
  );
}

// styles
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    navHide: {
      visibility: 'hidden',
    },
    logo: {
      marginTop: 5,
      marginBottom: 6,
      marginLeft: 1,
    },
  }),
);

export default NavBar;