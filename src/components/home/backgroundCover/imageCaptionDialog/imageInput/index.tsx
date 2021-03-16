import React, { useState } from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Button }  from '@material-ui/core';
import ImageError from './imageError';
import SelectedImage from './selectedImage';


const ImageInput: React.FC = () => {
  // access style classes
  const styles = useStyles();

  // handle uploaded image
  const [file, setFile] = useState<null | File>(null);
  const [uploadError, setUploadError] = useState<boolean>(false)

  // control how an image is handled once uploaded
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    let files = event.target.files;

    // only accept image files
    if (files && files[0]) {
      setFile(files[0]);
      if (files[0].type.split('/')[0] === 'image')
        setUploadError(false);
      else 
        setUploadError(true);
    } else {
      setFile(null);
      setUploadError(false);
    };
  };

  // ensure all uploaded files are detected, even if same file is uploaded twice
  const handleInputClick= ( event: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
    (event.target as HTMLInputElement).value = '';
  };

  return (
    <div>
      <input
        className={styles.input}
        id="input"
        type="file"
        accept="image/*"
        required
        onChange={handleImageUpload}
        onClick={handleInputClick}
      />
      <label htmlFor="input">
        <Button 
          size="large"
          className={styles.button}
          variant="contained" 
          color="primary" 
          component="span"
        >
          Select image
        </Button>
      </label>
      {file && !uploadError ? (
        <SelectedImage image={file} setFile={setFile} />
      ) : ''}
      {file && uploadError ? (
        <ImageError image={file} setFile={setFile} setUploadError={setUploadError} />
      ) : ''}
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
      marginTop: 25,
      width: '160px',
      textTransform: 'none',
      borderRadius: '25px',
      textAlign: 'left',
    },
  }),
);

export default ImageInput;