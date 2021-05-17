import React from 'react';
import { Chip, Grid } from '@material-ui/core';
import { useHistory } from 'react-router';
import { Collection } from '../../../store/types/collection';

interface Props {
	collections: Collection[];
	outlined?: boolean;
}

const CollectionTags: React.FC<Props> = ({ collections, outlined }) => {
	// retrieve history router
	const history = useHistory();

	// redirect to explore page with appropriate filter
	const handleTagClick = (collection: Collection) => {
		history.push('/explore', {
			collection: collection,
		});
	};

	return (
		<Grid container spacing={1}>
			{collections.map((collection) => (
				<Grid item key={collection.id}>
					<Chip
						variant={outlined ? 'outlined' : 'default'}
						size='small'
						onClick={() => handleTagClick(collection)}
						label={collection.category}
					/>
				</Grid>
			))}
		</Grid>
	);
};

export default CollectionTags;
