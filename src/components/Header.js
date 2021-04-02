import React from 'react';
import { makeStyles } from '@material-ui/core';
import { pxToRem, pxToVh, pxToVw } from '../utils/theme';
import logo from './../assets/logo.svg';
import abc from './../assets/Group 20399.svg';

const Header = () => {
  const useStyles = makeStyles({
    root: {
      marginTop: pxToRem(20),
      left: pxToRem(0),
      // width: pxToVw(1980),
      // height: pxToVh(50),
      // background: `transparent radial-gradient(closest-side at 50% 50%, #58687E 0%, #39495E 100%) 0% 0% no-repeat padding-box`,
      opacity: '1',
    },
    ABClogo: {
      marginLeft: pxToVw(30),
      width: pxToVw(311),
      height: pxToVh(50),
      font: `normal normal bold 39px/50px Futura PT`,
      textAlign: `left`,
      letterSpacing: pxToRem(0),
      color: '#FFFFFF',
      opacity: '1',
    },
    hrcLogo: {
      marginLeft: pxToRem(501.64),
      width: pxToVw(235),
      height: pxToVh(50),
    },
  });
  const classes = useStyles();
  return (
    <div className={classes.root} style={{ display: 'flex' }}>
      {/* <div className={classes.ABClogo}></div>
        <Typography className={classes.ABCProd}>ABC Products</Typography> */}
      <img src={abc} alt='abc' className={classes.ABClogo} />
      <img src={logo} alt='hrc-logo' className={classes.hrcLogo} />
    </div>
  );
};

export default Header;
