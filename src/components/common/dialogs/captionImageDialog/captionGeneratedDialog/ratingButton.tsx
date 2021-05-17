import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { ImageState } from '../../../../../store/types/image';
import { useDispatch, useSelector } from 'react-redux';
import { updateCaption } from '../../../../../store/actions/caption';
import { AppState } from '../../../../../store/reducers';
import { IconButton } from '@material-ui/core';
import { Mood, MoodBad, MoodBadTwoTone, MoodTwoTone } from '@material-ui/icons';
import { CaptionState } from '../../../../../store/types/caption';

export enum RatingButtons {
	satisfactory,
	unsatisfactory,
}

interface Props {
	type: RatingButtons;
}

const RatingButton: React.FC<Props> = ({ type }) => {
	// retrieve styles and image states
	const styles = useStyles();
	const image = useSelector<AppState, ImageState['image']>(
		(state) => state.image.image
	);
	const caption = useSelector<AppState, CaptionState['caption']>(
		(state) => state.caption.caption
	);

	// control unsatisfactory button
	const dispatch = useDispatch();
	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		if (image) {
			event.preventDefault();
			let newSatisfactory = null;
			if (!caption || caption.satisfactory === null) {
				if (type === RatingButtons.satisfactory) newSatisfactory = true;
				else newSatisfactory = false;
			} else if (
				caption.satisfactory === false &&
				type === RatingButtons.satisfactory
			)
				newSatisfactory = true;
			else if (
				caption.satisfactory === true &&
				type === RatingButtons.unsatisfactory
			)
				newSatisfactory = false;
			dispatch(
				updateCaption(image.caption.id, {
					satisfactory: newSatisfactory,
				})
			);
		}
	};

	return (
		<IconButton onClick={handleClick}>
			{type === RatingButtons.satisfactory ? (
				caption?.satisfactory === true ? (
					<MoodTwoTone className={styles.satisfactory} />
				) : (
					<Mood className={styles.size} />
				)
			) : caption?.satisfactory === false ? (
				<MoodBadTwoTone className={styles.size} color='secondary' />
			) : (
				<MoodBad className={styles.size} />
			)}
		</IconButton>
	);
};

// styles
const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		icon: {
			marginRight: theme.spacing(1),
		},
		satisfactory: {
			color: 'green',
			fontSize: 31,
		},
		size: {
			fontSize: 31,
		},
	})
);

export default RatingButton;
