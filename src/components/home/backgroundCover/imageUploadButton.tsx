import React from 'react';
import { createStyles, makeStyles, useTheme } from '@material-ui/core/styles';
import { Button, useMediaQuery }  from '@material-ui/core';


const ImageUploadButton: React.FC = () => {
  // access style classes and size of user screen
  const styles = useStyles();
  const theme = useTheme();
  const smallScreen = useMediaQuery(theme.breakpoints.down('xs'));

  return (
    <div>
      <input
        className={styles.input}
        id="input"
        type="file"
        accept="image/*"
        required
      />
      <label htmlFor="input">
        <Button 
          size={smallScreen ? "medium" : "large"}
          className={styles.button}
          variant="contained" 
          color="primary" 
          component="span"
        >
          Select image
        </Button>
      </label>
    </div>
    );
};

// styles
const useStyles = makeStyles(() =>
  createStyles({
    input: {
      display: 'none',
    },
    button: {
      marginTop: 20,
    },
  }),
);


export default ImageUploadButton;