import React, { useState } from 'react';
import ImageCaptionDialog from './imageCaptionDialog';
import { createStyles, makeStyles, Theme, useTheme } from '@material-ui/core/styles';
import { Fab, Typography, useMediaQuery } from '@material-ui/core';
import BackupOutlinedIcon from '@material-ui/icons/Backup';
import teal from '@material-ui/core/colors/teal';
import grey from '@material-ui/core/colors/grey';


const OpenDialogFab: React.FC = () => {
  // access style classes and size of user screen
  const styles = useStyles();
  const theme = useTheme();
  const smallScreen = useMediaQuery(theme.breakpoints.down('xs'));

  // control opening of image upload form 
  const [open, setOpen] = useState<boolean>(false);
  const handleDialog = () => setOpen(!open);

  return (
    <div>
      <div className={styles.fabRoot}>
        <Fab 
          className={styles.fab} 
          variant="extended" 
          size={smallScreen ? "medium" : "large"}
          onClick={handleDialog}>
          <BackupOutlinedIcon color="inherit" className={styles.icon} />
          {smallScreen ? "Upload & Caption" : "Upload & Caption"}
        </Fab>
      </div>
      <ImageCaptionDialog 
        open={open}  
        handleDialog={handleDialog} 
      />
      <Typography className={styles.caption} variant="caption" >
        **Must register to store private images**
      </Typography>
    </div>
  );
};

// styles
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    fabRoot: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    fab: {
      backgroundColor: teal[400],
      fontWeight: "lighter",
      textTransform: "none",
      fontSize: '16px',
    },
    icon: {
      marginRight: theme.spacing(1),
    },
    caption: {
      color: grey[400],
    },
  }),
);

export default OpenDialogFab;