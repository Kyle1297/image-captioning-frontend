import React, { useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import grey from '@material-ui/core/colors/grey';
import { Container, Grid, useMediaQuery } from '@material-ui/core';
import GitHubIcon from '@material-ui/icons/GitHub';
import { Link } from 'react-router-dom';
import { Skeleton } from '@material-ui/lab';

const Footer = () => {
	// control styling
	const styles = useStyles();
	const smallScreen = useMediaQuery('(max-width: 319px)');

	// detect when image has loaded
	const [imageLeftLoaded, setImageLeftLoaded] = useState<boolean>(false);
	const [imageMiddleLoaded, setImageMiddleLoaded] = useState<boolean>(false);
	const handleImageLeftLoad = () => setImageLeftLoaded(true);
	const handleImageMiddleLoad = () => setImageMiddleLoaded(true);

	return (
		<div className={styles.root}>
			<Container maxWidth='xl'>
				<Grid container justify='space-between' alignItems='center'>
					<Grid item>
						<Link to='/'>
							<img
								src='/logo/logoSmall.png'
								alt='logo'
								onLoad={handleImageLeftLoad}
								style={imageLeftLoaded ? {} : { display: 'none' }}
							/>
						</Link>
						{imageLeftLoaded ? (
							''
						) : (
							<Skeleton
								animation='wave'
								variant='circle'
								width={52}
								height={57}
							/>
						)}
					</Grid>
					{smallScreen ? (
						''
					) : (
						<Grid item>
							<Link to='/'>
								<img
									onLoad={handleImageMiddleLoad}
									src='/logo/logoWords.png'
									alt='logo'
									style={imageMiddleLoaded ? {} : { display: 'none' }}
								/>
							</Link>
							{imageMiddleLoaded ? (
								''
							) : (
								<Skeleton
									animation='wave'
									variant='rect'
									width={171}
									height={45}
								/>
							)}
						</Grid>
					)}
					<Grid item>
						<a className={styles.github} href='https://github.com/Kyle1297'>
							<GitHubIcon fontSize='large' />
						</a>
					</Grid>
				</Grid>
			</Container>
		</div>
	);
};

// styles
const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			background: grey[200],
			paddingTop: 8,
			paddingBottom: 8,
		},
		github: {
			color: 'gray',
		},
	})
);

export default Footer;
