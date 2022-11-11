import axios from 'axios';

import { objectToQueryString } from 'common/utils/url';

const defaults = {
  //baseURL: 'http://localhost:8080',
  baseURL: '',
  headers: () => ({
    'Content-Type': 'application/json',
    //Authorization: localStorage.getItem('token') ? `Bearer ${localStorage.getItem('token')}` : undefined,
  }),
  error: {
    code: 'INTERNAL_ERROR',
    message: 'Something went wrong. Please check your internet connection or contact our support.',
    status: 503,
    data: {},
  },
};

const api = (method, url, variables) => 
  new Promise((resolve, reject) => {

    let tmpHeader = {...variables.headers};
    let isAuthHeader = variables.isAuthHeader;

    delete variables.headers;
    delete variables.isAuthHeader;

    axios({
      url: `${defaults.baseURL}${url}`,
      method,
      //headers: variables.isAuthHeader ?  variables.headers : defaults.headers(),
      headers: isAuthHeader ?  tmpHeader : defaults.headers(),
      params: method === 'get' ? variables : undefined,
      data: method !== 'get' ? variables : undefined,
      paramsSerializer: objectToQueryString,
    }).then(
      response => {
        resolve(response.data);
      },
      error => {
        if (error.response) {
          reject(error.response.data.error);          
        }
      },
    );
  });


const optimisticUpdate = async (url, { updatedFields, currentFields, setLocalData }) => {
  try {
    setLocalData(updatedFields);
    await api('put', url, updatedFields);
  } catch (error) {
    setLocalData(currentFields);
  }
};

export default {
  get: (...args) => api('get', ...args),
  post: (...args) => api('post', ...args),
  put: (...args) => api('put', ...args),
  patch: (...args) => api('patch', ...args),
  delete: (...args) => api('delete', ...args),
  optimisticUpdate,
};
