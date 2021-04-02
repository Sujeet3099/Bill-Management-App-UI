import { makeStyles, Typography, Paper } from '@material-ui/core';
import React from 'react';
import { pxToVh, pxToVw } from '../utils/theme';
import Functionality from './Functionality';

const Table = () => {
  const useStyles = makeStyles({
    root: {
      marginTop: pxToVh(30),
      marginLeft: pxToVw(30),
      marginRight: pxToVw(30),
      marginBottom: pxToVh(30),
      width: pxToVw(1860),
      height: pxToVh(739),
      background: `#273D49CC`,
      borderRadius: pxToVh(10),
      opacity: '1',
    },
    invoiceList: {
      marginTop: pxToVh(30),
      marginLeft: pxToVw(30),
      width: pxToVw(141),
      height: pxToVh(31),
      textAlign: 'left',
      font: `normal normal normal ${pxToVh(28) / pxToVh(32)} Ubuntu`,
      letterSpacing: '0px',
      color: '#FFFFFF',
      opacity: '1',
    },
  });
  const classes = useStyles();
  return (
    <>
      <Typography className={classes.invoiceList}>Invoice List</Typography>
      <Paper className={classes.root} elevation={3}>
        <Functionality />
      </Paper>
    </>
  );
};

export default Table;
