import React, { Fragment } from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import { Grid, Typography } from '@material-ui/core';
import { SentimentDissatisfiedTwoTone, TagFacesTwoTone } from '@material-ui/icons';


export enum MessageType {
  SAD = 'SAD',
  ERROR = 'ERROR',
};

interface Props {
	errorMessage: string;
  type: MessageType;
};

const DisplayMessage: React.FC<Props> = ({ errorMessage, type }) => {
  // access styles
  const styles = useStyles();

  return (
    <Fragment>
      <Grid item>
        <Typography variant="overline" className={styles.errorMessage}>
          {errorMessage}
        </Typography>
      </Grid>
      <Grid item>
        {type === MessageType.SAD ? (
          <TagFacesTwoTone className={styles.icon} />
        ) : (
          <SentimentDissatisfiedTwoTone className={styles.icon} />
        )}
      </Grid>
    </Fragment>
  );
};

// styles
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    icon: {
      fontSize: 225,
      color: '#ec407a'
    },
    errorMessage: {
      fontSize: 14,
    },
  }),
);

export default DisplayMessage;