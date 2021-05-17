import React, { Fragment } from 'react';
import { Grid, useMediaQuery } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';

const NavBarSkeleton: React.FC = () => {
	// control styles
	const xsScreen = useMediaQuery('(max-width: 500px)', {
		noSsr: true,
	});

	return (
		<Grid container spacing={4} alignItems='center' justify='flex-end'>
			{xsScreen ? (
				''
			) : (
				<Fragment>
					<Grid item>
						<Skeleton animation='wave' width={60} height={26} />
					</Grid>
					<Grid item>
						<Skeleton animation='wave' width={120} height={26} />
					</Grid>
				</Fragment>
			)}
			<Grid item>
				<Skeleton variant='circle' height={34} width={34} />
			</Grid>
		</Grid>
	);
};

export default NavBarSkeleton;
