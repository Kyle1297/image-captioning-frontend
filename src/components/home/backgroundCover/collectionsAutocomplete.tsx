import React, { useState, useEffect, Fragment } from 'react';
import { TextField, CircularProgress } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import axios from 'axios';


interface Collection {
	id: string;
	category: string;
};

interface CollectionResponse extends Collection {
  description: string;
};

const CollectionsAutocomplete: React.FC = () => {
	// control appearance of select options
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<Collection[]>([]);

	// set whether data is still being fetched
  const [loading, setLoading] = useState<boolean>(true);

	// fetch collections
  useEffect(() => {
		axios.get('http://localhost:8000/api_v1/collections/')
			.then(response => {
        // fetching complete
        setLoading(false);

        // retrieve collections
				let results = response.data.results;
        let collections = [] as Collection[];
        results.forEach((collection: CollectionResponse)=> {
          collections.push({
            id: collection.id,
            category: collection.category,
          });
        });
        setOptions(collections)
			})
			.catch(error => {
				console.log(error);
			});
	}, [loading]);


  return (
    <Autocomplete
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      getOptionSelected={(option, value) => option.category === value.category}
      getOptionLabel={(option) => option.category}
      options={options}
      loading={loading}
      renderInput={(params) => (
        <TextField
          {...params}
          fullWidth
          label="Categories"
          variant="standard"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <Fragment>
                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                {params.InputProps.endAdornment}
              </Fragment>
            ),
          }}
        />
      )}
    />
  );
};

export default CollectionsAutocomplete;