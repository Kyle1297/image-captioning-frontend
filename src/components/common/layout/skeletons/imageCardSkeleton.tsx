import React, { useState, Fragment } from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import { Card, CardContent, Grid } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';

interface Props {
	small?: boolean;
	width?: number;
}

const ImageCardSkeleton: React.FC<Props> = ({ small, width }) => {
	// control styles
	const styles = useStyles();

	// handle skeleton card hovering
	const [hovering, setHovering] = useState<boolean>(false);
	const handleEnterHover = (event: React.MouseEvent<HTMLDivElement>) =>
		setHovering(true);
	const handleExitHover = (event: React.MouseEvent<HTMLDivElement>) =>
		setHovering(false);

	return (
		<Grid item xs>
			<Card
				raised={hovering ? true : false}
				style={
					small
						? { height: 200, width: 285 }
						: width
						? { height: 400, width: width }
						: { height: 400 }
				}
				onMouseEnter={handleEnterHover}
				onMouseLeave={handleExitHover}
			>
				<Skeleton animation='wave' variant='rect' height={small ? 155 : 355} />
				<CardContent className={styles.content}>
					<Fragment>
						<Skeleton animation='wave' height={18} className={styles.text} />
					</Fragment>
				</CardContent>
			</Card>
		</Grid>
	);
};

// styles
const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		card: {
			height: 400,
		},
		content: {
			height: 70,
		},
		text: {
			marginBottom: 6,
		},
	})
);

export default ImageCardSkeleton;
