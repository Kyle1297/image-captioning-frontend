import React, { Dispatch, SetStateAction } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { IconButton, Typography }  from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';
import { pink, red } from '@material-ui/core/colors';
import FileDetails from './fileDetails';


interface Props {
  image: File;
  setFile: Dispatch<SetStateAction<File|null>>;
  setUploadError: Dispatch<SetStateAction<boolean>>;
};

const ImageError: React.FC<Props> = ({ image, setFile, setUploadError }) => {
  // access style classes
  const styles = useStyles();

  // handle error deletion
  const handleError = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    setFile(null);
    setUploadError(false);
  };

  return (
    <div className={styles.root}>
      <FileDetails image={image} uploadError={true} />
      <IconButton className={styles.iconButton} size="small" onClick={handleError}>
        <ClearIcon className={styles.icon} />
      </IconButton>
      <div className={styles.text}>
      <Typography  variant="body2">
        Unfortunately, only images files are accepted. Please try again.
      </Typography>
      </div>
    </div>
  );
};

// styles
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexFlow: 'row wrap',
      backgroundColor: pink[100],
      padding: '3px 5px',
      marginTop: 17,
      position: 'relative',
    },
    iconButton: {
      position: 'absolute',
      top: 3,
      right: 3,
    },
    icon: {
      fontSize: 14,
    },
    text: {
      textAlign: 'left',
      color: red[400],
    },
  }),
);

export default ImageError;