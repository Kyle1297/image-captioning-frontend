import React, {
	useState,
	useEffect,
	Fragment,
	Dispatch,
	SetStateAction,
} from 'react';
import { TextField, CircularProgress, useMediaQuery } from '@material-ui/core';
import {
	getCollections,
	createCollection,
	setCollection,
} from '../../../store/actions/collection';
import { FilterOptionsState } from '@material-ui/lab/useAutocomplete';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../../store/reducers';
import { Request, RequestEnums } from '../../../store/types/request';
import Autocomplete, {
	createFilterOptions,
} from '@material-ui/lab/Autocomplete';
import {
	createStyles,
	makeStyles,
	Theme,
	useTheme,
} from '@material-ui/core/styles';
import {
	namedRequestError,
	namedRequestsInProgress,
} from '../../../store/selectors/request';
import {
	Collection,
	CollectionsState,
	CollectionState,
} from '../../../store/types/collection';
import { ImagePost } from '../../../store/types/image';
import { AuthState, UserPatch } from '../../../store/types/auth';

interface CollectionOption {
	id?: number;
	category: string;
	is_main?: boolean;
	firstLetter: string;
	inputValue?: string;
}

interface Props {
	setImage?: Dispatch<SetStateAction<ImagePost>>;
	image?: ImagePost;
	setUserDetails?: Dispatch<SetStateAction<UserPatch>>;
	userDetails?: UserPatch;
}

const CollectionsAutocomplete: React.FC<Props> = ({
	setImage,
	image,
	setUserDetails,
	userDetails,
}) => {
	// check whether a fullscreen dialog is more appropriate for screensize
	const styles = useStyles();
	const theme = useTheme();
	const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));

	// retrieve collection states
	const dispatch = useDispatch();
	const collections = useSelector<AppState, CollectionsState['collections']>(
		(state) => state.collections.collections
	);
	const isLoadingGet = useSelector<AppState, Request['isLoading']>((state) =>
		namedRequestsInProgress(state, RequestEnums.getCollections)
	);
	const getError = useSelector<AppState, Request['error']>((state) =>
		namedRequestError(state, RequestEnums.getCollections)
	);

	// retrieve current user
	const user = useSelector<AppState, AuthState['user']>(
		(state) => state.auth.user
	);

	// retrieve created collection
	const createdCollection = useSelector<
		AppState,
		CollectionState['collection']
	>((state) => state.collection.collection);
	const createError = useSelector<AppState, Request['error']>((state) =>
		namedRequestError(state, RequestEnums.createCollection)
	);

	// control appearance of select options
	const [open, setOpen] = useState(false);
	const [options, setOptions] = useState<CollectionOption[]>([]);
	const handleForm = () => setOpen(!open);

	// allow an 'Add' option to be created and control form states
	const filter = createFilterOptions<CollectionOption>();
	const [formValue, setFormValue] = useState<(string | CollectionOption)[]>([]);

	useEffect(() => {
		if (userDetails && user?.profile?.interests) {
			setFormValue(
				user.profile.interests.map((interest) => {
					const firstLetter = interest.category[0].toUpperCase();
					return {
						id: interest.id,
						category: interest.category,
						firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
					};
				})
			);
		}
	}, [user]); // eslint-disable-line react-hooks/exhaustive-deps

	// fetch collections
	useEffect(() => {
		dispatch(getCollections());
	}, [dispatch]);

	// generate collection options with new firstLetter property
	useEffect(() => {
		let newOptions = [] as CollectionOption[];
		collections.forEach((collection: Collection) => {
			const firstLetter = collection.category[0].toUpperCase();
			newOptions.push({
				id: collection.id,
				category: collection.category,
				firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
			});
		});
		setOptions(newOptions);
	}, [collections]);

	// create new collection
	const createNewCollection = (category: string, firstLetter: string) => {
		let data = {
			category: category,
			creator: user ? user.id : null,
		};
		dispatch(createCollection(data));
	};

	// add newly created collection to options
	useEffect(() => {
		if (createdCollection) {
			// determine firstLetter of category for grouping
			let firstLetter = createdCollection.category[0].toUpperCase();
			firstLetter = /[0-9]/.test(firstLetter) ? '0-9' : firstLetter;

			// set options and form values
			setOptions([
				...options,
				{
					id: createdCollection.id,
					category: createdCollection.category,
					firstLetter: firstLetter,
				},
			]);
			setFormValue([
				...formValue,
				{
					id: createdCollection.id,
					category: createdCollection.category,
					firstLetter: firstLetter,
				},
			]);
			dispatch(setCollection(null));
		}
	}, [createdCollection]); // eslint-disable-line react-hooks/exhaustive-deps

	// handle changing of selected form values
	const [limitError, setLimitError] = useState<boolean>(false);
	const handleFormChange = (
		event: React.ChangeEvent<{}>,
		newFormValue: (string | CollectionOption)[]
	) => {
		// limit number of user interests to 5
		if (userDetails && newFormValue.length > 5) {
			setLimitError(true);
			setOpen(false);
		} else {
			// otherwise accept new value
			let newValue = newFormValue[newFormValue.length - 1];
			setLimitError(false);

			// value from enter
			if (typeof newValue === 'string') {
				// ensure new value is capitalised
				const firstLetter = newValue[0].toUpperCase();
				const capitalisedInput = firstLetter + newValue.slice(1);

				// add to selected values if option exists
				let currentOption = options.find(
					(obj) =>
						obj.category.localeCompare(capitalisedInput, undefined, {
							sensitivity: 'accent',
						}) === 0
				);
				if (
					currentOption &&
					!formValue.some(
						(obj) =>
							typeof obj !== 'string' &&
							obj.category.localeCompare(capitalisedInput, undefined, {
								sensitivity: 'accent',
							}) === 0
					)
				) {
					setFormValue([...formValue, currentOption]);
				}

				// create new category and add to form values
				else if (!currentOption)
					createNewCollection(
						capitalisedInput,
						/[0-9]/.test(firstLetter) ? '0-9' : firstLetter
					);
			}

			// add "xxx" option that was created dynamically
			else if (newValue && newValue.inputValue) {
				createNewCollection(newValue.inputValue, newValue.firstLetter);
			}

			// regular value
			else setFormValue(newFormValue);
		}
	};

	// handle the filtering of autocomplete options
	const filterOptions = (
		options: CollectionOption[],
		params: FilterOptionsState<CollectionOption>
	) => {
		const filtered = filter(options, params);

		// handle user input
		if (params.inputValue !== '') {
			// ensure option is capitalised
			const firstLetter = params.inputValue[0].toUpperCase();
			const capitalisedInput = firstLetter + params.inputValue.slice(1);

			// suggest new category only if category doesn't exist
			if (
				!options.some(
					(obj) =>
						obj.category.localeCompare(capitalisedInput, undefined, {
							sensitivity: 'accent',
						}) === 0
				)
			) {
				filtered.push({
					inputValue: capitalisedInput,
					category: `Add "${capitalisedInput}"`,
					firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
				});
			}
		}
		return filtered;
	};

	// determine option label shown to user
	const getOptionLabel = (option: string | CollectionOption) => {
		// value selected with enter, right from the input
		if (typeof option === 'string')
			return option[0].toUpperCase() + option.slice(1);

		// add "xxx" option that was created dynamically
		if (option.inputValue) return `Add "${option.inputValue}"`;

		// regular option
		return option.category;
	};

	// add selections to image collections
	useEffect(() => {
		// remove strings from any form values
		let newCollections = formValue.filter(
			(collection) => typeof collection !== 'string'
		) as Collection[];

		// extract only ids
		let collectionIds = newCollections.map((collection) => {
			const { id } = collection;
			return id;
		}) as number[];
		if (!collectionIds) collectionIds = [];

		// add to data collections
		if (image && setImage) {
			setImage({
				...image,
				collection_ids: collectionIds,
			});
		} else if (userDetails && setUserDetails) {
			userDetails.interest_ids = collectionIds;
			setUserDetails({ ...userDetails });
		}
	}, [formValue]); // eslint-disable-line react-hooks/exhaustive-deps

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
			loading={isLoadingGet}
			value={formValue}
			onOpen={handleForm}
			onClose={handleForm}
			onChange={handleFormChange}
			getOptionLabel={getOptionLabel}
			filterOptions={filterOptions}
			options={options.sort(
				(a, b) => -b.firstLetter.localeCompare(a.firstLetter)
			)}
			groupBy={(option) =>
				option.inputValue ? 'Create new' : option.firstLetter
			}
			getOptionSelected={(option, value) => option.category === value.category}
			renderOption={(option) => option.category}
			ChipProps={{
				size: 'small',
			}}
			renderInput={(params) => (
				<TextField
					{...params}
					className={userDetails ? styles.interests : styles.collections}
					style={
						fullScreen || userDetails ? { width: '100%' } : { width: '80%' }
					}
					size='small'
					label={image ? 'Collections' : 'Interests'}
					variant='outlined'
					helperText={(() => {
						if (createError)
							return "Hmmm... we couldn't create your new collection. Please try again later.";
						else if (getError)
							return "Hmmm... seems like we couldn't retrieve all collections. Please try again later.";
						else if (limitError)
							return 'Unfortunately, no more than 5 interests can be chosen.';
						else
							return `Either search or add your own ${
								userDetails ? 'interests, up to a maximum of 5' : 'image tags'
							}!`;
					})()}
					FormHelperTextProps={
						limitError
							? {
									error: true,
							  }
							: {}
					}
					placeholder={formValue.length < 5 ? 'Search here...' : ''}
					error={getError || createError ? true : false}
					InputProps={{
						...params.InputProps,
						endAdornment: (
							<Fragment>
								{isLoadingGet ? (
									<CircularProgress color='inherit' size={20} />
								) : null}
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
		collections: {
			[`& fieldset`]: {
				borderRadius: 25,
			},
		},
		interests: {
			marginTop: 27,
		},
	})
);

export default CollectionsAutocomplete;
