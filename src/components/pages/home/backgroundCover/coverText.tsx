import React from 'react';
import { createStyles, makeStyles, useTheme } from '@material-ui/core/styles';
import { Typography, useMediaQuery } from '@material-ui/core';


const CoverText: React.FC = () => {
  // access style classes and size of user screen
  const styles = useStyles();
  const theme = useTheme();
  const smallScreen = useMediaQuery(theme.breakpoints.down('xs'));

  return (
    <div>
      <Typography className={styles.title} variant={smallScreen ? "h5" : "h4"} gutterBottom>
        Stunning library of captioned images
      </Typography>
      <Typography paragraph>
        Automatically store and caption all your images using 
        {smallScreen ? " AI." : " the latest in artificial intelligence."}
      </Typography>
    </div>
  );
};

// styles
const useStyles = makeStyles(() =>
  createStyles({
    title: {
      fontWeight: 'bold',
    },
  }),
);

export default CoverText;