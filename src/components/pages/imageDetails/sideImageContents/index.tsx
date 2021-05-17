import React from 'react';
import ImageInfo from './imageInfo';
import RelatedImages from '../../../common/images/relatedImages';
import {
	createStyles,
	Grid,
	makeStyles,
	Theme,
	useMediaQuery,
} from '@material-ui/core';
import { AppState } from '../../../../store/reducers';
import { useSelector } from 'react-redux';
import { ImageState } from '../../../../store/types/image';

const SideImageContents: React.FC = () => {
	// access styles and image states
	const styles = useStyles();
	const smallScreen = useMediaQuery('(max-width: 850px');
	const image = useSelector<AppState, ImageState['image']>(
		(state) => state.image.image
	);

	return !smallScreen && image ? (
		<Grid item className={styles.side}>
			<ImageInfo />
			<div className={styles.related}>
				<RelatedImages uuid={image?.uuid} />
			</div>
		</Grid>
	) : (
		<div />
	);
};

// styles
const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		side: {
			width: 300,
			marginTop: 49,
		},
		related: {
			marginTop: 20,
		},
	})
);

export default SideImageContents;
