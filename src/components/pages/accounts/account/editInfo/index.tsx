import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../../../../store/reducers';
import { AuthState, UserPatch } from '../../../../../store/types/auth';
import { updateUser } from '../../../../../store/actions/auth';
import EditProfile from './editProfile';
import EditAbout from './editAbout';
import {
	Button,
	CircularProgress,
	createStyles,
	Divider,
	makeStyles,
	Theme,
} from '@material-ui/core';
import { Request, RequestEnums } from '../../../../../store/types/request';
import {
	namedRequestError,
	namedRequestsInProgress,
} from '../../../../../store/selectors/request';
import { teal } from '@material-ui/core/colors';
import { setAlert } from '../../../../../store/actions/alert';
import { SeverityTypes } from '../../../../../store/types/alert';

const EditInfo: React.FC = () => {
	// access styles
	const styles = useStyles();

	// retrieve user states
	const user = useSelector<AppState, AuthState['user']>(
		(state) => state.auth.user
	);
	const isLoading = useSelector<AppState, Request['isLoading']>((state) =>
		namedRequestsInProgress(state, RequestEnums.updateUser)
	);
	const error = useSelector<AppState, Request['error']>((state) =>
		namedRequestError(state, RequestEnums.updateUser)
	);

	// set initial form values
	const [userDetails, setUserDetails] = useState<UserPatch>({
		email: '',
		first_name: '',
		last_name: '',
		interest_ids: [],
		profile: {
			bio: '',
			location: '',
		},
	});

	// set user details
	useEffect(() => {
		if (user) {
			setUserDetails({
				email: user.email,
				first_name: user.first_name,
				last_name: user.last_name,
				interest_ids: user.profile.interests.map((interest) => interest.id),
				profile: {
					bio: user.profile.bio,
					location: user.profile.location,
				},
			});
		}
	}, [user]);

	// handle form submission
	const dispatch = useDispatch();
	const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
	const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setFormSubmitted(true);
		dispatch(updateUser(userDetails));
	};

	// alert outcome of updating
	useEffect(() => {
		if (!isLoading && formSubmitted) {
			setFormSubmitted(false);
			dispatch(
				setAlert({
					severity: error ? SeverityTypes.ERROR : SeverityTypes.SUCCESS,
					message: error
						? `There was an error. ${
								error?.data?.email || error?.data?.profile?.location
									? `The ${
											error?.data?.email ? 'email' : 'location'
									  } field is required`
									: 'Please try again later'
						  }.`
						: 'Your account was successfully updated!',
					open: true,
					loading: false,
				})
			);
		}
	}, [isLoading, dispatch, formSubmitted, error]);

	return (
		<form onSubmit={handleFormSubmit}>
			<EditProfile userDetails={userDetails} setUserDetails={setUserDetails} />
			<Divider className={styles.dividerMiddle} />
			<EditAbout userDetails={userDetails} setUserDetails={setUserDetails} />
			<Button
				fullWidth
				disabled={
					!userDetails.email || !userDetails.profile?.location ? true : false
				}
				size='medium'
				variant='contained'
				type='submit'
				className={styles.button}
			>
				{isLoading ? (
					<CircularProgress size={24} className={styles.loading} />
				) : (
					'Update account'
				)}
			</Button>
		</form>
	);
};

// styles
const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		button: {
			marginTop: 30,
			marginBottom: 30,
			textTransform: 'none',
		},
		dividerMiddle: {
			marginTop: 35,
			marginBottom: 25,
		},
		loading: {
			color: teal[900],
		},
	})
);

export default EditInfo;
