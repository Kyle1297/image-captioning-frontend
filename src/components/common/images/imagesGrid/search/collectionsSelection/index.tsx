import React, { useEffect, Dispatch, SetStateAction, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import { AppState } from '../../../../../../store/reducers';
import {
	Collection,
	CollectionsState,
} from '../../../../../../store/types/collection';
import {
	extendCollections,
	getCollections,
} from '../../../../../../store/actions/collection';
import {
	namedRequestError,
	namedRequestsInProgress,
} from '../../../../../../store/selectors/request';
import { RequestEnums, Request } from '../../../../../../store/types/request';
import CircularProgress from '@material-ui/core/CircularProgress';
import { GetImagesParams } from '../../../../../../store/actions/image';
import { Cancel } from '@material-ui/icons';
import {
	Chip,
	FormControl,
	Grid,
	InputAdornment,
	InputLabel,
	ListSubheader,
	MenuItem,
	OutlinedInput,
	Select,
	Typography,
	useMediaQuery,
	useTheme,
} from '@material-ui/core';
import checkArraysEqual from '../../../../../utils/checkArraysEqual';
import { blue, teal } from '@material-ui/core/colors';
import CollectionsIconButton from './collectionsIconButton';

interface Props {
	getParams: GetImagesParams;
	selections: string[];
	open: boolean;
	setOpen: Dispatch<SetStateAction<boolean>>;
	setGetParams: Dispatch<SetStateAction<GetImagesParams>>;
	setSelections: Dispatch<SetStateAction<string[]>>;
	searchedCollection?: Collection;
}

const CollectionsSelection: React.FC<Props> = ({
	getParams,
	selections,
	open,
	setOpen,
	setGetParams,
	setSelections,
	searchedCollection,
}) => {
	// access styles
	const styles = useStyles();
	const theme = useTheme();
	const smallScreen = useMediaQuery('(max-width: 500px)');

	// add dispatch and select ref
	const dispatch = useDispatch();
	const selectRef = useRef<HTMLInputElement>(null);

	// retrieve collections
	const collections = useSelector<AppState, CollectionsState['collections']>(
		(state) => state.collections.collections
	);
	const isLoading = useSelector<AppState, Request['isLoading']>((state) =>
		namedRequestsInProgress(state, RequestEnums.getCollections)
	);
	const error = useSelector<AppState, Request['error']>((state) =>
		namedRequestError(state, RequestEnums.getCollections)
	);

	// fetch collections
	useEffect(() => {
		const collectionFilters = {
			is_main: true,
		};
		dispatch(getCollections(collectionFilters));
	}, [dispatch]);

	useEffect(() => {
		if (selections.length && !isLoading && searchedCollection)
			dispatch(extendCollections(searchedCollection));
	}, [isLoading, dispatch]); // eslint-disable-line react-hooks/exhaustive-deps

	// handle selection
	const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
		const value = event.target.value as string[];
		if (!value.length || value[value.length - 1]) setSelections(value);
	};

	// allow selection to be removed and update search
	const removeSelection = (event: any, value: string) => {
		const newSelections = selections.filter((selection) => selection !== value);
		setSelections(newSelections);
		updateCollectionsFilter(newSelections);

		// refocus onto select input
		if (selectRef && selectRef.current) selectRef.current.focus();
	};

	// update search after menu close and handle opening
	const handleOpen = () => setOpen(true);
	const handleClose = () => {
		setOpen(false);
		if (
			(getParams.filters.collections &&
				!checkArraysEqual(
					getParams.filters.collections as string[],
					selections
				)) ||
			(!getParams.filters.collections && selections.length)
		)
			updateCollectionsFilter(selections);
	};

	// updating filter
	const updateCollectionsFilter = (newSelections: string[]) => {
		if (newSelections.length)
			setGetParams({
				filters: {
					...getParams.filters,
					collections: newSelections,
					page: 1,
				},
				newFilter: true,
			});
		else {
			const { collections, ...rest } = getParams.filters;
			setGetParams({
				filters: {
					...rest,
					page: 1,
				},
				newFilter: true,
			});
		}
	};

	return (
		<Grid container spacing={1}>
			{!smallScreen || (smallScreen && open) ? (
				<Grid item xs>
					<FormControl
						className={styles.root}
						error={error ? true : false}
						style={smallScreen && open ? { width: '100%' } : { width: 165 }}
					>
						{selections.length ? (
							''
						) : (
							<InputLabel
								disabled
								id='label'
								shrink={false}
								className={styles.label}
							>
								Collections
							</InputLabel>
						)}
						<Select
							inputRef={selectRef}
							id='collections-select'
							labelId='label'
							multiple
							value={selections}
							open={open}
							onChange={handleChange}
							onOpen={handleOpen}
							onClose={handleClose}
							input={<OutlinedInput className={styles.input} />}
							endAdornment={
								isLoading ? (
									<InputAdornment className={styles.loading} position='end'>
										<CircularProgress color='inherit' size={20} />
									</InputAdornment>
								) : (
									''
								)
							}
							renderValue={
								smallScreen
									? undefined
									: (selected) => {
											let last = (selected as string[])[
												(selected as string[]).length - 1
											];
											return (
												<div className={styles.chips}>
													<Chip
														clickable
														size='small'
														key={last}
														label={last}
														className={styles.chip}
														onDelete={(event) => removeSelection(event, last)}
														deleteIcon={
															<Cancel
																fontSize='small'
																onMouseDown={(event) => event.stopPropagation()}
															/>
														}
													/>
													{selections.length ? (
														<Typography className={styles.text}>
															+{selections.length - 1}
														</Typography>
													) : (
														''
													)}
												</div>
											);
									  }
							}
							MenuProps={{
								PaperProps: {
									style: {
										maxHeight: 48 * 4.5 + 8, // ITEM_HEIGHT * 4.5  + ITEM_PADDING_TOP
									},
								},
								variant: 'menu',
								getContentAnchorEl: null,
								disableScrollLock: true,
								transitionDuration: 0.45,
							}}
						>
							<ListSubheader className={styles.subHeader}>
								Collections
							</ListSubheader>
							{collections.map((collection) =>
								collection.is_main ||
								collection.id === searchedCollection?.id ? (
									<MenuItem
										className={styles.menuItem}
										style={getStyles(collection.category, selections, theme)}
										key={collection.id}
										value={collection.category}
									>
										{collection.category}
									</MenuItem>
								) : (
									''
								)
							)}
						</Select>
					</FormControl>
				</Grid>
			) : (
				''
			)}
			<CollectionsIconButton handleOpen={handleOpen} selections={selections} />
		</Grid>
	);
};

// styles
const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			[`& fieldset`]: {
				borderRadius: 25,
			},
		},
		loading: {
			marginRight: theme.spacing(3),
			marginTop: 2,
		},
		chips: {
			display: 'flex',
			flexWrap: 'nowrap',
			overflowX: 'hidden',
		},
		chip: {
			margin: '2px 2px 2px 0px',
			minWidth: 70,
		},
		input: {
			height: 45,
			'& .MuiSelect-select:focus': {
				backgroundColor: 'transparent',
			},
		},
		text: {
			marginTop: 2,
			marginLeft: 6,
		},
		label: {
			transform: 'translate(20%, 97%)',
		},
		error: {
			marginBottom: '-21px',
			textAlign: 'center',
		},
		subHeader: {
			position: 'relative',
		},
		menuItem: {
			'&:hover': {
				backgroundColor: teal[50],
			},
		},
	})
);

const getStyles = (category: string, selections: string[], theme: Theme) => {
	const selected = selections.indexOf(category) !== -1;
	return {
		fontWeight: selected
			? theme.typography.fontWeightMedium
			: theme.typography.fontWeightRegular,
		backgroundColor: selected ? blue[100] : '',
	};
};

export default CollectionsSelection;
