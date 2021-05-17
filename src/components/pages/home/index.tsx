import React, { Fragment } from 'react';
import BackgroundCover from './backgroundCover';
import ImagesGrid from '../../common/images/imagesGrid';

const Home: React.FC = () => (
	<Fragment>
		<BackgroundCover />
		<ImagesGrid />
	</Fragment>
);

export default Home;
