import React, { Dispatch, SetStateAction, useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Avatar, Grid, IconButton } from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';
import FileDetails from './fileDetails';
import { ImagePost } from '../../../../../store/types/image';
import { Skeleton } from '@material-ui/lab';

interface Props {
	setImage: Dispatch<SetStateAction<ImagePost>>;
	image: ImagePost;
}

const SelectedImage: React.FC<Props> = ({ image, setImage }) => {
	// access styles and image url
	const styles = useStyles();
	const imageURL = URL.createObjectURL(image.image);

	// handle image deletion
	const handleImageDeletion = (
		event: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) => {
		event.preventDefault();
		setImage({
			...image,
			image: null,
			title: '',
		});
	};

	// detect when image has loaded
	const [imageLoaded, setImageLoaded] = useState<boolean>(false);
	const handleImageLoad = () => setImageLoaded(true);

	return !image.image ? (
		<div />
	) : (
		<Grid
			container
			justify='flex-start'
			alignItems='center'
			wrap='nowrap'
			spacing={1}
			className={styles.root}
		>
			<Grid item>
				<a
					className={styles.image}
					href={imageURL}
					target='_blank'
					rel='noreferrer'
				>
					<Avatar
						alt='selected image'
						onLoad={handleImageLoad}
						onError={handleImageLoad}
						className={styles.avatar}
						src={imageURL}
						style={imageLoaded ? {} : { display: 'none' }}
					/>
					{imageLoaded ? (
						''
					) : (
						<Skeleton
							animation='wave'
							variant='circle'
							style={{ width: 40, height: 40 }}
						/>
					)}
				</a>
			</Grid>
			<Grid item container zeroMinWidth alignItems='center' wrap='nowrap'>
				<FileDetails image={image.image} />
			</Grid>
			<Grid item>
				<IconButton
					className={styles.icon}
					size='small'
					onClick={handleImageDeletion}
				>
					<ClearIcon />
				</IconButton>
			</Grid>
		</Grid>
	);
};

// styles
const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			marginTop: theme.spacing(4),
			textAlign: 'left',
		},
		icon: {
			marginLeft: 10,
		},
		avatar: {
			marginRight: 3,
		},
		image: {
			textDecoration: 'none',
		},
	})
);

export default SelectedImage;
