import React, { Dispatch, SetStateAction } from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	useMediaQuery,
} from '@material-ui/core';
import ImageInfo from '.';

interface Props {
	open: boolean;
	setOpen: Dispatch<SetStateAction<boolean>>;
}

const ImageInfoDialog: React.FC<Props> = ({ open, setOpen }) => {
	// retrieve styles and control dialog opening
	const styles = useStyles();
	const smallScreen = useMediaQuery('(max-width: 310px');
	const handleDialog = () => setOpen(false);

	return (
		<Dialog
			className={styles.dialog}
			open={open}
			fullWidth
			maxWidth='xs'
			onClose={handleDialog}
			disableScrollLock
			fullScreen={smallScreen ? true : false}
		>
			<DialogContent>
				<ImageInfo dialog={true} />
			</DialogContent>
			<DialogActions>
				{smallScreen ? <Button onClick={handleDialog}>Close</Button> : ''}
			</DialogActions>
		</Dialog>
	);
};

// styles
const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		dialog: {},
	})
);

export default ImageInfoDialog;
