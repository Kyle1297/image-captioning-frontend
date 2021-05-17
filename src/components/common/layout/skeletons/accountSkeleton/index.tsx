import React from 'react';
import { Container, Grid, useMediaQuery } from '@material-ui/core';
import EditImageSkeleton from './editImageSkeleton';
import EditInfoSkeleton from './editInfoSkeleton';

const AccountSkeleton: React.FC = () => {
	// retrieve styles
	const smallScreen = useMediaQuery('(max-width: 700px', {
		noSsr: true,
	});

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
					<EditImageSkeleton />
				</Grid>
				<Grid item xs>
					<EditInfoSkeleton />
				</Grid>
			</Grid>
		</Container>
	);
};

export default AccountSkeleton;
