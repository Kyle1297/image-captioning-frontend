import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import { getImages, GetImagesParams } from '../../../../store/actions/image';
import { Container } from '@material-ui/core';
import Search from './search';
import { Collection } from '../../../../store/types/collection';
import ImageResults from './imageResults';

interface Props {
	collection?: Collection;
}

const ImagesGrid: React.FC<Props> = ({ collection }) => {
	// access styles and dispatch function
	const styles = useStyles();
	const dispatch = useDispatch();

	// set initial filters
	const [getParams, setGetParams] = useState<GetImagesParams>({
		filters: {
			is_private: false,
			is_profile_image: false,
			page: 1,
			collections: collection ? [collection.category] : [],
		},
		newFilter: true,
	});

	// fetch images
	useEffect(() => {
		if (getParams.filters.page)
			dispatch(getImages(getParams.filters, getParams.newFilter));
	}, [dispatch, getParams]);

	return (
		<Container maxWidth='xl' className={styles.root}>
			<Search
				collection={collection}
				setGetParams={setGetParams}
				getParams={getParams}
			/>
			<ImageResults getParams={getParams} setGetParams={setGetParams} />
		</Container>
	);
};

// styles
const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			marginTop: 15,
			textAlign: 'center',
			overflowX: 'hidden',
		},
		loading: {
			margin: 'auto',
		},
	})
);

export default ImagesGrid;
