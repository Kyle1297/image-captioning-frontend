import React, { useState } from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import ThumbDownOutlinedIcon from '@material-ui/icons/ThumbDownOutlined';
import { Image } from '../../../../../store/types/image';
import { Grid, Typography } from '@material-ui/core';


interface Props {
	image: Image;
};

const DislikeButton: React.FC<Props> = ({ image }) => {
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
					<ThumbDownIcon className={styles.icon} />
				) : (
					<ThumbDownOutlinedIcon className={styles.icon} />
				)}
				<Typography className={styles.text}>{image.dislikes.length}</Typography>
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

export default DislikeButton;