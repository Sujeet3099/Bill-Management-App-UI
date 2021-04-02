const formValidator = (object) => {
  const result = { type: true, error: {} };
  if (!object.name_customer) {
    result['type'] = false;
    result['error'] = {
      ...result.error,
      name_customer: 'Customer Name is Required',
    };
  } else if (!isNaN(object.name_customer)) {
    result['type'] = false;
    result['error'] = {
      ...result.error,
      name_customer: 'Customer Name is Invalid',
    };
  }
  if (!object.cust_number) {
    result['type'] = false;

    result['error'] = {
      ...result.error,
      cust_number: 'Customer No. is Required',
    };
  } else if (isNaN(object.cust_number)) {
    result['type'] = false;
    result['error'] = {
      ...result.error,
      cust_number: 'Not a Valid Customer No.',
    };
  }
  if (!object.doc_id) {
    result['type'] = false;
    result['error'] = { ...result.error, doc_id: 'Invoice No. is Required' };
  } else if (isNaN(object.doc_id)) {
    result['type'] = false;
    result['error'] = { ...result.error, doc_id: 'Not a Valid Invoice No.' };
  }
  if (!object.total_open_amount) {
    result['type'] = false;
    result['error'] = {
      ...result.error,
      total_open_amount: 'Invoice Amount is Required',
    };
  } else if (isNaN(object.total_open_amount)) {
    result['type'] = false;
    result['error'] = {
      ...result.error,
      total_open_amount: 'Not a Valid Invoice Amount',
    };
  }
  if (!object.due_in_date) {
    result['type'] = false;
    result['error'] = { ...result.error, due_in_date: 'Date is Required' };
  }
  return result;
};

export default formValidator;
