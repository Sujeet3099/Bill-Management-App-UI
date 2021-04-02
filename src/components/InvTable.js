import React, { useState, useEffect } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';
import InfiniteScroll from 'react-infinite-scroll-component';
import MuiTableCell from '@material-ui/core/TableCell';
import { Button, CircularProgress } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import {
  changeSearchByDocID,
  disableDelete,
  disableEdit,
  enableDelete,
  enableEdit,
  setSelectedData,
  sortedInvoice,
} from './../actions/action';
import {
  fetchData,
  compareValues,
  fetchDataFirst,
} from './../services/services';
import { pxToVh, pxToVw } from '../utils/theme';
import { formatter } from './../utils/formatter';
import { GET_SEARCH_DATA_URL } from './../utils/constants';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';

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
  },
})(MuiTableCell);

const InvTable = () => {
  const classes = useStyles();

  // * Local states
  const [page, setPage] = useState(-1);
  const [isNext, setIsNext] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [allSelected, setAllSelected] = useState(false);

  // * Global states
  const dispatch = useDispatch();
  const selectedData = useSelector((state) => state.invoiceTable.selectedData);
  const responseData = useSelector((state) => state.invoiceTable.responseData);
  const predictedData = useSelector(
    (state) => state.invoiceTable.predictedData,
  );
  const doc_id = useSelector((state) => state.invoiceTable.searchByDocID);

  // * Sorting Functionality
  const handleSort = (name) => {
    const newData = [...responseData];
    newData.sort(compareValues(name));
    dispatch(sortedInvoice(newData));
  };

  // * Selecting All Rows functionality
  const selectAll = () => {
    if (allSelected && setSelectedData.length !== 0) {
      dispatch(setSelectedData([]));
      setAllSelected(!allSelected);
    } else {
      const newSelectedData = responseData.map((item) => item.doc_id);
      dispatch(setSelectedData(newSelectedData));
      setAllSelected(!allSelected);
    }
  };

  // * selectedOrNot functionality
  const selectedOrNot = (doc) => {
    return selectedData.find((item) => item === doc);
  };

  const checkSelect = (doc) => {
    if (selectedOrNot(doc) === undefined) {
      const newData = [...selectedData, doc];
      dispatch(setSelectedData(newData));
    } else {
      const newSelectedData = selectedData.filter((item) => item !== doc);
      dispatch(setSelectedData(newSelectedData));
    }
  };

  // * Parameters for Axios API call
  const params = { doc_id: doc_id, page_no: page, page_limit: 15 };

  // * Fetchinng DATA
  const fetchMoreData = async () => {
    setIsLoading(true);
    setPage(page + 1);
    // console.log('called', 'Page->', page);
    await fetchData(GET_SEARCH_DATA_URL, params, dispatch);
    setIsLoading(false);
    setIsNext(true);
  };

  const handleClear = () => {
    dispatch(changeSearchByDocID(''));
  };
  // * Initial Loading of the Data
  useEffect(() => {
    const pg = -1;
    // it is not setting the page to -1 and just keeps on incrementing;

    // TODO fix this bug
    // ? making it async also did not work;
    // * bug fixed

    const fun = async () => {
      await setPage(pg);
      await setPage(page + 1);
      // console.log(page);
      fetchDataFirst(GET_SEARCH_DATA_URL, { ...params, page_no: -1 }, dispatch);
    };
    fun();
    setIsNext(true);
  }, [doc_id]);

  // const isEdit = useSelector((state) => state.functional.isEdit);
  // const isDelete = useSelector((state) => state.functional.isDelete);
  function checkLeapYear(year) {
    //three conditions to find out the leap year
    if ((0 === year % 4 && 0 !== year % 100) || 0 === year % 400) {
      // console.log(year + ' is a leap year');
      return true;
    } else {
      // console.log(year + ' is not a leap year');
      return false;
    }
  }
  const dateIncrement = (str, inc) => {
    var newD = new Date(str);
    var newDM = newD.getMonth();
    var newDD = newD.getDate();
    var newDY = newD.getFullYear();
    // console.log(newDM);
    if ([0, 2, 4, 6, 7, 9, 11].find((n) => n === newDM) !== undefined) {
      newDM += Math.floor((newDD + inc) / 31);
      newDD += inc % 31;
    } else if (newDM === 1) {
      if (checkLeapYear(newDY)) {
        newDM += Math.floor((newDD + inc) / 29);
        newDD += inc % 29;
      } else {
        newDM += Math.floor((newDD + inc) / 28);
        newDD += inc % 28;
      }
    } else {
      newDM += Math.floor((newDD + inc) / 30);
      newDD += inc % 30;
    }
    if (Math.floor(newDM / 11) !== 0) {
      newDY += Math.floor(newDM / 11);
      newDM = 11 - newDM + (newDM % 11);
    }
    newD.setDate(newDD);
    newD.setMonth(newDM);
    newD.setFullYear(newDY);

    return newD;
  };
  useEffect(() => {
    if (selectedData.length > 1) {
      dispatch(enableDelete());
      dispatch(disableEdit());
    }
    if (selectedData.length === 1) {
      dispatch(enableEdit());
      dispatch(enableDelete());
    }
    if (selectedData.length === 0) {
      dispatch(disableDelete());
      dispatch(disableEdit());
    }
  }, [selectedData, dispatch]);

  //  * The invoice Table for showing the data we are fetching
  return (
    <>
      {responseData.length === 0 ? (
        <div
          style={{
            background: '#2D4350',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            width: '50vw',
            marginLeft: '25vw',
            marginRigh: 'auto',
          }}
        >
          <ErrorOutlineIcon
            style={{ color: '#FF5B5B', marginTop: pxToVh(150) }}
            fontSize='large'
          />
          <h4>No results found</h4>
          <p>Try adjusting your search to find what you are looking for.</p>
          <Button
            style={{ color: '#14AFF1', textTransform: 'none' }}
            onClick={handleClear}
          >
            Clear Search
          </Button>
        </div>
      ) : (
        <div></div>
      )}
      <InfiniteScroll
        dataLength={responseData.length}
        next={() => fetchMoreData()}
        hasMore={isNext}
        scrollableTarget='scrollbarTarget'
        scrollThreshold={0.9}
        loader={
          isLoading ? (
            <div
              style={{
                position: 'static',
                top: '80%',
                height: '90%',
                paddingLeft: '48%',
                overflowY: 'hidden',
              }}
            >
              <CircularProgress />
              <br />
              Loading
            </div>
          ) : (
            <div></div>
          )
        }
        endMessage={
          <div style={{ marginLeft: '44%' }}>*** END OF RESULTS ***</div>
        }
      >
        <Paper className={classes.paper} elevation={0}>
          <TableContainer className={classes.tableBody} id='scrollbarTarget'>
            <Table stickyHeader arial-label='sticky table' size='small'>
              <TableHead>
                <TableRow>
                  <TableCell className={classes.header} onClick={selectAll}>
                    <Checkbox />
                  </TableCell>
                  <TableCell className={classes.header}>
                    Customer Name
                  </TableCell>
                  <TableCell className={classes.header}>Customer #</TableCell>
                  <TableCell className={classes.header}>Bill Id</TableCell>
                  <TableCell
                    className={classes.header}
                    onClick={() => handleSort('total_open_amount')}
                  >
                    Invoice Amount
                  </TableCell>
                  <TableCell
                    className={classes.header}
                    onClick={() => handleSort('due_in_date')}
                  >
                    Due Date
                  </TableCell>
                  <TableCell className={classes.header}>{'Delay'}</TableCell>
                  <TableCell className={classes.header}>
                    Predicted Payment date
                  </TableCell>
                  <TableCell className={classes.header}>Notes</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {responseData.map((data, index) => {
                  // console.log(data.document_create_date);
                  // console.log(typeof data.document_create_date);
                  const pred = predictedData.find(
                    (item) => item.doc_id === data.doc_id,
                  );
                  var pre = undefined;
                  if (pred) {
                    pre = parseInt(pred.predictions);
                  }
                  return (
                    <TableRow
                      style={{
                        backgroundColor:
                          index % 2 === 0 ? '#2D4350' : '#283A46',
                      }}
                      key={index}
                    >
                      <TableCell>
                        <Checkbox
                          onClick={() => checkSelect(data.doc_id)}
                          checked={selectedOrNot(data.doc_id) ? true : false}
                        />
                      </TableCell>
                      <TableCell align='left'>{data.name_customer}</TableCell>
                      <TableCell align='left'>{data.cust_number}</TableCell>
                      <TableCell align='left'>{data.doc_id}</TableCell>
                      <TableCell align='right'>
                        {formatter(data.total_open_amount)}
                      </TableCell>
                      <TableCell
                        align='right'
                        style={{
                          color: `${
                            isNaN(pre) ? '' : parseInt(pre) > 0 ? '#FF5B5B' : ''
                          }`,
                        }}
                      >
                        {data.due_in_date}
                      </TableCell>
                      <TableCell align='right'>
                        {pre === undefined ? '--' : Math.round(pre)}
                      </TableCell>
                      <TableCell align='left'>
                        {pre === undefined
                          ? '--'
                          : dateIncrement(data.due_in_date, pre).toDateString()}
                      </TableCell>
                      <TableCell align='left'>{data.notes}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </InfiniteScroll>
    </>
  );
};

export default InvTable;
