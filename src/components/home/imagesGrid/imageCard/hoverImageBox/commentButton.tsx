import React, { useState } from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import { FaRegComment, FaComment  } from 'react-icons/fa';
import { Grid, Typography } from '@material-ui/core';
import { Image } from '../../../../../store/types/image';


interface Props {
	image: Image;
};

const CommentButton: React.FC<Props> = ({ image }) => {
  // access styles
  const styles = useStyles();

  // handle hovering over button
  const [hovering, setHovering] = useState<boolean>(false)
  const handleEnterHover = (event: React.MouseEvent<HTMLDivElement>) => setHovering(true);
  const handleExitHover = (event: React.MouseEvent<HTMLDivElement>) => setHovering(false);

  return (
		<Grid 
			item
			onMouseEnter={handleEnterHover}
			onMouseLeave={handleExitHover}
		>
			<Grid container alignItems="center">
				{hovering ? (
					<FaComment className={styles.icon} />
				) : (
					<FaRegComment className={styles.icon} />
				)}
				<Typography className={styles.text}>{image.comments.length}</Typography>
			</Grid>
		</Grid>
	);
};

// styles
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    icon: {
      fontSize: 18,
    },
    text: {
      fontSize: 16,
      marginLeft: 6,
    },
  }),
);

export default CommentButton;