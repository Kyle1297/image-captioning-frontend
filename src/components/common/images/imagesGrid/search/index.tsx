import React, { Dispatch, SetStateAction, useState } from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import { Button, Grid, useMediaQuery } from '@material-ui/core';
import CollectionsSelection from './collectionsSelection';
import { GetImagesParams } from '../../../../../store/actions/image';
import SearchField from './searchField';
import { Collection } from '../../../../../store/types/collection';

interface Props {
	getParams: GetImagesParams;
	setGetParams: Dispatch<SetStateAction<GetImagesParams>>;
	collection?: Collection;
}

const Search: React.FC<Props> = ({ getParams, setGetParams, collection }) => {
	// access styles
	const styles = useStyles();
	const smallScreen = useMediaQuery('(max-width: 700px)');
	const xsScreen = useMediaQuery('(max-width: 500px)');

	// control search field and collection selection
	const [search, setSearch] = useState<string>('');
	const [open, setOpen] = useState<boolean>(false);
	const [selections, setSelections] = useState<string[]>(
		collection ? [collection.category] : []
	);

	// fetch original public images and remove filters
	const handleClearClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
		setSearch('');
		setSelections([]);
		const { search, collections, ...rest } = getParams.filters;
		setGetParams({
			filters: {
				...rest,
				page: 1,
			},
			newFilter: true,
		});
	};

	return (
		<Grid
			container
			style={{ flexWrap: 'nowrap' }}
			className={styles.root}
			spacing={2}
			justify='center'
			alignItems='center'
		>
			{!xsScreen || (xsScreen && !open) ? (
				<Grid item xs>
					<SearchField
						setSearch={setSearch}
						setGetParams={setGetParams}
						getParams={getParams}
						search={search}
					/>
				</Grid>
			) : (
				''
			)}
			<Grid item xs={xsScreen && open}>
				<CollectionsSelection
					setGetParams={setGetParams}
					setSelections={setSelections}
					setOpen={setOpen}
					open={open}
					getParams={getParams}
					selections={selections}
					searchedCollection={collection}
				/>
			</Grid>
			{smallScreen ? (
				''
			) : (
				<Grid item>
					<Button
						className={styles.button}
						variant='contained'
						color='primary'
						onClick={handleClearClick}
						disabled={!selections.length && !search ? true : false}
					>
						Clear
					</Button>
				</Grid>
			)}
		</Grid>
	);
};

// styles
const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			marginBottom: theme.spacing(2.5),
			marginTop: theme.spacing(0.5),
		},
		button: {
			textTransform: 'none',
			borderRadius: '25px',
			width: 85,
			fontWeight: 'bold',
			height: 45,
		},
	})
);

export default Search;
