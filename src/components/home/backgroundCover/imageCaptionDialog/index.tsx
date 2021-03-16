import React, { useState } from 'react';
import { 
  TextField, 
  Dialog, 
  DialogActions, 
  DialogContent, 
  DialogTitle, 
  Button,
  useMediaQuery,
}  from '@material-ui/core';
import { createStyles, makeStyles, Theme, useTheme } from '@material-ui/core/styles';
import ImageInput from './imageInput';
import PrivacyRadioButtons from './privacyRadioButtons';
import CollectionsAutocomplete from './collectionsAutocomplete';


interface Props {
  open: boolean;
  handleDialog: () => void;
};

const ImageCaptionDialog: React.FC<Props> = ({ open, handleDialog }) => {
  // check whether a fullscreen dialog is more appropriate for screensize
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));

  // access styles and control form inputs
  const styles = useStyles();
  const [imageTitle, setImageTitle] = useState<string>("");
  
  // handle image title's vlaue
  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setImageTitle(event.currentTarget.value);
  };

	return (
    <div>
      <Dialog 
        fullScreen={fullScreen} 
        open={open} 
        fullWidth 
        onClose={handleDialog}
        className={styles.dialog}
      >
        <DialogTitle>Upload and caption your image</DialogTitle>
        <DialogContent>
          <div>
            <PrivacyRadioButtons />
          </div>
          <TextField
            size="small"
            style={fullScreen ? { width: '100%' } : { width: '80%' }}
            className={styles.text}
            variant="outlined"
            label="Name"
            helperText="If empty, the image's filename will be used."
            onChange={handleTitleChange}
            value={imageTitle}
          />
          <CollectionsAutocomplete />
          <ImageInput />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDialog} color="primary">
            Caption
          </Button>
        </DialogActions>
      </Dialog>
        
    </div>
	);
};

// styles
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    dialog: {
      display: 'block',
      textAlign: 'center',
      margin: 'auto',
    },
    text: {
      marginTop: 20,
      marginBottom: 30,
      [`& fieldset`]: {
        borderRadius: 25,
      },
    },
  }),
);

export default ImageCaptionDialog;
