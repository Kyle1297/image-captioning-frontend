import React from 'react';
import { Grid } from '@material-ui/core';
import CentralImageContentsSkeleton from './centralImageContentsSkeleton';
import SideImageContentsSkeleton from './sideImageContentsSkeleton';

const CentralImageDetailsSkeleton: React.FC = () => (
	<Grid container spacing={2}>
		<CentralImageContentsSkeleton />
		<SideImageContentsSkeleton />
	</Grid>
);

export default CentralImageDetailsSkeleton;
