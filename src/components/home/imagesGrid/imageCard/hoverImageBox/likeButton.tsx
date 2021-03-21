import React, { useState } from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbUpOutlinedIcon from '@material-ui/icons/ThumbUpOutlined';
import { Grid, Typography } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { updateImage } from '../../../../../store/actions/image';
import { Image } from '../../../../../store/types/image';
import { AppState } from '../../../../../store/reducers';
import { UserState } from '../../../../../store/types/user';


interface Props {
	image: Image;
};

const LikeButton: React.FC<Props> = ({ image }) => {
  // access styles and dispatch
  const styles = useStyles();
	const dispatch = useDispatch();

	// retrieve current user
	const user = useSelector<AppState, UserState["user"]>(state => state.user.user);

  // handle hovering over button
  const [hovering, setHovering] = useState<boolean>(false)
  const handleEnterHover = (event: React.MouseEvent<HTMLDivElement>) => setHovering(true);
  const handleExitHover = (event: React.MouseEvent<HTMLDivElement>) => setHovering(false);

	// handle button click
	const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
		event.preventDefault();
		//dispatch(updateImage(image.uuid, {
		//	likes: [...image.likes, user]
		//}))
	};

  return (
		<Grid 
			item
			onMouseEnter={handleEnterHover}
			onMouseLeave={handleExitHover}
			onClick={handleClick}
		>
			<Grid container alignItems="center">
				{hovering ? (
					<ThumbUpIcon className={styles.icon} />
				) : (
					<ThumbUpOutlinedIcon className={styles.icon} />
				)}
				<Typography className={styles.text}>{image.likes.length}</Typography>
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

export default LikeButton;