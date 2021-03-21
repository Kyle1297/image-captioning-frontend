import React from 'react';
import { Image } from '../../../../../store/types/image';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import { Grid, Typography, useMediaQuery } from '@material-ui/core';
import CommentButton from './commentButton';
import DislikeButton from './dislikeButton';
import LikeButton from './likeButton';


interface Props {
	image: Image;
  hovering: boolean;
};

const HoverImageBox: React.FC<Props> = ({ image, hovering }) => {
  // control styles
  const styles = useStyles();
  const smallScreen = useMediaQuery('(max-width: 350px)');

  return (
    <div style={hovering ? {} : { display: 'none' }} className={styles.root}>
      <Grid 
        container 
        direction="row"
        alignItems="center"
        justify="space-between"
        className={styles.container}
      >
        <Grid item className={styles.leftItem}>
          <Typography className={styles.text}>
            {image.uploader.username}
          </Typography>
        </Grid>
        <Grid item className={styles.rightItem} style={smallScreen ? { visibility: 'hidden' } : {}}>
          <Grid container spacing={1} alignItems="center">
            <LikeButton image={image} />
            <DislikeButton image={image} />
            <CommentButton image={image} />
          </Grid>
        </Grid>
      </Grid>
    </div>
	);
};

// styles
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: 'absolute',
      width: '100%',
      top: 0,
      color: '#FFFFFF',
      background: 'linear-gradient(black, transparent)',
      opacity: 0.7,
    },
    container: {
      marginTop: 11,
      marginBottom: 11,
    },
    leftItem: {
      marginLeft: 7,
    },
    rightItem: {
      marginRight: 12,
    },
    icon: {
      fontSize: 18,
    },
    text: {
      fontSize: 16,
      marginLeft: 6,
    },
  }),
);

export default HoverImageBox;