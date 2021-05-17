import React from 'react';
import { useLocation } from 'react-router';
import { Collection } from '../../store/types/collection';
import ImagesGrid from '../common/images/imagesGrid';

interface LocationState {
	collection?: Collection;
}

const Explore: React.FC = () => {
	// access url location state
	const { state } = useLocation<LocationState>();

	return (
		<ImagesGrid collection={state?.collection ? state.collection : undefined} />
	);
};

export default Explore;
