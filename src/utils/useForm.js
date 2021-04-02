import { useDispatch, useSelector } from 'react-redux';
import { addEditInvoice } from '../actions/action';
const useForm = () => {
  const dispatch = useDispatch();
  const editInvoiceData = useSelector(
    (state) => state.invoiceTable.editInvoiceData,
  );
  const handleChange = (e) => {
    dispatch(addEditInvoice(e));
  };
  return [editInvoiceData, handleChange];
};

export default useForm;
