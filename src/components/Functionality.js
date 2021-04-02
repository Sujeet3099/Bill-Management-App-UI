import {
  // FormControl,
  // OutlinedInput,
  InputAdornment,
  makeStyles,
  TextField,
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import Grid from '@material-ui/core/Grid';
import React from 'react';
import { pxToVw, pxToVh } from '../utils/theme';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import RemoveIcon from '@material-ui/icons/Remove';
import {
  addAddModal,
  addDeleteModal,
  addEditModal,
  enableCorrs,
  setPredictedData,
} from './../actions/action';
import { useSelector, useDispatch } from 'react-redux';
import AddDialog from './AddDialog';
import EditDialog from './EditDialog';
import DeleteDialog from './DeleteDialog';
import { ContainedButton, OutlinedButton } from './../utils/theme';
import InvTable from './InvTable';
import { changeSearchByDocID } from './../actions/action';
import ViewCorrespondance from './ViewCorrespondance';
import { prediction } from '../services/services';

const useStyles = makeStyles({
  AddDialog: {
    width: pxToVw(1106),
    height: pxToVh(509),
  },
  DeleteDialog: {
    width: pxToVw(611),
    height: pxToVh(342),
  },
  EditDialog: {
    width: pxToVw(543),
    height: pxToVh(511),
  },
});

const Functionality = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const handleAddOpen = () => {
    dispatch(addAddModal());
  };
  const handleDeleteOpen = () => {
    dispatch(addDeleteModal());
  };
  const handleEditOpen = () => {
    dispatch(addEditModal());
  };
  const isEdit = useSelector((state) => state.functional.isEdit);
  const isDelete = useSelector((state) => state.functional.isDelete);
  const responseData = useSelector((state) => state.invoiceTable.responseData);

  const handlePredict = async () => {
    const data = { id: 1806439, data: responseData };
    const res = await prediction(data);
    dispatch(setPredictedData(res.data));
    // console.log(res.data);
  };

  // const doc_id = useSelector((state) => state.invoiceTable.searchByDocID);

  const getFunction = (e) => {
    dispatch(changeSearchByDocID(e.target.value));
  };
  const debounce = (func, delay) => {
    let inDebounce;
    return function () {
      const context = this;
      const args = arguments;
      clearTimeout(inDebounce);
      inDebounce = setTimeout(() => func.apply(context, args), delay);
    };
  };
  const handleChange = debounce(getFunction, 800);

  return (
    <>
      <Grid container spacing={1} direction='row'>
        <Grid item xs={6}>
          <Grid container style={{ marginTop: pxToVh(11) }}>
            <ContainedButton
              style={{ marginLeft: pxToVw(30) }}
              onClick={handlePredict}
            >
              Predict
            </ContainedButton>
            <OutlinedButton
              style={{ marginLeft: pxToVw(12) }}
              onClick={() => dispatch(enableCorrs())}
            >
              View Correspondence
            </OutlinedButton>
          </Grid>
        </Grid>
        <Grid
          item
          xs={6}
          style={{ marginTop: pxToVh(11), paddingRight: pxToVw(30) }}
        >
          <Grid container justify='flex-end'>
            <OutlinedButton
              startIcon={<AddIcon fontSize='small' />}
              onClick={handleAddOpen}
            >
              Add
            </OutlinedButton>
            <OutlinedButton
              disabled={isEdit ? false : true}
              style={{ marginLeft: pxToVw(12) }}
              onClick={handleEditOpen}
              startIcon={<EditIcon fontSize='small' />}
            >
              Edit
            </OutlinedButton>
            <OutlinedButton
              disabled={isDelete ? false : true}
              style={{ marginLeft: pxToVw(12) }}
              startIcon={<RemoveIcon fontSize='small' />}
              onClick={handleDeleteOpen}
            >
              Delete
            </OutlinedButton>

            <TextField
              size='small'
              style={{
                marginLeft: pxToVw(12),
                height: pxToVh(40),
                width: pxToVw(340),
                fontSize: pxToVh(24),
                color: '#97A1A9',
                border: '1px #356680',
              }}
              color='primary'
              placeholder='Search by Invoice Number'
              variant='outlined'
              type='search'
              id='searchInvoice'
              // value={doc_id}
              onChange={(e) => handleChange(e)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
        </Grid>
      </Grid>
      <AddDialog className={classes.AddDialog} />
      <EditDialog className={classes.EditDialog} />
      <DeleteDialog className={classes.DeleteDialog} />
      <ViewCorrespondance />
      <InvTable />
    </>
  );
};

export default Functionality;
