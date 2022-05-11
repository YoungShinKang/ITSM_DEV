//Unexpected use of 'location'  no-restricted-globals
//이런 에러가 나서 아래의 주석을 넣어줌

/* global history */
/* global location */
/* global window */

/* eslint no-restricted-globals: ["off"] */

import history from 'common/utils/browserHistory';

import { queryStringToObject, addToQueryString, omitFromQueryString } from 'common/utils/url';

const open = param => {
  history.push({
    pathname: history.location.pathname,
    search: addToQueryString(history.location.search, { [`modal-${param}`]: true }),
  });
  location.reload();
}


const close = param =>
  history.push({
    pathname: history.location.pathname,
    search: omitFromQueryString(history.location.search, [`modal-${param}`]),
  });

const isOpen = param => {
  console.log('isOpen? ')
  console.log(queryStringToObject(history.location.search)[`modal-${param}`])
  return !!queryStringToObject(history.location.search)[`modal-${param}`];
}

export const createQueryParamModalHelpers = param => ({
  open: () => open(param),
  close: () => close(param),
  isOpen: () => isOpen(param),
});
