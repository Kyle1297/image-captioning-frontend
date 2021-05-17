import React, { Fragment } from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import { Button, Grid, Typography } from '@material-ui/core';
import { ImageState } from '../../../../store/types/image';
import { Star } from '@material-ui/icons';
import { AppState } from '../../../../store/reducers';
import { useSelector } from 'react-redux';
import { Collection } from '../../../../store/types/collection';
import { useHistory } from 'react-router';

const SingleImageHoverContents: React.FC = () => {
	// retrieve styles and history router
	const styles = useStyles();
	const history = useHistory();

	// retrieve image
	const image = useSelector<AppState, ImageState['image']>(
		(state) => state.image.image
	);

	// redirect to explore page with appropriate filter
	const handleCollectionClick = (collection: Collection) => {
		history.push('/explore', {
			collection: collection,
		});
	};

	return image ? (
		<Fragment>
			<Grid item>
				<Star className={styles.icon} />
			</Grid>
			{image.collections.map((collection) => (
				<Grid item key={collection.id} className={styles.collection}>
					<Button
						className={styles.button}
						onClick={() => handleCollectionClick(collection)}
					>
						<Typography className={styles.text}>
							{collection.category}
						</Typography>
					</Button>
				</Grid>
			))}
		</Fragment>
	) : (
		<div />
	);
};

// styles
const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		icon: {
			marginLeft: 6,
			marginRight: 6,
			fontSize: 24,
		},
		text: {
			fontSize: 16,
		},
		collection: {
			marginLeft: 4,
			marginTop: '-2px',
		},
		button: {
			textTransform: 'none',
			fontSize: 15,
			color: 'white',
		},
	})
);

export default SingleImageHoverContents;
