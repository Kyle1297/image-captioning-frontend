import React, { Dispatch, SetStateAction } from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import { Grid, TextField, Typography, useMediaQuery } from '@material-ui/core';
import { AppState } from '../../../../../store/reducers';
import { useSelector } from 'react-redux';
import { AuthState, UserPatch } from '../../../../../store/types/auth';

interface Props {
	setUserDetails: Dispatch<SetStateAction<UserPatch>>;
	userDetails: UserPatch;
}

const EditProfile: React.FC<Props> = ({ setUserDetails, userDetails }) => {
	// access styles
	const styles = useStyles();
	const smallScreen = useMediaQuery('(max-width: 550px');

	// retrieve user
	const user = useSelector<AppState, AuthState['user']>(
		(state) => state.auth.user
	);

	// handle form values
	const handleInputChange = (
		event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
		field: 'first_name' | 'last_name' | 'email'
	) => {
		event.preventDefault();
		userDetails[field] = event.target.value;
		setUserDetails({ ...userDetails });
	};

	return user ? (
		<Grid container spacing={1} direction='column'>
			<Grid item>
				<Typography className={styles.heading}>Edit profile</Typography>
			</Grid>
			<Grid item>
				<Typography variant='body2' color='textSecondary'>
					These details will not be visible without your explicit consent.
				</Typography>
			</Grid>
			<Grid item>
				<Grid container spacing={smallScreen ? 1 : 2}>
					<Grid item xs={smallScreen ? 12 : true}>
						<TextField
							fullWidth
							size='small'
							className={styles.text}
							variant='outlined'
							label='First name'
							onChange={(event) => handleInputChange(event, 'first_name')}
							value={userDetails.first_name}
						/>
					</Grid>
					<Grid item xs>
						<TextField
							fullWidth
							size='small'
							className={styles.text}
							variant='outlined'
							label='Last name'
							onChange={(event) => handleInputChange(event, 'last_name')}
							value={userDetails.last_name}
						/>
					</Grid>
				</Grid>
			</Grid>
			<Grid item>
				<TextField
					fullWidth
					size='small'
					className={styles.text}
					variant='outlined'
					label='Email'
					type='email'
					helperText={userDetails.email ? '' : 'This field cannot be empty.'}
					style={userDetails.email ? {} : { marginBottom: -10 }}
					error={userDetails.email ? false : true}
					onChange={(event) => handleInputChange(event, 'email')}
					value={userDetails.email}
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

export default EditProfile;
