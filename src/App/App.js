import React, { Fragment } from 'react';

import NormalizeStyles from './NormalizeStyles';
import BaseStyles from './BaseStyles';

// We're importing .css because @font-face in styled-components causes font files
// to be constantly re-requested from the server (which causes screen flicker)
// https://github.com/styled-components/styled-components/issues/1593
import './fontStyles.css';


import ItsmRoutes from './ItsmRoutes';

const App = () => (
  <Fragment>
    <NormalizeStyles />
    <BaseStyles />
    <ItsmRoutes />
  </Fragment>
);

export default App;


