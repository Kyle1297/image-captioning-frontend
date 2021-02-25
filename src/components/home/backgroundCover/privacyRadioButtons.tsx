import React, { useState } from 'react';
import { Radio, RadioGroup, FormControlLabel, FormControl } from '@material-ui/core';


const PrivacyRadioButtons: React.FC = () => {
  // control visibility of image
  const [privateImage, setPrivateImage] = useState<boolean>(false);

  // handle privacy selection
  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    if (event.currentTarget.value === "true")
      setPrivateImage(true);
    else 
      setPrivateImage(false);
  };

  return (
    <FormControl component="fieldset">
      <RadioGroup row value={privateImage} onChange={handleRadioChange}>
        <FormControlLabel value={false} control={<Radio color="primary" />} label="Public" />
        <FormControlLabel value={true} control={<Radio color="primary" />} label="Private" disabled={false}/>
      </RadioGroup>
    </FormControl>
  );
};

export default PrivacyRadioButtons;