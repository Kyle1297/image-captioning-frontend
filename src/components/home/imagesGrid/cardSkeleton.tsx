import React, { useState, Fragment } from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import { Card, CardContent, Grid } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';


const CardSkeleton: React.FC  = () => {
  // control styles
  const styles = useStyles();

	// handle skeleton card hovering
  const [hovering, setHovering] = useState<boolean>(false);
  const handleEnterHover = (event: React.MouseEvent<HTMLDivElement>) => setHovering(true);
  const handleExitHover = (event: React.MouseEvent<HTMLDivElement>) => setHovering(false);

  return (
		<Grid item xs>
			<Card 
				raised={hovering ? true : false}
				className={styles.card}
				onMouseEnter={handleEnterHover}
				onMouseLeave={handleExitHover}
			>
				<Skeleton 
					animation="wave" 
					variant="rect"
					height={320}
				/>
				<CardContent className={styles.content}>
					<Fragment>
						<Skeleton animation="wave" height={18} className={styles.text} />
						<Skeleton animation="wave" height={18} width="80%" />
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
  }),
);

export default CardSkeleton;