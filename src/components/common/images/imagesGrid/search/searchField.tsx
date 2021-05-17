import React, { Dispatch, SetStateAction, useEffect, useRef } from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import { IconButton, InputAdornment, TextField } from '@material-ui/core';
import { GetImagesParams } from '../../../../../store/actions/image';
import SearchIcon from '@material-ui/icons/Search';

interface Props {
	search: string;
	getParams: GetImagesParams;
	setGetParams: Dispatch<SetStateAction<GetImagesParams>>;
	setSearch: Dispatch<SetStateAction<string>>;
}

const SearchField: React.FC<Props> = ({
	search,
	getParams,
	setGetParams,
	setSearch,
}) => {
	// access styles and add ref
	const styles = useStyles();
	const searchRef = useRef<HTMLInputElement>(null);

	// control search input
	const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
		const newSearch = event.currentTarget.value;
		setSearch(newSearch);
	};

	// debounce search api call
	useEffect(() => {
		const delayDebounceFn = setTimeout(() => {
			if (search)
				setGetParams({
					filters: {
						...getParams.filters,
						search: search,
						page: 1,
					},
					newFilter: true,
				});
			else if (!search && getParams.filters.search) {
				const { search, ...rest } = getParams.filters;
				setGetParams({
					filters: {
						...rest,
						page: 1,
					},
					newFilter: true,
				});
			}
		}, 1250);

		return () => clearTimeout(delayDebounceFn);
	}, [search]); // eslint-disable-line react-hooks/exhaustive-deps

	// focus search field when icon is clicked
	const handleSearchAdornment = (
		event: React.MouseEvent<HTMLButtonElement>
	) => {
		event.preventDefault();
		searchRef?.current?.focus();
	};

	return (
		<TextField
			fullWidth
			inputRef={searchRef}
			className={styles.textField}
			variant='outlined'
			placeholder='Search here...'
			onChange={handleSearch}
			value={search}
			InputLabelProps={{
				shrink: false,
			}}
			InputProps={{
				style: { height: 45 },
				startAdornment: (
					<IconButton
						size='small'
						disableRipple
						onClick={handleSearchAdornment}
					>
						<InputAdornment position='start'>
							<SearchIcon />
						</InputAdornment>
					</IconButton>
				),
			}}
		/>
	);
};

// styles
const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		textField: {
			[`& fieldset`]: {
				borderRadius: 25,
			},
		},
	})
);

export default SearchField;
