import React from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import MultiImageHoverContents from './multiImageHoverContents';
import SingleImageHoverContents from './singleImageHoverContents';

interface Props {
	uuid?: string;
	hovering: boolean;
}

const HoverImageBox: React.FC<Props> = ({ uuid, hovering }) => {
	// control styles
	const styles = useStyles();

	return (
		<div
			style={hovering ? { top: 0 } : { display: 'none' }}
			className={styles.root}
		>
			<Grid
				container
				direction='row'
				alignItems='center'
				justify={uuid ? 'space-between' : 'flex-start'}
				className={styles.container}
				style={uuid ? {} : { overflowY: 'hidden', height: 28, width: '95%' }}
			>
				{uuid ? (
					<MultiImageHoverContents uuid={uuid} />
				) : (
					<SingleImageHoverContents />
				)}
			</Grid>
		</div>
	);
};

// styles
const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			position: 'absolute',
			width: '100%',
			color: '#FFFFFF',
			background: 'linear-gradient(black, transparent)',
			opacity: 0.7,
		},
		container: {
			marginTop: 8,
			marginBottom: 11,
		},
	})
);

export default HoverImageBox;
