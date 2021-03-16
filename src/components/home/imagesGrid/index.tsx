import React, { useEffect } from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import { getPublicImages } from '../../../store/actions/images';
import { AppState } from '../../../store/reducers';
import { useSelector, useDispatch } from 'react-redux';
import {
  CircularProgress,
  Grid,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
 } from '@material-ui/core';


const ImagesGrid = () => {
  // access styles 
  const classes = useStyles();

  // retrieve images
  const dispatch = useDispatch();
  const images = useSelector<AppState, AppState["images"]>(state => state.images);
  console.log(images["images"])
  
  // fetch public images
  useEffect(() => {
    dispatch(getPublicImages());
  }, [dispatch]);

  return images["images"].length ? (
    <Grid container spacing={1}>
      {images["images"].map(image => (
        <Grid item xs>
          <Card className={classes.root}>
            <CardActionArea>
              <CardMedia
                className={classes.media}
                image={image.image}
                title={image.title}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  {image.title}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  {image.caption.corrected_text ? image.caption.corrected_text : image.caption.text}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      ))}
    </Grid>
  ) : <CircularProgress />
};

// styles
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      maxWidth: 345,
    },
    media: {
      height: 140,
    },
  })
);

export default ImagesGrid;