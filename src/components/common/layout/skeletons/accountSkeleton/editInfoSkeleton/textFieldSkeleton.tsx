import React from 'react';
import { Grid, GridSize } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';

interface Props {
	xs?: boolean | GridSize;
	marginBottom?: number;
	marginTop?: number;
	height?: number;
}

const TextFieldSkeleton: React.FC<Props> = ({
	xs,
	marginBottom,
	marginTop,
	height,
}) => (
	<Grid item xs={xs} style={marginTop ? { marginTop: marginTop } : {}}>
		<Skeleton
			style={
				marginBottom ? { marginBottom: marginBottom } : { marginBottom: 28 }
			}
			animation='wave'
			variant='rect'
			width='100%'
			height={height ? height : 40}
		/>
	</Grid>
);

export default TextFieldSkeleton;
