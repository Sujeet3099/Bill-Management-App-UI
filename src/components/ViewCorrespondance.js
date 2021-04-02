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
import { Button, Grid } from '@material-ui/core';
import { pxToVw } from '../utils/theme';
import { ContainedButton } from './../utils/theme';
import MyTable from './MyTable';
import { useDispatch, useSelector } from 'react-redux';
import { disableCorrs } from '../actions/action';
import { formatter } from '../utils/formatter';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

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
const useStyles = makeStyles((theme) => ({
  root: {
    '&.MuiListItem-root': {
      backgroundColor: '#356680',
      '&:hover': {
        backgroundColor: '283A46',
      },
    },
    '&.Mui-selected': {
      backgroundColor: '#283A46',
      '&:hover': {
        backgroundColor: '#283A46',
      },
    },
  },
}));
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
const ViewCorrespondance = () => {
  const handleClose = () => {
    dispatch(disableCorrs());
  };
  const handleDownload = () => {
    // const col = [
    //   'Bill ID',
    //   'Invoice Date',
    //   'Due Date',
    //   'Bill Currency',
    //   'Open Amount($)',
    // ];
    // newData.map((item) => {
    //   const {
    //     doc_id,
    //     document_create_date,
    //     due_in_date,
    //     invoice_currency,
    //     total_open_amount,
    //   } = item;
    //   const row = [
    //     doc_id,
    //     document_create_date,
    //     due_in_date,
    //     invoice_currency,
    //     total_open_amount,
    //   ];
    //   pdfData.push(row);
    //   // return 0;
    // });
    // doc.autoTable(col, pdfData, { startY: 25 });

    // var idpdf = document.getElementById('forPDF');
    // var doc = new jsPDF({
    //   orientation: 'landscape',
    //   unit: 'px',
    //   // format: [4, 2],
    // });
    var n = newData.length;
    n = Math.round(n / 12);
    // var doc = new jsPDF('p', 'pt', 'a4');
    var doc = new jsPDF('p', 'mm', [1720, 1060]);
    doc.setTextColor('Black');
    // const tmp = template === 'template1' ? template1 : template2;
    // doc.text(tmp, 10, 10);
    while (n) {
      doc.addPage();
      n -= 1;
    }
    // doc.setFillColor('#14AFF1');
    doc.html(
      document.getElementById('forPDF'),
      {
        callback: function (doc) {
          console.log('in callback');
          doc.save('Invoice.pdf');
        },
      },
      5,
      10,
    );
  };
  const open = useSelector((state) => state.functional.openCorrs);
  const dispatch = useDispatch();
  const selectedData = useSelector((state) => state.invoiceTable.selectedData);
  const responseData = useSelector((state) => state.invoiceTable.responseData);
  const newData = responseData.filter((item) =>
    selectedData.find((dt) => dt === item.doc_id),
  );
  const [totalAmount, setTotalAmount] = useState(0);
  React.useEffect(() => {
    var newAmount = 0;
    newAmount = newData.reduce((sum, item) => {
      sum = sum + item.total_open_amount;
      // console.log(typeof item.total_open_amount);
      return sum;
    }, 0);

    // console.log(newAmount);
    setTotalAmount(newAmount);
  }, [selectedData]);
  const classes = useStyles();

  const templates = [
    {
      value: 'template1',
      label: 'template1',
    },
    {
      value: 'template2',
      label: 'template2',
    },
  ];
  const [template, setTemplate] = useState('template1');
  const handleChange = (event) => {
    setTemplate(event.target.value);
  };
  const template1 = `This is to remind you that there are one or more open invoices on your account. lease provide at your earliest convenience an update on the payment details or clarify the reason for the delay. If you have any specific issue with t̥he invoice(s), please let us know so that we can address it to the correct Department.`;
  const template2 = `Gentle reminder that you have one or more open invoices on your account. Please get back to us with an expected date of payment.If you have any specific issue with the invoice(s), please let us know so that we can address it at the earliest. Please find the details of the invoices below:`;
  return (
    <Paper>
      <Dialog
        onClose={handleClose}
        aria-labelledby='customized-dialog-title'
        open={open}
        PaperProps={{
          style: {
            backgroundColor: '#2A3E4C',
            paddingLeft: pxToVw(20),
            paddingRight: pxToVw(20),
            color: '#ffffff',
            minWidth: '90vw',
            height: '80vh',
          },
        }}
      >
        <DialogTitle id='customized-dialog-title' onClose={handleClose}>
          View Correspondance(2)
          <label
            style={{
              background: '#2A3E4C',
              marginLeft: '50vw',
              marginRight: '2vw',
              color: '#C0C6CA',
              fontSize: '18px',
            }}
          >
            View
          </label>
          <TextField
            id='standard-select-currency'
            select
            variant='filled'
            value={template}
            onChange={handleChange}
          >
            {templates.map((option) => (
              <MenuItem
                key={option.value}
                value={option.value}
                className={classes.root}
              >
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </DialogTitle>
        <DialogContent dividers id='forPDF'>
          <Typography gutterBottom variant='subtitle2'>
            <span style={{ color: '#ffffff' }}>
              <span style={{ color: '#C0C6CA' }}> Subject:</span> Invoice
              Details - {'{Account Name}'}
            </span>
          </Typography>
          <br />
          <Typography gutterBottom variant='subtitle2'>
            <span style={{ color: '#C0C6CA' }}>
              Dear Sir/Madam, <br />
              Greetings! <br />
              <br />
              {template === 'template1' ? template1 : template2}
              <br />
              <br /> Please find the details of the invoices below:
            </span>
          </Typography>
          <MyTable data={newData} />
          <span style={{ color: '#C0C6CA' }}>
            {/* TODO dynamic amount; */}
            Total Amount to be Paid: ${formatter(totalAmount)} <br />
            <br />
            In case you have already made a payment for the above items, please
            send us the details to ensure the payment is posted. Let us know if
            we can be of any further assistance. Looking forward to hearing from
            you. <br />
            <br />
            Kind Regards,
            <br /> Sujeet Kumar <br />
            Phone : 9122812222 <br />
            {/* Fax : [If any] <br /> */}
            Email : 1806439@kiit.ac.in
            <br /> Company Name: HighRadius
          </span>
        </DialogContent>
        <DialogActions>
          <Grid
            container
            justify='flex-end'
            style={{ marginRight: pxToVw(40) }}
          >
            <Button
              autoFocus
              size='small'
              onClick={handleClose}
              style={{
                color: '#14AFF1',
                textTransform: 'none',
                marginRight: pxToVw(30),
              }}
            >
              Cancel
            </Button>
            <ContainedButton size='small' onClick={handleDownload}>
              Download
            </ContainedButton>
          </Grid>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default ViewCorrespondance;
