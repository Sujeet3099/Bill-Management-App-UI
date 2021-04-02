import React, { useState } from 'react';
import {
  Dialog,
  Button,
  Grid,
  OutlinedInput,
  InputLabel,
  createMuiTheme,
} from '@material-ui/core';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import { withStyles } from '@material-ui/core/styles';
import {
  pxToVh,
  pxToVw,
  ContainedButton,
  OutlinedButton,
} from '../utils/theme';
import { useSelector, useDispatch } from 'react-redux';
import {
  addInvoice,
  clearEditInvoice,
  removeAddModal,
} from './../actions/action';
import useForm from './../utils/useForm';
import formValidator from '../utils/formValidator';
import { postData } from './../services/services';
import { POST_INVOICE_URL } from './../utils/constants';
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
const formLabelsTheme = createMuiTheme({
  overrides: {
    MuiFormLabel: {
      asterisk: {
        color: '#db3131',
        '&$error': {
          color: '#db3131',
        },
      },
      root: {
        color: '#ffffff',
      },
    },
  },
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

const AddDialog = () => {
  const open = useSelector((state) => state.functional.openAdd);
  const dispatch = useDispatch();
  const [state, handleChange] = useForm();
  // const formData = useSelector((state) => state.invoiceTable.editInvoiceData);
  const [snackOn, setSnackOn] = React.useState({ on: false, error: {} });
  const [errorMsg, setErrorMsg] = useState('');
  const [snackType, setSnackType] = useState('');
  const [snackOpen, setSnackOpen] = useState(false);
  const handleSubmit = async () => {
    const { type, error } = formValidator(state);
    if (type === true) {
      console.log(snackOn);
      setSnackOn({ on: false, error: {} });
      setSnackOpen(false);
      setErrorMsg('');
      const res = await postData(POST_INVOICE_URL, state);
      console.log(res);
      if (res === true) {
        dispatch(addInvoice([state]));
        setErrorMsg('Successfully Added Invoice');
        setSnackType('Success');
        setSnackOpen(true);
        setTimeout(() => {
          handleClose();
          // res = false;
        }, 1500);
      }
    } else {
      // console.log(state);
      const er = Object.values(error)[0];
      setErrorMsg(er);
      setSnackType('Error');
      setSnackOpen(true);
      setSnackOn({ on: true, error: { ...error } });
    }
  };
  const handleClose = () => {
    dispatch(clearEditInvoice());
    dispatch(removeAddModal());
  };
  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='form-dialog-title'
        maxWidth='lg'
        PaperProps={{
          style: {
            backgroundColor: '#2A3E4C',
            color: '#ffffff',
            width: pxToVw(1106),
            height: pxToVh(509),
          },
        }}
      >
        <DialogTitle id='form-dialog-title' onClose={handleClose}>
          Add Invoice
        </DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={0}>
            <MuiThemeProvider theme={formLabelsTheme}>
              <Grid item xs={6}>
                <Grid
                  container
                  direction='column'
                  justify='space-around'
                  alignItems='flex-start'
                >
                  <Grid
                    container
                    justify='space-between'
                    style={{ marginTop: pxToVh(30) }}
                  >
                    <InputLabel required>Customer Name</InputLabel>
                    <OutlinedInput
                      id='customerName'
                      name='name_customer'
                      error={snackOn.error['name_customer'] ? true : false}
                      onChange={(e) => handleChange(e)}
                      style={{ width: pxToVw(300), height: pxToVh(45) }}
                    />
                  </Grid>

                  <Grid
                    container
                    justify='space-between'
                    style={{ marginTop: pxToVh(30) }}
                  >
                    <InputLabel required htmlFor='customerNo'>
                      Customer No.
                    </InputLabel>
                    <OutlinedInput
                      // error
                      id='customerNo'
                      name='cust_number'
                      error={snackOn.error['cust_number'] ? true : false}
                      onChange={(e) => handleChange(e)}
                      style={{ width: pxToVw(300), height: pxToVh(45) }}
                    />
                  </Grid>
                  <Grid
                    container
                    justify='space-between'
                    style={{ marginTop: pxToVh(30) }}
                  >
                    <InputLabel required htmlFor='customerNo'>
                      Bill ID
                    </InputLabel>
                    <OutlinedInput
                      // error
                      id='invoiceNo'
                      name='doc_id'
                      error={snackOn.error['doc_id'] ? true : false}
                      onChange={(e) => handleChange(e)}
                      style={{ width: pxToVw(300), height: pxToVh(45) }}
                    />
                  </Grid>
                  <Grid
                    container
                    justify='space-between'
                    style={{ marginTop: pxToVh(30) }}
                  >
                    <InputLabel required htmlFor='customerNo'>
                      Invoice Amount
                    </InputLabel>
                    <OutlinedInput
                      // error
                      id='invoiceAmount'
                      name='total_open_amount'
                      error={snackOn.error['total_open_amount'] ? true : false}
                      onChange={(e) => handleChange(e)}
                      style={{ width: pxToVw(300), height: pxToVh(45) }}
                    />
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={1}></Grid>

              <Grid item xs={5}>
                <Grid
                  container
                  justify='space-between'
                  style={{ marginTop: pxToVh(30) }}
                >
                  <InputLabel required>Date</InputLabel>
                  <OutlinedInput
                    variant='outlined'
                    type='date'
                    size='small'
                    name='due_in_date'
                    error={snackOn.error['due_in_date'] ? true : false}
                    onChange={(e) => handleChange(e)}
                    style={{ width: pxToVw(300), height: pxToVh(45) }}
                  />
                </Grid>
                <Grid
                  container
                  justify='space-between'
                  style={{ marginTop: pxToVh(30) }}
                >
                  <InputLabel>Notes</InputLabel>
                  <OutlinedInput
                    rows={4}
                    variant='outlined'
                    multiline
                    name='notes'
                    onChange={(e) => handleChange(e)}
                    style={{ width: pxToVw(300), height: pxToVh(191) }}
                  />
                </Grid>
              </Grid>
            </MuiThemeProvider>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Grid container spacing={1}>
            <Grid item xs={6}>
              <Button
                // size='small'
                onClick={handleClose}
                style={{ color: '#14AFF1', textTransform: 'none' }}
              >
                Cancel
              </Button>
            </Grid>
            <Grid
              item
              xs={6}
              container
              direction='row'
              justify='flex-end'
              alignItems='flex-end'
            >
              <Grid item xs={3}>
                <OutlinedButton size='small' onClick={handleClose}>
                  Clear
                </OutlinedButton>
              </Grid>
              <Grid item xs={3}>
                <ContainedButton
                  size='small'
                  onClick={handleSubmit}
                  variant='contained'
                >
                  Add
                </ContainedButton>
              </Grid>
            </Grid>
          </Grid>
        </DialogActions>
      </Dialog>

      <MySnackBar
        msg={errorMsg}
        type={snackType}
        hook={[snackOpen, setSnackOpen]}
      />
    </>
  );
};

export default AddDialog;
