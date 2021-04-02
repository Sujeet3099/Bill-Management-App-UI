import React, { useEffect, useState } from 'react';
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
import Button from '@material-ui/core/Button';
// import { pxToVh, pxToVw } from '../utils/theme';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import {
  OutlinedButton,
  ContainedButton,
  pxToVh,
  pxToVw,
} from '../utils/theme';
import { editInvoice, removeEditModal } from '../actions/action';
import { useSelector, useDispatch } from 'react-redux';
import { OutlinedInput, InputLabel, createMuiTheme } from '@material-ui/core';
import { editData } from './../services/services';
import { EDIT_INVOICE_URL } from '../utils/constants';
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
const formLabelsTheme = createMuiTheme({
  overrides: {
    MuiFormLabel: {
      // asterisk: {
      //   color: '#db3131',
      //   '&$error': {
      //     color: '#db3131',
      //   },
      // },
      root: {
        color: '#ffffff',
      },
    },
    OutlinedInput: {
      color: '#ffffff',
    },
  },
});

const EditDialog = () => {
  const open = useSelector((state) => state.functional.openEdit);
  const dispatch = useDispatch();
  const selectedData = useSelector((state) => state.invoiceTable.selectedData);
  const responseData = useSelector((state) => state.invoiceTable.responseData);
  const [editInv, setEditInv] = useState({
    total_open_amount: 0,
    notes: '',
    doc_id: '',
  });
  const [resetInv, setResetInv] = useState({});
  const [snackOn, setSnackOn] = useState(false);

  useEffect(() => {
    const doc = responseData.find((item) => item.doc_id === selectedData[0]);
    if (doc !== undefined) {
      setEditInv({
        ...editInv,
        total_open_amount: doc.total_open_amount,
        notes: doc.notes,
        doc_id: selectedData[0],
      });
      setResetInv({
        total_open_amount: doc.total_open_amount,
        notes: doc.notes,
        doc_id: selectedData[0],
      });
    }
  }, [selectedData]);
  const handleClose = () => {
    dispatch(removeEditModal());
  };
  const handleEdit = async () => {
    // var obj = {
    //   ...editInv,
    //   total_open_amount: parseInt(editInv.amount),
    // };
    const res = await editData(EDIT_INVOICE_URL, editInv);
    if (res === true) {
      dispatch(editInvoice(editInv));

      setTimeout(() => {
        setSnackOn(true);
        handleClose();
        // res = false;
      }, 1500);
    }
  };
  const handleReset = () => {
    setEditInv(resetInv);
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
            },
          }}
        >
          <DialogTitle id='customized-dialog-title' onClose={handleClose}>
            Edit Invoice
          </DialogTitle>
          <DialogContent dividers>
            <MuiThemeProvider theme={formLabelsTheme}>
              <Grid container direction='column' justify='space-evenly'>
                <Grid
                  container
                  direction='row'
                  justify='space-between'
                  alignItems='center'
                  style={{ marginTop: pxToVh(30) }}
                >
                  <InputLabel htmlFor='customerNo'>Invoice Amount</InputLabel>
                  <OutlinedInput
                    // error
                    id='invoiceAmount'
                    type='number'
                    value={editInv.total_open_amount}
                    onChange={(e) =>
                      setEditInv({
                        ...editInv,
                        total_open_amount: e.target.value,
                      })
                    }
                    style={{
                      width: pxToVw(300),
                      height: pxToVh(45),
                      marginLeft: pxToVw(30),
                    }}
                  />
                </Grid>
                <Grid
                  container
                  justify='space-between'
                  // alignItems='center'
                  style={{ marginTop: pxToVh(30) }}
                >
                  <InputLabel>Notes</InputLabel>
                  <OutlinedInput
                    rows={4}
                    variant='outlined'
                    value={editInv.notes}
                    onChange={(e) => {
                      setEditInv({ ...editInv, notes: e.target.value });
                    }}
                    multiline
                    style={{
                      width: pxToVw(300),
                      height: pxToVh(191),
                      marginLeft: pxToVw(30),
                    }}
                  />
                </Grid>
              </Grid>
            </MuiThemeProvider>
          </DialogContent>
          <DialogActions>
            <Grid>
              <Button
                style={{ color: '#14AFF1', textTransform: 'none' }}
                onClick={handleClose}
              >
                Cancel
              </Button>
            </Grid>
            <Grid container spacing={1} justify='flex-end'>
              <OutlinedButton autoFocus size='small' onClick={handleReset}>
                Reset
              </OutlinedButton>
            </Grid>
            {/* <Grid item xs={3}> */}
            <ContainedButton size='small' onClick={handleEdit}>
              Save
            </ContainedButton>
            {/* </Grid> */}
          </DialogActions>
        </Dialog>
      </Paper>
      <MySnackBar
        msg={'Succesfully Edited Invoice'}
        type={'Success'}
        hook={[snackOn, setSnackOn]}
      />
    </>
  );
};

export default EditDialog;
