import React, { useState } from 'react';
import { 
  TextField, 
  Dialog, 
  DialogActions, 
  DialogContent, 
  DialogTitle, 
  Button,
  useMediaQuery,
  useTheme,
}  from '@material-ui/core';
import ImageUploadButton from './imageUploadButton';
import PrivacyRadioButtons from './privacyRadioButtons';
import CollectionsAutocomplete from './collectionsAutocomplete';


interface Props {
  open: boolean;
  handleDialog: () => void;
};

const ImageUploadDialog: React.FC<Props> = ({ open, handleDialog }) => {
  // check whether a fullscreen dialog is more appropriate for screensize
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));

  // control form inputs
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
      >
        <DialogTitle>Upload and caption your image</DialogTitle>
        <DialogContent>
          <PrivacyRadioButtons />
          <TextField
            variant="standard"
            label="Name"
            helperText="If empty, the image's filename will be used."
            onChange={handleTitleChange}
            value={imageTitle}
            fullWidth
          />
          <CollectionsAutocomplete />
          <ImageUploadButton />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialog} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
        
    </div>
	);
};

export default ImageUploadDialog;
