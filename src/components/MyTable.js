import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import MuiTableCell from '@material-ui/core/TableCell';

import { pxToVh, pxToVw } from '../utils/theme';
import { formatter } from '../utils/formatter';

const useStyles = makeStyles({
  paper: {
    maxWidth: '98%',
    marginLeft: pxToVw(20),
    marginRight: pxToVw(20),
    marginTop: pxToVh(30),
    marginBottom: pxToVh(30),
    backgroundColor: 'none',
    // overflowX: 'auto',
  },
  tableBody: {
    maxHeight: pxToVh(612),
    // minHeight: pxToVh(612),
  },
  header: {
    backgroundColor: '#2D4350',
    color: '#97A1A9',
    '&:hover': {
      cursor: 'pointer',
    },
  },
});

const TableCell = withStyles({
  root: {
    borderBottom: 'none',
    paddingTop: pxToVh(1),
    paddingBottom: pxToVh(1),
    height: pxToVh(45),
  },
})(MuiTableCell);

const MyTable = ({ data }) => {
  const responseData = data;
  const classes = useStyles();
  return (
    <Paper className={classes.paper} elevation={0}>
      <TableContainer className={classes.tableBody} id='scrollbarTarget'>
        <Table stickyHeader arial-label='sticky table'>
          <TableHead>
            <TableRow>
              {/* <TableCell className={classes.header}>Customer Name</TableCell> */}
              {/* <TableCell className={classes.header}>Customer #</TableCell> */}
              <TableCell className={classes.header}>Bill ID</TableCell>
              {/* <TableCell className={classes.header}>Phone Number</TableCell> */}
              <TableCell className={classes.header}>Bill Date</TableCell>
              <TableCell className={classes.header}>Due Date</TableCell>
              <TableCell className={classes.header}>Bill Currency</TableCell>
              <TableCell className={classes.header}>Open Amount($)</TableCell>
              {/* <TableCell className={classes.header}>Notes</TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {responseData.map((data, index) => {
              return (
                <TableRow
                  style={{
                    backgroundColor: index % 2 === 0 ? '#2D4350' : '#283A46',
                  }}
                  key={index}
                >
                  {/* <TableCell align='left'>{data.name_customer}</TableCell>
                  <TableCell align='left'>{data.cust_number}</TableCell> */}
                  <TableCell align='left'>{data.doc_id}</TableCell>
                  {/* <TableCell align='left'>{'Not Provided'}</TableCell> */}
                  <TableCell align='left'>
                    {data.document_create_date}
                  </TableCell>
                  <TableCell align='left'>{data.due_in_date}</TableCell>
                  <TableCell align='left'>{data.invoice_currency}</TableCell>
                  <TableCell align='left'>
                    {formatter(data.total_open_amount)}
                  </TableCell>

                  {/* <TableCell align='left'>{data.notes}</TableCell> */}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default MyTable;
