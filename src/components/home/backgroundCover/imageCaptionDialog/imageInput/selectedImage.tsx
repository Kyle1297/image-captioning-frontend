import React, { Dispatch, SetStateAction } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Avatar, IconButton }  from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';
import FileDetails from './fileDetails';


interface Props {
  image: File;
  setFile: Dispatch<SetStateAction<File|null>>;
};

const SelectedImage: React.FC<Props> = ({ image, setFile }) => {
  // access style classes
  const styles = useStyles();

  // handle image deletion
  const handleImageDeletion = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    setFile(null);
  };

  return (
    <div className={styles.root}>
      <Avatar className={styles.avatar} alt="image" src={URL.createObjectURL(image)}/>
      <FileDetails image={image} uploadError={false} />
      <IconButton size="small" onClick={handleImageDeletion}>
        <ClearIcon />
      </IconButton>
    </div>
  );
};

// styles
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexFlow: 'row wrap',
      alignItems: 'center',
      marginTop: theme.spacing(4),
    },
    avatar: {
      marginRight: theme.spacing(2),
    },
  }),
);

export default SelectedImage;