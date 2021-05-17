import React, { Dispatch, SetStateAction } from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Button, Theme, Typography } from '@material-ui/core';
import ImageError from './imageError';
import SelectedImage from './selectedImage';
import { ImagePost } from '../../../../../store/types/image';

interface Props {
	setImage: Dispatch<SetStateAction<ImagePost>>;
	image: ImagePost;
	captionError: string;
	setCaptionError: Dispatch<SetStateAction<string>>;
}

const ImageInput: React.FC<Props> = ({
	setImage,
	image,
	captionError,
	setCaptionError,
}) => {
	// access styles
	const styles = useStyles();

	// control how an image is handled once uploaded
	const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
		event.preventDefault();
		let files = event.target.files;
		if (files && files[0]) {
			// set new image and its dimensions
			let newImage = files[0];
			if (newImage.type.split('/')[0] === 'image') {
				let img = new Image();
				img.src = window.URL.createObjectURL(newImage);
				img.onload = () => {
					// set uploaded file
					const imageType = newImage.type.split('/')[1];
					setImage({
						...image,
						image: newImage,
						height: img.height,
						width: img.width,
						type: imageType,
					});

					// check for valid image and dimensions
					if (newImage.type.split('/')[0] !== 'image')
						setCaptionError(
							'Unfortunately, only image files are accepted. Please try again.'
						);
					else if (img.width < 1000 || img.height < 560)
						setCaptionError(
							'Unfortunately, only images greater than 1000x560 in size are accepted. Please try again.'
						);
					else setCaptionError('');
				};
			} else {
				setCaptionError(
					'Unfortunately, only image files are accepted. Please try again.'
				);
				setImage({
					...image,
					image: newImage,
					height: 0,
					width: 0,
					type: '',
				});
			}
		} else {
			// handle no files
			setImage({
				...image,
				image: null,
			});
			setCaptionError('');
		}
	};

	// ensure all uploaded files are detected, even if same file is uploaded twice
	const handleInputClick = (
		event: React.MouseEvent<HTMLInputElement, MouseEvent>
	) => {
		(event.target as HTMLInputElement).value = '';
	};

	return (
		<div>
			<input
				className={styles.input}
				id='input'
				type='file'
				accept='image/*'
				required
				onChange={handleImageUpload}
				onClick={handleInputClick}
			/>
			<label htmlFor='input'>
				<Button
					size='large'
					className={styles.button}
					variant='contained'
					color='primary'
					component='span'
				>
					Select image
				</Button>
			</label>
			{captionError && !image.image ? (
				<Typography className={styles.error} color='error' variant='body2'>
					{captionError}
				</Typography>
			) : (
				''
			)}
			{image.image && !captionError ? (
				<SelectedImage image={image} setImage={setImage} />
			) : (
				''
			)}
			{image.image && captionError ? (
				<ImageError
					image={image}
					setImage={setImage}
					setCaptionError={setCaptionError}
					captionError={captionError}
				/>
			) : (
				''
			)}
		</div>
	);
};

// styles
const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		input: {
			display: 'none',
		},
		button: {
			marginTop: 25,
			width: '160px',
			textTransform: 'none',
			borderRadius: '25px',
			textAlign: 'left',
		},
		error: {
			marginTop: theme.spacing(1.5),
		},
	})
);

export default ImageInput;
