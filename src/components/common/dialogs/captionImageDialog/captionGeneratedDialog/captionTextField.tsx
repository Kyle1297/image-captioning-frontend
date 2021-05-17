import React, { useState } from 'react';
import { TextField } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { updateCaption } from '../../../../../store/actions/caption';
import { AppState } from '../../../../../store/reducers';
import { ImageState } from '../../../../../store/types/image';
import { useDispatch, useSelector } from 'react-redux';
import { CaptionState } from '../../../../../store/types/caption';

const CaptionTextField: React.FC = () => {
	// retrieve styles and set image
	const styles = useStyles();
	const image = useSelector<AppState, ImageState['image']>(
		(state) => state.image.image
	);
	const caption = useSelector<AppState, CaptionState['caption']>(
		(state) => state.caption.caption
	);

	// handle corrected caption text
	const [correctedText, setCorrectedText] = useState<string>('');
	const handleCaptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		let newCaption = event.currentTarget.value;
		setCorrectedText(newCaption);
	};

	// handle focus event of corrected caption textfield
	const [focused, setFocused] = useState(false);
	const handleFocus = (
		event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
	) => setFocused(true);

	// send final corrected caption
	const dispatch = useDispatch();
	const updateCorrectedCaption = (
		event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		setFocused(false);
		if (image) {
			let newCaption = event.currentTarget.value;
			if (
				(caption && newCaption !== caption.corrected_text) ||
				(newCaption && !caption)
			)
				dispatch(
					updateCaption(image.caption.id, {
						corrected_text: newCaption,
					})
				);
		}
	};

	return (
		<TextField
			size='small'
			fullWidth
			className={styles.text}
			variant='outlined'
			label={focused ? 'Caption' : 'Change the caption here...'}
			placeholder='Change the caption here...'
			helperText='Leave empty to use our generated caption.'
			onChange={handleCaptionChange}
			onBlur={updateCorrectedCaption}
			onFocus={handleFocus}
			value={correctedText}
		/>
	);
};

// styles
const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		text: {
			marginTop: 15,
			marginBottom: 30,
			[`& fieldset`]: {
				borderRadius: 25,
			},
		},
	})
);

export default CaptionTextField;
