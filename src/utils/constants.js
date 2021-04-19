export const SERVER_URL = 'http://localhost:8080/';
export const ROLL_NUMBER = '1806439'; // Replace <YOUR_ROLL_NUMBER> with your roll number
export const GET_DATA_URL =
  'http://localhost:8080/Summer_Internship_Backend/getAllInvoice';
export const GET_SEARCH_DATA_URL =
  'http://localhost:8080/Summer_Internship_Backend/getInvoice';
export const POST_INVOICE_URL =
  'http://localhost:8080/Summer_Internship_Backend/AddInvoice';
export const DELETE_INVOICE_URL =
  'http://localhost:8080/Summer_Internship_Backend/DeleteInvoice';
export const EDIT_INVOICE_URL =
  'http://localhost:8080/Summer_Internship_Backend/EditInvoice';

export const columns = [
  { id: 'selectedCheck', label: /*<Checkbox />*/ 'checkboxIcon', minWidth: 20 },
  { id: 'name_customer', label: 'Customer Name', minWidth: 140 },
  { id: 'cust_number', label: 'Customer #', minWidth: 95 },
  {
    id: 'invoice_id',
    label: 'Invoice #',
    minWidth: 124,
  },
  {
    id: 'total_open_amount',
    label: 'Invoice Amount',
    minWidth: 127,
  },
  {
    id: 'due_in_date',
    label: 'Due Date',
    minWidth: 111,
  },
  {
    id: 'predictedDate',
    label: 'Predicted payment date',
    minWidth: '198',
  },
  {
    id: 'predictBucket',
    label: 'Predicted aging bucket',
    minWidth: '191',
  },
  {
    id: 'notes',
    label: 'Notes',
    minWidth: '184',
  },
];
