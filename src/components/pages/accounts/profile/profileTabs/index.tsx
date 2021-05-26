import React, { useState } from 'react';
import {
	Tabs,
	Divider,
	Tab,
	withStyles,
	TabScrollButton,
} from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TabIconLabel from './tabIconLabel';
import { useSelector } from 'react-redux';
import { AuthState } from '../../../../../store/types/auth';
import TabContents from './tabContents';
import { AppState } from '../../../../../store/reducers';
import {
	Favorite,
	Group,
	RecordVoiceOver,
	Visibility,
	VisibilityOff,
} from '@material-ui/icons';

export enum ProfileTabTypes {
	PUBLIC = 'PUBLIC',
	PRIVATE = 'PRIVATE',
	LIKED = 'LIKED',
	FOLLOWING = 'FOLLOWING',
	FOLLOWERS = 'FOLLOWERS',
}

const ProfileTabs: React.FC = () => {
	// control styles
	const styles = useStyles();

	// switch tabs
	const [tab, setTab] = useState<string>(ProfileTabTypes.PUBLIC);
	const handleTabs = (event: React.ChangeEvent<{}>, value: string) => {
		setTab(value);
	};

	// retrieve users
	const loggedUser = useSelector<AppState, AuthState['user']>(
		(state) => state.auth.user
	);
	const publicUser = useSelector<AppState, AuthState['publicUser']>(
		(state) => state.auth.publicUser
	);

	return publicUser ? (
		<div className={styles.root}>
			{publicUser?.username !== 'Anonymous' ? (
				<Tabs
					value={tab}
					indicatorColor='primary'
					textColor='primary'
					variant='scrollable'
					onChange={handleTabs}
					ScrollButtonComponent={HideScrollButton}
				>
					<Tab
						value={ProfileTabTypes.PUBLIC}
						className={styles.tab}
						label={
							<TabIconLabel
								count={publicUser.counts.public}
								label={loggedUser?.id === publicUser.id ? 'Public' : 'Photos'}
								Icon={Visibility}
							/>
						}
					/>
					{loggedUser?.id === publicUser.id ? (
						<Tab
							value={ProfileTabTypes.PRIVATE}
							className={styles.tab}
							label={
								<TabIconLabel
									count={publicUser.counts.private}
									label='Private'
									Icon={VisibilityOff}
								/>
							}
						/>
					) : (
						''
					)}
					<Tab
						value={ProfileTabTypes.LIKED}
						className={styles.tab}
						label={
							<TabIconLabel
								count={publicUser.counts.liked}
								label='Liked'
								Icon={Favorite}
							/>
						}
					/>
					<Tab
						value={ProfileTabTypes.FOLLOWING}
						className={styles.tab}
						label={
							<TabIconLabel
								count={publicUser.profile.following.length}
								label='Following'
								Icon={RecordVoiceOver}
							/>
						}
					/>
					<Tab
						value={ProfileTabTypes.FOLLOWERS}
						className={styles.tab}
						label={
							<TabIconLabel
								count={publicUser.profile.followers.length}
								label='Followers'
								Icon={Group}
							/>
						}
					/>
				</Tabs>
			) : (
				''
			)}
			<Divider classes={{ root: styles.divider }} />
			<TabContents tab={tab} />
		</div>
	) : (
		<div />
	);
};

// styles
const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			marginTop: 28,
			marginBottom: 20,
		},
		divider: {
			width: '100%',
			margin: 'auto',
			marginBottom: 15,
		},
		tab: {
			minWidth: 110,
		},
	})
);

// remove scroll button on desktop
const HideScrollButton = withStyles((theme) => ({
	root: {
		width: 28,
		overflow: 'hidden',
		transition: 'width 0.3s',
		'&.Mui-disabled': {
			width: 0,
		},
	},
}))(TabScrollButton);

export default ProfileTabs;
