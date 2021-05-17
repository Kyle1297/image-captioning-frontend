import React from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import { Button, Typography, useMediaQuery } from '@material-ui/core';
import { AppState } from '../../../store/reducers';
import { useDispatch, useSelector } from 'react-redux';
import { ImageState } from '../../../store/types/image';
import { GetAppOutlined } from '@material-ui/icons';
import { grey } from '@material-ui/core/colors';
import { updateImage } from '../../../store/actions/image';

const DownloadButton: React.FC = () => {
	// retrieve styles
	const styles = useStyles();
	const smallScreen = useMediaQuery('(max-width: 330px');

	// retrieve image
	const image = useSelector<AppState, ImageState['image']>(
		(state) => state.image.image
	);

	// update image downloads
	const dispatch = useDispatch();
	const handleDownload = (event: React.MouseEvent<HTMLButtonElement>) => {
		if (image)
			dispatch(
				updateImage(image.uuid, {
					downloads: image.downloads + 1,
				})
			);
	};

	return image ? (
		<a className={styles.link} href={image.image} download>
			<Button
				className={styles.button}
				style={smallScreen ? { minWidth: 40, maxWidth: 40 } : {}}
				onClick={handleDownload}
			>
				<GetAppOutlined className={styles.icon} />
				{smallScreen ? (
					''
				) : (
					<Typography className={styles.text}>Download</Typography>
				)}
			</Button>
		</a>
	) : (
		<div />
	);
};

// styles
const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		icon: {
			fontSize: 18,
		},
		button: {
			fontSize: 16,
			textTransform: 'none',
			color: grey[700],
		},
		text: {
			marginLeft: 6,
		},
		link: {
			textDecoration: 'none',
		},
	})
);

export default DownloadButton;
