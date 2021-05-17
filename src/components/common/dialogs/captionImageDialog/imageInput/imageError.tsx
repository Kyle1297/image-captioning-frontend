import React, { Dispatch, SetStateAction } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Grid, IconButton, Typography } from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';
import { pink } from '@material-ui/core/colors';
import FileDetails from './fileDetails';
import { ImagePost } from '../../../../../store/types/image';

interface Props {
	setImage: Dispatch<SetStateAction<ImagePost>>;
	image: ImagePost;
	captionError: string;
	setCaptionError: Dispatch<SetStateAction<string>>;
}

const ImageError: React.FC<Props> = ({
	image,
	setImage,
	setCaptionError,
	captionError,
}) => {
	// access style classes
	const styles = useStyles();

	// handle error deletion
	const handleError = (
		event: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) => {
		event.preventDefault();
		setImage({
			...image,
			image: null,
		});
		setCaptionError('');
	};

	return (
		<Grid container spacing={0} direction='column' className={styles.root}>
			<Grid item container wrap='nowrap' alignItems='center' spacing={1}>
				<Grid
					container
					item
					spacing={1}
					wrap='nowrap'
					alignItems='center'
					zeroMinWidth
				>
					{!image.image ? '' : <FileDetails image={image.image} />}
				</Grid>
				<Grid item>
					<IconButton size='small' onClick={handleError}>
						<ClearIcon className={styles.icon} />
					</IconButton>
				</Grid>
			</Grid>
			<Grid item spacing={1} className={styles.text}>
				<Typography variant='body2'>{captionError}</Typography>
			</Grid>
		</Grid>
	);
};

// styles
const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			backgroundColor: pink[100],
			textAlign: 'justify',
			marginTop: 30,
			padding: '4px 8px',
		},
		icon: {
			fontSize: 14,
			marginLeft: 10,
		},
		text: {
			color: '#ff1744',
			marginRight: 20,
			marginLeft: '-4px',
			marginTop: 3,
		},
	})
);

export default ImageError;
