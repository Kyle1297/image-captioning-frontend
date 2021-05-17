import React from 'react';
import { Button, Fade, Grid } from '@material-ui/core';

interface Props {
	comment: string;
	commentFocused: boolean;
}

const CommentActions: React.FC<Props> = ({ comment, commentFocused }) => (
	<Fade
		in={commentFocused}
		style={commentFocused ? { transitionDelay: '100ms' } : {}}
	>
		<Grid item>
			<Grid container spacing={1} alignItems='center' justify='flex-end'>
				<Grid item>
					<Button variant='text' size='small'>
						Cancel
					</Button>
				</Grid>
				<Grid item>
					<Button
						variant='contained'
						type='submit'
						disabled={comment ? false : true}
						color='primary'
						size='small'
					>
						Submit
					</Button>
				</Grid>
			</Grid>
		</Grid>
	</Fade>
);

export default CommentActions;
