import React, { useState } from 'react';
import { Image } from '../../../../store/types/image';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import './styles.css';
import {
  Grid,
  Card,
  CardActionArea,
  CardMedia,
  useTheme,
  useMediaQuery,
  Typography,
  CardContent,
 } from '@material-ui/core';
import HoverImageBox from './hoverImageBox';


interface Props {
	image: Image;
};

const ImageCard: React.FC<Props> = ({ image }) => {
  // control styles
  const styles = useStyles();
  const theme = useTheme();
  const smallScreen = useMediaQuery(theme.breakpoints.down('xs'));
  const mediumScreen = useMediaQuery('(max-width: 539px)');

  // handle image card hovering
  const [hovering, setHovering] = useState<boolean>(false);
  const handleEnterHover = (event: React.MouseEvent<HTMLDivElement>) => setHovering(true);
  const handleExitHover = (event: React.MouseEvent<HTMLDivElement>) => setHovering(false);

  return (
		<Grid item xs>
			<Card 
        raised={hovering ? true : false}
        className={styles.card}
        onMouseEnter={handleEnterHover}
        onMouseLeave={handleExitHover}
      >
				<CardActionArea>
            <CardMedia
              component="img"
              height={mediumScreen ? 320 : 350}
              image={image.image}
              title={image.title}
              style={smallScreen ? { minWidth: 240 } : { minWidth: 350 }}
            />
            <HoverImageBox image={image} hovering={hovering} />
          <CardContent 
            id={mediumScreen ? "content" : ""} 
            style={mediumScreen ? { height: 80 } : { height: 50 }}
            className={mediumScreen ? '' : styles.content}
          >
            <Typography 
              id={mediumScreen ? "caption" : ""} 
              noWrap={mediumScreen ? false : true} 
              variant='overline'
            >
              {image.caption.corrected_text ? image.caption.corrected_text : image.caption.text}
            </Typography>
          </CardContent>
				</CardActionArea>
			</Card>
		</Grid>
	);
};

// styles
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      height: 400,
    },
    content: {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
  }),
);

export default ImageCard;