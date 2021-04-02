// ? Functionality Buttons Actions

export const ADD_ADD_MODAL = 'ADD_ADD_MODAL';
export const REMOVE_ADD_MODAL = 'REMOVE_ADD_MODAL';
export const ADD_EDIT_MODAL = 'ADD_EDIT_MODAL';
export const REMOVE_EDIT_MODAL = 'REMOVE_EDIT_MODAL';
export const ADD_DELETE_MODAL = 'ADD_DELETE_MODAL';
export const REMOVE_DELETE_MODAL = 'REMOVE_DELETE_MODAL';
export const ENABLE_EDIT = 'ENABLE_EDIT';
export const DISABLE_EDIT = 'DISABLE_EDIT';
export const ENABLE_DELETE = 'ENABLE_DELETE';
export const DISABLE_DELETE = 'DISABLE_DELETE';
export const ENABLE_VIEW_CORRESPONDANCE = 'ENABLE_VIEW_CORRESPONDANCE';
export const DISABLE_VIEW_CORRESPONDANCE = 'DISABLE_VIEW_CORRESPONDANCE';

export const enableCorrs = () => {
  return { type: ENABLE_VIEW_CORRESPONDANCE };
};

export const disableCorrs = () => {
  return { type: DISABLE_VIEW_CORRESPONDANCE };
};

export const addAddModal = () => {
  return { type: ADD_ADD_MODAL };
};
export const removeAddModal = () => {
  return { type: REMOVE_ADD_MODAL };
};
export const addEditModal = () => {
  return { type: ADD_EDIT_MODAL };
};
export const removeEditModal = () => {
  return { type: REMOVE_EDIT_MODAL };
};
export const addDeleteModal = () => {
  return { type: ADD_DELETE_MODAL };
};
export const removeDeleteModal = () => {
  return { type: REMOVE_DELETE_MODAL };
};
export const enableEdit = () => {
  return { type: ENABLE_EDIT };
};
export const disableEdit = () => {
  return { type: DISABLE_EDIT };
};
export const enableDelete = () => {
  return { type: ENABLE_DELETE };
};
export const disableDelete = () => {
  return { type: DISABLE_DELETE };
};

// ? Invoice Queries Actions

export const ADD_INVOICE = 'ADD_INVOICE';
export const ADD_INVOICE_FIRST_CALL = 'ADD_INVOICE_FIRST_CALL';
export const CLEAR_ALL_INVOICE = 'CLEAR_ALL_INVOICE';
export const EDIT_INVOICE = 'EDIT_INVOICE';
export const DELETE_INVOICE = 'DELETE_INVOICE';
export const SORTED_INVOICE = 'SORTED_INVOICE';
export const CHANGE_SEARCHBY_DOC_ID = 'CHANGE_SEARCHBY_DOC_ID';
export const CHANGE_IS_SEARCH = 'CHANGE_IS_SEARCH';
export const ADD_EDIT_INVOICE = 'ADD_EDIT_INVOICE';
export const CLEAR_EDIT_INVOICE = 'CLEAR_EDIT_INVOICE';
export const SET_SELECTED_DATA = 'SET_SELECTED_DATA';

export const addInvoice = (data = []) => {
  return { type: ADD_INVOICE, payload: data };
};
export const addInvoiceFirst = (data = []) => {
  return { type: ADD_INVOICE_FIRST_CALL, payload: data };
};
export const clearAllInvoice = () => {
  return { type: CLEAR_ALL_INVOICE };
};
export const editInvoice = (data = {}) => {
  return { type: EDIT_INVOICE, payload: data };
};
export const deleteInvoice = (doc_id) => {
  return { type: DELETE_INVOICE, payload: doc_id };
};
export const sortedInvoice = (data) => {
  return { type: SORTED_INVOICE, payload: data };
};
export const changeSearchByDocID = (id) => {
  return { type: CHANGE_SEARCHBY_DOC_ID, payload: id };
};
export const changeIsSearch = (val) => {
  return { type: CHANGE_IS_SEARCH, payload: val };
};
export const addEditInvoice = (obj) => {
  return { type: ADD_EDIT_INVOICE, payload: obj };
};
export const clearEditInvoice = () => {
  return { type: CLEAR_EDIT_INVOICE };
};
export const setSelectedData = (data) => {
  return { type: SET_SELECTED_DATA, payload: data };
};

// ? Snackbar
export const SNACKBAR_OPEN = 'SNACKBAR_OPEN';
export const SNACKBAR_CLOSE = 'SNACKBAR_CLOSE';

export const setSnackbarOpen = () => {
  return { type: SNACKBAR_OPEN };
};
export const setSnackBarClose = () => {
  return { type: SNACKBAR_CLOSE };
};

export const SET_PREDICTED_DATA = 'SET_PREDICTED_DATA';
export const setPredictedData = (data) => {
  return { type: SET_PREDICTED_DATA, payload: data };
};
