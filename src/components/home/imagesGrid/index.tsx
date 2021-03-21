import React, { Fragment, useCallback, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import { namedRequestError, namedRequestsInProgress } from '../../../store/selectors/request';
import { RequestEnums, Request } from '../../../store/types/request';
import { getImages } from '../../../store/actions/image';
import { AppState } from '../../../store/reducers';
import { Container, Grid } from '@material-ui/core';
import ImageCard from './imageCard';
import { ImagesState } from '../../../store/types/image';
import DisplayMessage, { MessageType } from './displayMessage';
import DiscoverButton from './discoverButton';
import CardSkeleton from './cardSkeleton';


const ImagesGrid: React.FC  = () => {
  // access styles and dispatch function
  const styles = useStyles();
  const dispatch = useDispatch();

  // retrieve images
  const images = useSelector<AppState, ImagesState["images"]>(state => state.images.images);
  const nextPage = useSelector<AppState, ImagesState["nextPage"]>(state => state.images.nextPage);

  // retrieve request states
  const start = useSelector<AppState, ImagesState["start"]>(state => state.images.start);
  const isLoading = useSelector<AppState, Request["isLoading"]>(state => namedRequestsInProgress(state, RequestEnums.getImages));
  const error = useSelector<AppState, Request["error"]>(state => namedRequestError(state, RequestEnums.getImages));

  // add loader reference and array for skeleton images
  const loader = useRef<HTMLButtonElement>(null);
  const skeletonArray = Array.from(new Array(Math.ceil(window.innerWidth / 790)));

  // fetch public images
  const fetchImages = useCallback((page: number | null = 1) => {
    if (page) {
      const filters = {
        is_private: false,
        is_profile_image: false,
        page: page,
      };
      dispatch(getImages(filters));
    };
  }, [dispatch]);

  // handle events following reaching loader ref
  const handleObserver = useCallback((entities: IntersectionObserverEntry[]) => {
    const target = entities[0];
    if (target.isIntersecting)
      fetchImages(nextPage);
  }, [fetchImages, nextPage]);

  // initialize infinite scrolling and attach to loader ref
  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 1.0,
    };
    const observer = new IntersectionObserver(handleObserver, options);
    if (loader.current)
      observer.observe(loader.current);
  }, [handleObserver]);
  
  // fetch public images
  useEffect(() => {
    fetchImages();
  }, [fetchImages]);

  return (
    <Container maxWidth="xl" className={styles.root}>
      {error ? (
        <DisplayMessage 
          errorMessage="Oops... there was an error. You might need to try again later!" 
          type={MessageType.ERROR}
        /> 
      ) : (
        start ? (
          <Grid container justify="center" spacing={2}>
            {skeletonArray.map((item, index) => (
              <CardSkeleton key={index} />
            ))}
          </Grid>
        ) : (
          images.length ? (
            <Fragment>
              <Grid container justify="center" alignItems="center" spacing={2}>
                {images.map(image => (
                  <ImageCard key={image.uuid} image={image} />
                ))}
              </Grid>
              <Grid 
                container 
                direction="column" 
                justify="center" 
                alignItems="center" 
                className={styles.imagesEnd}
              >
                {isLoading ? (
                  <Grid container spacing={2} justify="center">
                    {skeletonArray.map((item, index) => (
                      <CardSkeleton key={index} />
                    ))}
                  </Grid>
                ) : (
                  nextPage ? ( 
                    <DiscoverButton ref={loader} fetchImages={fetchImages} />
                  ) : (
                    <DisplayMessage 
                      errorMessage="That's all the images we have!" 
                      type={MessageType.SAD}
                    /> 
                  )
                )}
              </Grid>
            </Fragment>
          ) : (
            <DisplayMessage 
              errorMessage="Hmmm... no images were found. You might need to try again later!" 
              type={MessageType.ERROR}
            /> 
          )
        )
      )}
    </Container>
  );
};

// styles
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: 15,
      textAlign: 'center',
    },
    loading: {
      margin: 'auto',
    },
    imagesEnd: {
      marginTop: 30,
      marginBottom: 30,
    },
  }),
);

export default ImagesGrid;