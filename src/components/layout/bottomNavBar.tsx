import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import grey from '@material-ui/core/colors/grey';
import { Container, Grid, IconButton, useMediaQuery } from '@material-ui/core';
import GitHubIcon from '@material-ui/icons/GitHub';


const BottomNavBar = () => {
  // control styling
  const styles = useStyles();
  const smallScreen = useMediaQuery('(max-width: 319px)');

  return (
    <div className={styles.root}>
			<Container>
				<Grid container justify="space-between" alignItems="center">
					<Grid item>
						<img 
							src="/logo/logoSmall.png" 
							alt="logo" 
						/>
						</Grid>
						{smallScreen ? '' : (
							<Grid item className={styles.center}>
							<img 
								src="/logo/logoWords.png" 
								alt="logo" 
							/>
							</Grid>
						)}
						<Grid item>
							<IconButton>
								<GitHubIcon fontSize="large" />
							</IconButton>
					</Grid>
				</Grid>
			</Container>
    </div>
  );
}

// styles
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
			background: grey[200],
			paddingTop: 8,
      paddingBottom: 8,
    },
		center: {
			marginLeft: 14,
		},
  }),
);

export default BottomNavBar;