import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import WarningTwoToneIcon from '@material-ui/icons/WarningTwoTone';
import { Slide, Grid } from '@material-ui/core';
import { pxToVw } from '../utils/theme';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';

const MySnackBar = ({ msg, type, hook }) => {
  const [snackBar, setOpen] = hook;
  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      open={snackBar}
      autoHideDuration={2000}
      TransitionComponent={Slide}
      onClose={() => setOpen(false)}
    >
      <SnackbarContent
        style={{ background: '#21303B' }}
        message={
          <Grid
            container
            direction='row'
            justify='space-evenly'
            alignItems='center'
          >
            {type === 'Success' ? (
              <ThumbUpIcon
                style={{ color: 'green', marginRight: pxToVw(30) }}
              />
            ) : (
              <WarningTwoToneIcon
                style={{ color: 'red', marginRight: pxToVw(30) }}
              />
            )}
            {msg}
          </Grid>
        }
      />
    </Snackbar>
  );
};

export default MySnackBar;
