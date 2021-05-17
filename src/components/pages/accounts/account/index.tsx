import React from 'react';
import { Container, Grid, useMediaQuery } from '@material-ui/core';
import EditImage from './editImage';
import EditInfo from './editInfo';

const Account: React.FC = () => {
	// access styles
	const smallScreen = useMediaQuery('(max-width: 700px');

	return (
		<Container>
			<Grid
				container
				spacing={smallScreen ? 3 : 5}
				direction={smallScreen ? 'column' : 'row'}
			>
				<Grid
					item
					style={
						smallScreen
							? {
									width: 185,
									margin: 'auto',
							  }
							: {}
					}
				>
					<EditImage />
				</Grid>
				<Grid item xs>
					<EditInfo />
				</Grid>
			</Grid>
		</Container>
	);
};

export default Account;
