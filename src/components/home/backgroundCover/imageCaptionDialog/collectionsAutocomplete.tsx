import React, { useState, useEffect, Fragment } from 'react';
import { TextField, CircularProgress, useMediaQuery } from '@material-ui/core';
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { createStyles, makeStyles, Theme, useTheme } from '@material-ui/core/styles';
import { FilterOptionsState } from '@material-ui/lab/useAutocomplete';


interface Collection {
	id?: number;
	category: string;
  is_main?: boolean;
};

interface CollectionOption extends Collection {
  firstLetter: string;
  inputValue?: string;
};

const CollectionsAutocomplete: React.FC = () => {
  // check whether a fullscreen dialog is more appropriate for screensize
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));

	// control appearance of select options
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<CollectionOption[]>([]);
  const handleForm = () => setOpen(!open);

  // access styles and control form states
  const styles = useStyles();
  const [formValue, setFormValue] = useState<(string | CollectionOption)[]>([]);

	// set loading state and allow an 'Add' option to be created
  const [loading, setLoading] = useState<boolean>(true);
  const filter = createFilterOptions<CollectionOption>();

	// fetch collections
  useEffect(() => {
		axios.get('http://localhost:8000/api_v1/images/collections/')
			.then((response: AxiosResponse) => {
        // fetching complete
        setLoading(false);

        // retrieve collections
				let results = response.data.results;
        let collections = [] as CollectionOption[];
        results.forEach((collection: Collection)=> {
          const firstLetter = collection.category[0].toUpperCase();
          collections.push({
            id: collection.id,
            category: collection.category,
            firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
          });
        });
        setOptions(collections)
			})
			.catch((error: AxiosError) => {
				console.log(error);
			});
	}, [loading]);

  // create new collection
  const createNewCollection = (category: string, firstLetter: string) => {
    let data = {
      category: category,
    };
    axios.post('http://localhost:8000/api_v1/images/collections/', data)
      .then((response: AxiosResponse) => {
        const newCollection = response.data;
        console.log(response.data)
        setOptions([
          ...options, 
          {
            id: newCollection.id,
            category: newCollection.category,
            firstLetter: firstLetter,
          },
        ]);
        setFormValue([
          ...formValue,
          {
            category: newCollection.category,
            firstLetter: firstLetter,
          },
        ]);
      })
      .catch((error: AxiosError) => {
        console.log(error);
      });
    };
      
  // handle changing of selected form values
  const handleFormChange = (event: React.ChangeEvent<{}>, newFormValue: (string | CollectionOption)[]) => {
    let newValue = newFormValue[newFormValue.length - 1];

    // value from enter
    if (typeof newValue === 'string') {
      // ensure new value is capitalised
      const firstLetter = newValue[0].toUpperCase();
      const capitalisedInput = firstLetter + newValue.slice(1);

      // create new category and add to form values
      createNewCollection(capitalisedInput, /[0-9]/.test(firstLetter) ? '0-9' : firstLetter);
    }

    // add "xxx" option that was created dynamically
    else if (newValue && newValue.inputValue)
      createNewCollection(newValue.inputValue, newValue.firstLetter);
    
    // regular value
    else setFormValue(newFormValue);
  };

  // handle the filtering of autocomplete options
  const filterOptions = (options: CollectionOption[], params: FilterOptionsState<CollectionOption>) => {
    const filtered = filter(options, params);

    // handle user input
    if (params.inputValue !== '') {
      // ensure option is capitalised
      const firstLetter = params.inputValue[0].toUpperCase();
      const capitalisedInput = firstLetter + params.inputValue.slice(1);

      // suggest new category only if category doesn't exist
      if (!options.some(obj => obj.category.localeCompare(capitalisedInput, undefined, { sensitivity: 'accent' }) === 0)) {
        filtered.push({
          inputValue: capitalisedInput,
          category: `Add "${capitalisedInput}"`,
          firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
        });
      };
    };
    return filtered;
  };

  // determine option label shown to user
  const getOptionLabel = (option: string | CollectionOption) => {
    // value selected with enter, right from the input
    if (typeof option === 'string')
      return option[0].toUpperCase() + option.slice(1);

    // add "xxx" option that was created dynamically
    if (option.inputValue) 
      return `Add "${option.inputValue}"`;

    // regular option
    return option.category;
  };

  return (
    <Autocomplete
      multiple
      disableCloseOnSelect
      selectOnFocus
      clearOnBlur
      handleHomeEndKeys
      freeSolo
      autoComplete
      forcePopupIcon
      open={open}
      loading={loading}
      value={formValue}
      onOpen={handleForm}
      onClose={handleForm}
      onChange={handleFormChange}
      getOptionLabel={getOptionLabel}
      filterOptions={filterOptions}
      options={options.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))}
      groupBy={option => option.inputValue ? "Create new" : option.firstLetter}
      getOptionSelected={(option, value) => option.category === value.category}
      renderOption={(option: CollectionOption) => option.category}
      renderInput={(params) => (
        <TextField
          {...params}
          className={styles.text}
          style={fullScreen ? { width: '100%' } : { width: '80%' }}
          size="small"
          label="Categories"
          variant="outlined"
          helperText="Either search or add your own image tags!"
          placeholder="Search here..."
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

// styles
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    text: {
      [`& fieldset`]: {
        borderRadius: 25,
      },
    },
  }),
);

export default CollectionsAutocomplete;