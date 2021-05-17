import React, { useEffect, useMemo, useState } from 'react';
import { Grid } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import {
	getImages,
	GetImagesParams,
} from '../../../../../../store/actions/image';
import ImageResults from '../../../../../common/images/imagesGrid/imageResults';
import { AppState } from '../../../../../../store/reducers';
import { AuthState } from '../../../../../../store/types/auth';
import { ProfileTabTypes } from '..';
import DisplayMessage, {
	MessageType,
} from '../../../../../common/layout/displayMessage';
import UserCard from './userCard';

interface Props {
	tab: string;
}

const TabContents: React.FC<Props> = ({ tab }) => {
	// control styles
	const styles = useStyles();

	// retrieve users
	const loggedUser = useSelector<AppState, AuthState['user']>(
		(state) => state.auth.user
	);
	const publicUser = useSelector<AppState, AuthState['publicUser']>(
		(state) => state.auth.publicUser
	);

	// set initial filters
	const baseParams: GetImagesParams = useMemo(() => {
		return {
			filters: {
				is_private: false,
				is_profile_image: false,
				uploader: undefined,
				liked: undefined,
				page: 1,
			},
			newFilter: true,
		};
	}, []);
	const [getParams, setGetParams] = useState<GetImagesParams>(baseParams);

	// fetch images according to current tab
	const dispatch = useDispatch();
	useEffect(() => {
		if (getParams.filters.uploader || getParams.filters.liked) {
			dispatch(getImages(getParams.filters, getParams.newFilter));
		}
	}, [dispatch, getParams]);

	// set filters according to current tab
	useEffect(() => {
		// visibility filters
		if (tab === ProfileTabTypes.PRIVATE) {
			setGetParams({
				...baseParams,
				filters: {
					...baseParams.filters,
					is_private: true,
					uploader: publicUser?.id,
				},
			});
		} else if (tab === ProfileTabTypes.PUBLIC) {
			setGetParams({
				...baseParams,
				filters: {
					...baseParams.filters,
					uploader: publicUser?.id,
				},
			});
		}

		// liking filters
		else if (tab === ProfileTabTypes.LIKED) {
			setGetParams({
				...baseParams,
				filters: {
					...baseParams.filters,
					is_private: loggedUser?.id === publicUser?.id ? undefined : false,
					liked: publicUser?.id,
				},
			});
		}
	}, [tab, dispatch, baseParams]); // eslint-disable-line react-hooks/exhaustive-deps

	return publicUser ? (
		(() => {
			switch (tab) {
				case ProfileTabTypes.FOLLOWERS: {
					return publicUser.profile.followers.length ? (
						<Grid container spacing={2}>
							{publicUser.profile.followers.map((user) => (
								<UserCard key={user.id} user={user} />
							))}
						</Grid>
					) : (
						<div className={styles.contents}>
							<DisplayMessage
								message='No followers just yet!'
								type={MessageType.ERROR}
							/>
						</div>
					);
				}
				case ProfileTabTypes.FOLLOWING: {
					return publicUser.profile.following.length ? (
						<Grid container spacing={2}>
							{publicUser.profile.following.map((user) => (
								<UserCard key={user.id} user={user} />
							))}
						</Grid>
					) : (
						<div className={styles.contents}>
							<DisplayMessage
								message='Not following anyone just yet!'
								type={MessageType.ERROR}
							/>{' '}
						</div>
					);
				}
				default: {
					return (
						<div className={styles.contents}>
							<ImageResults
								removeHover={true}
								getParams={getParams}
								setGetParams={setGetParams}
							/>
						</div>
					);
				}
			}
		})()
	) : (
		<div />
	);
};

// styles
const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		contents: {
			textAlign: 'center',
		},
	})
);

export default TabContents;
