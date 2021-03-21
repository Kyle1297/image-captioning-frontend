import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import CoverText from './coverText';
import OpenDialogFab from './openDialogFab';
import { Grid } from '@material-ui/core';
import './styles.css';

const BackgroundCover: React.FC = () => {
  // access style classes
  const styles = useStyles();

  return (
    <div className={styles.root}>
      <img className={styles.image} src="/homeImage.jpg" alt="" />
      <Grid container direction="column" justify="center" alignItems="center" className={styles.content}>
        <Grid item>
          <CoverText />
        </Grid>
        <Grid item>
          <OpenDialogFab />
        </Grid>
      </Grid>
    </div>
  );
};

// styles
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: 'relative',
      display: 'inline-block',
    },
    image: {
      width: '100vw',
      '@media only screen and (max-height: 655px)': {
        height: '75vh',
      },
      '@media only screen and (min-height: 655px) and (max-height: 800px)': {
        height: '65vh',
      },
      '@media only screen and (min-height: 800px) and (max-height: 1000px)': {
        height: '60vh',
      },
      '@media only screen and (min-height: 1000px)': {
        height: '55vh',
      },
    },
    content: {
      position: 'absolute',
      left: '50%',
      top: '50%',
      transform: 'translate(-50%, -50%)',
      color: '#FFFFFF',
      textAlign: 'center',
    },
  }),
);

export default BackgroundCover;