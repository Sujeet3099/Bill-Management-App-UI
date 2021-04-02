import axios from 'axios';
import { SERVER_URL, ROLL_NUMBER } from '../utils/constants';
import { addInvoice, addInvoiceFirst } from './../actions/action';

export const fetchData = async (url, params, dispatch) => {
  const response = await axios.get(url, {
    params,
  });
  dispatch(addInvoice(response.data));
};

export const fetchDataFirst = async (url, params, dispatch) => {
  const response = await axios.get(url, {
    params,
  });
  dispatch(addInvoiceFirst(response.data));
};

export const postData = async (url, obj) => {
  const res = await axios.post(url, obj);
  return res.data;
};

export const editData = async (url, params) => {
  const res = await axios.get(url, {
    params,
  });
  return res.data;
};

export function compareValues(key, order = 'asc') {
  return function innerSort(a, b) {
    if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
      // property doesn't exist on either object
      return 0;
    }
    const varA = typeof a[key] === 'string' ? a[key].toUpperCase() : a[key];
    const varB = typeof b[key] === 'string' ? b[key].toUpperCase() : b[key];
    let comparison = 0;
    if (varA > varB) {
      comparison = 1;
    } else if (varA < varB) {
      comparison = -1;
    }
    return order === 'desc' ? comparison * -1 : comparison;
  };
}
export function prediction(data) {
  return axios.post(
    'http://127.0.0.1:5000/predict?',
    { data: data },
    {
      headers: { 'Content-Type': 'application/json' },
      params: {
        data: data,
      },
    },
  );
}

export function serviceCall() {
  return axios.post(`${SERVER_URL}`);
}

export function callDummyAPI(name) {
  return axios.post(
    `${SERVER_URL}${ROLL_NUMBER}/dummy.do?`,
    {},
    {
      headers: { 'Content-Type': 'application/json' },
      params: { name: name },
    },
  );
}
