import { combineReducers } from 'redux';
import { functionalityReducer } from './FunctionalityButtons';
import { invoiceTableReducer } from './InvoiceTable';
export const rootReducer = combineReducers({
  functional: functionalityReducer,
  invoiceTable: invoiceTableReducer,
});
