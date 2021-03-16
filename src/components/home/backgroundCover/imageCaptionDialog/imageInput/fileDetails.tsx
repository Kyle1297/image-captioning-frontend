import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Typography, useMediaQuery }  from '@material-ui/core';
import { green } from '@material-ui/core/colors';


interface Props {
  image: File;
  uploadError: boolean;
};

const FileDetails: React.FC<Props> = ({ image, uploadError }) => {
  // access style classes and check for small screen
  const styles = useStyles();
  const smallScreen = useMediaQuery('(max-width: 319px)');

  // convert image size to MB
  const bytesToMegaBytes = (bytes: number) => (bytes / (1024*1024)).toFixed(2);

  return (
    <div className={styles.root}>
      <Typography className={styles.name} variant="body2">{image.name}</Typography>
      {smallScreen && !uploadError ? '' : (
        <Typography className={styles.size} variant="body2">{bytesToMegaBytes(image.size)} MB</Typography>
      )}
    </div>
  );
};

// styles
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    name: {
      marginRight: theme.spacing(1),
    },
    size: {
      color: green[600],
      fontWeight: 'lighter',
      marginRight: theme.spacing(2),
    },
  }),
);

export default FileDetails;