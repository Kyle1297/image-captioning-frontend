import React, { useMemo } from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import { AppState } from '../../../../../store/reducers';
import { ImageState } from '../../../../../store/types/image';
import { Grid, Typography } from '@material-ui/core';
import { extractDateFormat } from '../../../../utils/extractDateFormat';
import { grey, teal } from '@material-ui/core/colors';
import { Camera } from '@material-ui/icons';

interface Props {
	dialog?: boolean;
}

const ImageInfo: React.FC<Props> = ({ dialog }) => {
	// retrieve styles
	const styles = useStyles();

	// retrieve image
	const image = useSelector<AppState, ImageState['image']>(
		(state) => state.image.image
	);

	// determine display data
	const data = useMemo(() => {
		if (image)
			return [
				{
					title: 'Type',
					content: image.type,
				},
				{
					title: 'Resolution',
					content: `${image.width} x ${image.height}`,
				},
				{
					title: 'Uploaded',
					content: extractDateFormat(image.uploaded_at, true),
				},
				{
					title: 'Last updated',
					content: extractDateFormat(image.caption.last_updated, true),
				},
				{
					title: 'Views',
					content: image.views,
				},
				{
					title: 'Downloads',
					content: image.downloads,
				},
			];
		return [];
	}, [image]);

	return image ? (
		<div className={dialog ? undefined : styles.root}>
			<Grid
				container
				className={styles.heading}
				alignItems='center'
				spacing={1}
				wrap='nowrap'
			>
				<Grid item>
					<Camera className={styles.icon} />
				</Grid>
				<Grid item zeroMinWidth>
					<Typography noWrap className={styles.headingText}>
						{image.title}
					</Typography>
				</Grid>
			</Grid>
			{data.length
				? data.map((item, index) => (
						<Grid key={index} container justify='space-between'>
							<Grid item>
								<Typography className={styles.text} variant='body2'>
									{item.title}
								</Typography>
							</Grid>
							<Grid item>
								<Typography className={styles.text} variant='body2'>
									{item.content}
								</Typography>
							</Grid>
						</Grid>
				  ))
				: ''}
			<div className={styles.licence}>
				<Typography variant='body2' className={styles.text}>
					Free for commerical use
				</Typography>
				<Typography variant='body2' className={styles.text}>
					No attribution required
				</Typography>
			</div>
		</div>
	) : (
		<div />
	);
};

// styles
const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			backgroundColor: grey[100],
			padding: '7px 10px',
		},
		heading: {
			marginBottom: 7,
			overflow: 'hidden',
			textOverflow: 'ellipsis',
		},
		headingText: {
			fontSize: 17,
			marginBottom: 3,
			color: teal[900],
		},
		text: {
			color: grey[600],
		},
		icon: {
			fontSize: 24,
			color: grey[700],
		},
		licence: {
			marginTop: 25,
		},
	})
);

export default ImageInfo;
