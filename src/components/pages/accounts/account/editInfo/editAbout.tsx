import React, { Dispatch, SetStateAction } from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import { Grid, TextField, Typography } from '@material-ui/core';
import { AppState } from '../../../../../store/reducers';
import { useSelector } from 'react-redux';
import { AuthState, UserPatch } from '../../../../../store/types/auth';
import CollectionsAutocomplete from '../../../../common/collections/collectionsAutocomplete';

interface Props {
	setUserDetails: Dispatch<SetStateAction<UserPatch>>;
	userDetails: UserPatch;
}

const EditAbout: React.FC<Props> = ({ setUserDetails, userDetails }) => {
	// access styles
	const styles = useStyles();

	// retrieve user
	const user = useSelector<AppState, AuthState['user']>(
		(state) => state.auth.user
	);

	// handle form values
	const handleInputChange = (
		event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
		field: 'location' | 'bio'
	) => {
		event.preventDefault();
		if (userDetails.profile) {
			userDetails.profile[field] = event.target.value;
			setUserDetails({ ...userDetails });
		}
	};

	return user ? (
		<Grid container spacing={1} direction='column'>
			<Grid item>
				<Typography className={styles.heading}>About</Typography>
			</Grid>
			<Grid item>
				<Typography variant='body2' color='textSecondary'>
					These details will be shown on your public profile page.
				</Typography>
			</Grid>
			<Grid item>
				<TextField
					fullWidth
					size='small'
					className={styles.text}
					variant='outlined'
					label='Location'
					helperText={
						userDetails.profile?.location ? '' : 'This field cannot be empty.'
					}
					style={userDetails.profile?.location ? {} : { marginBottom: -10 }}
					error={userDetails.profile?.location ? false : true}
					onChange={(event) => handleInputChange(event, 'location')}
					value={userDetails.profile?.location}
				/>
			</Grid>
			<Grid item>
				<CollectionsAutocomplete
					setUserDetails={setUserDetails}
					userDetails={userDetails}
				/>
			</Grid>
			<Grid item>
				<TextField
					fullWidth
					multiline
					className={styles.text}
					rows={4}
					size='small'
					variant='outlined'
					label='Bio'
					onChange={(event) => handleInputChange(event, 'bio')}
					value={userDetails.profile?.bio}
				/>
			</Grid>
		</Grid>
	) : (
		<div />
	);
};

// styles
const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		text: {
			marginTop: 27,
		},
		heading: {
			fontSize: 17,
		},
	})
);

export default EditAbout;
