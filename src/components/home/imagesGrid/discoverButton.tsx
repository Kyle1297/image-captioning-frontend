import React, { forwardRef } from 'react';
import { useSelector } from 'react-redux';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import { Button, Grid } from '@material-ui/core';
import { AppState } from '../../../store/reducers';
import { ImagesState } from '../../../store/types/image';


interface Props {
	fetchImages: (page: number | null) => void;
};

const DiscoverButton = forwardRef<HTMLButtonElement, Props>(({ fetchImages }, ref) => {
  // access styles and next page of images to retrieve
  const styles = useStyles();
	const nextPage = useSelector<AppState, ImagesState["nextPage"]>(state => state.images.nextPage);

	// fetch new public images
	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
		fetchImages(nextPage);
	};

  return (
		<Grid item>
			<Button
				size="large"
				className={styles.button}
				variant="contained" 
				color="primary"
				onClick={handleClick}
				ref={ref}
			>
				Discover more
			</Button>
		</Grid>
	);
});

// styles
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      textTransform: 'none',
      borderRadius: '25px',
    },
  }),
);

export default DiscoverButton;