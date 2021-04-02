import {
  ADD_INVOICE,
  CLEAR_ALL_INVOICE,
  EDIT_INVOICE,
  DELETE_INVOICE,
  SORTED_INVOICE,
  CHANGE_SEARCHBY_DOC_ID,
  CHANGE_IS_SEARCH,
  ADD_INVOICE_FIRST_CALL,
  ADD_EDIT_INVOICE,
  CLEAR_EDIT_INVOICE,
  SET_SELECTED_DATA,
  SNACKBAR_OPEN,
  SNACKBAR_CLOSE,
  SET_PREDICTED_DATA,
} from './../actions/action';

const initialState = {
  pageCount: -1,
  responseData: [],
  selectedData: [],
  addInvoiceData: {},
  editInvoiceData: {},
  searchByDocID: '',
  snackBar: false,
  predictedData: [],
};

export const invoiceTableReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_INVOICE:
      const newResponseData = [...state.responseData, ...action.payload];
      return { ...state, responseData: newResponseData };
    case ADD_INVOICE_FIRST_CALL:
      return { ...state, responseData: action.payload };
    case CLEAR_ALL_INVOICE:
      return { ...state, responseData: [] };
    case EDIT_INVOICE:
      const editedResponseData = state.responseData.map((item) => {
        if (item.doc_id === action.payload.doc_id)
          return { ...item, ...action.payload };
        else return item;
      });
      return { ...state, responseData: editedResponseData };
    case DELETE_INVOICE:
      const newResponseDataAfterDelete = state.responseData.filter((item) =>
        action.payload.find((inv) => inv !== item.doc_id),
      );
      return { ...state, responseData: newResponseDataAfterDelete };
    case SORTED_INVOICE:
      return { ...state, responseData: action.payload };
    case CHANGE_SEARCHBY_DOC_ID:
      return { ...state, searchByDocID: action.payload };
    case CHANGE_IS_SEARCH:
      return { ...state, isSearch: action.payload };
    case ADD_EDIT_INVOICE:
      const newEdit = {
        ...state.editInvoiceData,
        [action.payload.target.name]: action.payload.target.value,
      };
      return { ...state, editInvoiceData: newEdit };
    case CLEAR_EDIT_INVOICE:
      return { ...state, editInvoiceData: {} };
    case SET_SELECTED_DATA:
      return { ...state, selectedData: action.payload };
    case SNACKBAR_OPEN:
      return { ...state, snackBar: true };
    case SNACKBAR_CLOSE:
      return { ...state, snackBar: false };
    case SET_PREDICTED_DATA:
      return { ...state, predictedData: action.payload };
    default:
      return state;
  }
};
