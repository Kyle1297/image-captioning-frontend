import React, { useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import CoverText from './coverText';
import OpenDialogFab from './openDialogFab';
import { Grid } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';

const BackgroundCover: React.FC = () => {
	// access style classes
	const styles = useStyles();

	// detect when image has loaded
	const [imageLoaded, setImageLoaded] = useState<boolean>(false);
	const handleImageLoad = () => setImageLoaded(true);

	return (
		<div className={styles.root}>
			<img
				className={styles.image}
				src='/homeImage.jpg'
				alt='Home background'
				style={imageLoaded ? {} : { display: 'none' }}
				onLoad={handleImageLoad}
			/>
			{imageLoaded ? (
				''
			) : (
				<Skeleton className={styles.image} animation='wave' variant='rect' />
			)}
			<Grid
				container
				direction='column'
				justify='center'
				alignItems='center'
				className={styles.content}
			>
				<Grid item>
					<CoverText />
				</Grid>
				<Grid item>
					<OpenDialogFab />
				</Grid>
			</Grid>
		</div>
	);
};

// styles
const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			position: 'relative',
			display: 'inline-block',
			marginTop: '-21px',
		},
		image: {
			width: '100vw',
			'@media only screen and (max-height: 400px)': {
				height: '85vh',
			},
			'@media only screen and (min-height: 400px) and (max-height: 700px)': {
				height: '70vh',
			},
			'@media only screen and (min-height: 700px) and (max-height: 800px)': {
				height: '60vh',
			},
			'@media only screen and (min-height: 800px) and (max-height: 1000px)': {
				height: '55vh',
			},
			'@media only screen and (min-height: 1000px)': {
				height: '50vh',
			},
		},
		content: {
			position: 'absolute',
			left: '50%',
			top: '50%',
			transform: 'translate(-50%, -50%)',
			color: '#FFFFFF',
			textAlign: 'center',
		},
	})
);

export default BackgroundCover;
