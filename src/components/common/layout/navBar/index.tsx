import React, { Fragment, useState } from 'react';
import HeaderMenu from './headerMenu';
import LoginButtons from '../../buttons/loginButtons';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import CaptionButton from '../../buttons/captionButton';
import { Link } from 'react-router-dom';
import { Request, RequestEnums } from '../../../../store/types/request';
import { AppState } from '../../../../store/reducers';
import { useSelector } from 'react-redux';
import { namedRequestsInProgress } from '../../../../store/selectors/request';
import {
	AppBar,
	Toolbar,
	useMediaQuery,
	Grid,
	useScrollTrigger,
} from '@material-ui/core';
import { AuthState } from '../../../../store/types/auth';
import RedirectButton from '../../buttons/redirectButton';
import NavBarSkeleton from '../skeletons/navBarSkeleton';
import { Skeleton } from '@material-ui/lab';

const NavBar: React.FC = () => {
	// access styles and detect scrolling
	const styles = useStyles();
	const scrollTrigger = useScrollTrigger();
	const xsScreen = useMediaQuery('(max-width: 500px)');
	const smallScreen = useMediaQuery('(max-width: 650px)', {
		noSsr: true,
	});

	// only load when user status has been confirmed
	const isLoading = useSelector<AppState, Request['isLoading']>((state) =>
		namedRequestsInProgress(state, RequestEnums.getUser)
	);

	// retrieve user authentication
	const isAuthenticated = useSelector<AppState, AuthState['isAuthenticated']>(
		(state) => state.auth.isAuthenticated
	);

	// detect when image has loaded
	const [imageLoaded, setImageLoaded] = useState<boolean>(false);
	const handleImageLoad = () => setImageLoaded(true);

	return (
		<div className={styles.root}>
			<AppBar
				color='default'
				className={styles.nav}
				style={scrollTrigger ? { visibility: 'hidden' } : {}}
			>
				<Toolbar>
					<Link to='/'>
						<img
							className={styles.logo}
							src={smallScreen ? '/logo/logoSmall.png' : '/logo/logoLeft.png'}
							alt='logo'
							onLoad={handleImageLoad}
						/>
					</Link>
					{imageLoaded ? (
						''
					) : (
						<Skeleton
							animation='wave'
							className={styles.logoLoading}
							style={smallScreen ? { marginTop: 7 } : {}}
							variant={smallScreen ? 'circle' : 'text'}
							width={smallScreen ? 55 : 205}
							height={smallScreen ? 50 : 66}
						/>
					)}
					{isLoading || isAuthenticated === null ? (
						<NavBarSkeleton />
					) : (
						<Grid
							container
							spacing={2}
							justify='flex-end'
							alignItems='center'
							className={styles.contents}
						>
							{xsScreen ? (
								<Fragment>
									{isAuthenticated ? <HeaderMenu account={true} /> : ''}
									<HeaderMenu />
								</Fragment>
							) : (
								<Fragment>
									<Grid item>
										<RedirectButton url='/explore' label='Explore' />
									</Grid>
									<Grid item>
										<CaptionButton />
									</Grid>
									<Grid item>
										{isAuthenticated ? (
											<HeaderMenu account={true} />
										) : (
											<LoginButtons />
										)}
									</Grid>
								</Fragment>
							)}
						</Grid>
					)}
				</Toolbar>
			</AppBar>
		</div>
	);
};

// styles
const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			flexGrow: 1,
		},
		logo: {
			marginTop: 5,
			marginBottom: 3,
			marginLeft: '-5px',
		},
		logoLoading: {
			marginBottom: 7,
			marginLeft: '-5px',
		},
		contents: {
			marginRight: '-15px',
		},
		nav: {
			height: 64,
		},
	})
);

export default NavBar;
