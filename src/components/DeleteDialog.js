import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import { Grid } from '@material-ui/core';
import { pxToVh, pxToVw } from '../utils/theme';
import { OutlinedButton, ContainedButton } from './../utils/theme';
import { deleteInvoice, removeDeleteModal } from '../actions/action';
import { useSelector, useDispatch } from 'react-redux';
import { postData } from '../services/services';
import { DELETE_INVOICE_URL } from './../utils/constants';
import MySnackBar from './MySnackBar';

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant='h6'>{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label='close'
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

const DeleteDialog = () => {
  const open = useSelector((state) => state.functional.openDelete);
  const dispatch = useDispatch();
  const selectedData = useSelector((state) => state.invoiceTable.selectedData);
  const [snackOn, setSnackOn] = useState(false);
  const handleClose = () => {
    dispatch(removeDeleteModal());
  };
  const handleDelete = async () => {
    const obj = { data: selectedData };
    // console.log(selectedData);
    const res = await postData(DELETE_INVOICE_URL, obj);
    console.log(res);
    if (res === true) {
      setSnackOn(true);
      dispatch(deleteInvoice(selectedData));
      setTimeout(() => {
        handleClose();
        // res = false;
      }, 1500);
    }
  };
  return (
    <>
      <Paper>
        <Dialog
          onClose={handleClose}
          aria-labelledby='customized-dialog-title'
          open={open}
          PaperProps={{
            style: {
              backgroundColor: '#2A3E4C',
              color: '#ffffff',
              width: pxToVw(611),
              height: pxToVh(342),
            },
          }}
        >
          <DialogTitle id='customized-dialog-title' onClose={handleClose}>
            Delete Record(s)?
          </DialogTitle>
          <DialogContent dividers>
            <Typography gutterBottom variant='subtitle2'>
              <span style={{ color: '#C0C6CA' }}>
                You'll lose your record(s) after this action. We can't recover
                them once you delete.
              </span>
            </Typography>
            <Typography gutterBottom variant='subtitle2'>
              <span style={{ color: '#C0C6CA' }}>
                Are you sure you want to
                <span style={{ color: 'red' }}> permanently delete</span> them?
              </span>
            </Typography>
          </DialogContent>
          <DialogActions>
            <Grid container spacing={1} justify='flex-end'>
              <OutlinedButton autoFocus size='small' onClick={handleClose}>
                Cancel
              </OutlinedButton>
            </Grid>
            {/* <Grid item xs={3}> */}
            <ContainedButton size='small' onClick={handleDelete}>
              Delete
            </ContainedButton>
            {/* </Grid> */}
          </DialogActions>
        </Dialog>
      </Paper>
      <MySnackBar
        msg={'Successfully Deleted Invoice'}
        type={'Success'}
        hook={[snackOn, setSnackOn]}
      />
    </>
  );
};

export default DeleteDialog;
