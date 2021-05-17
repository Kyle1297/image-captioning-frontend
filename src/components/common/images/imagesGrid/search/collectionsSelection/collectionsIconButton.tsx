import React from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import {
	Filter,
	Filter1,
	Filter2,
	Filter3,
	Filter4,
	Filter5,
	Filter6,
	Filter7,
	Filter8,
	Filter9,
	Filter9Plus,
} from '@material-ui/icons';
import { Grid, IconButton, useMediaQuery } from '@material-ui/core';

interface Props {
	handleOpen: () => void;
	selections: string[];
}

const CollectionsIconButton: React.FC<Props> = ({ selections, handleOpen }) => {
	// access styles
	const styles = useStyles();
	const smallScreen = useMediaQuery('(max-width: 500px)');

	return smallScreen ? (
		<Grid item>
			<IconButton className={styles.icon} onClick={handleOpen}>
				{(() => {
					switch (selections.length) {
						case 0:
							return <Filter />;
						case 1:
							return <Filter1 />;
						case 2:
							return <Filter2 />;
						case 3:
							return <Filter3 />;
						case 4:
							return <Filter4 />;
						case 5:
							return <Filter5 />;
						case 6:
							return <Filter6 />;
						case 7:
							return <Filter7 />;
						case 8:
							return <Filter8 />;
						case 9:
							return <Filter9 />;
						default:
							return <Filter9Plus />;
					}
				})()}
			</IconButton>
		</Grid>
	) : (
		<div />
	);
};

// styles
const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		icon: {
			marginRight: '-5px',
		},
	})
);

export default CollectionsIconButton;
