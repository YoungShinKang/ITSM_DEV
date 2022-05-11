import React from 'react';
import { BrowserRouter, Routes, Route, Redirect } from 'react-router-dom';
import { createBrowserHistory } from 'history'

import Project from 'Project/Project';
import PageError from 'common/components/PageError/PageError';

const history = createBrowserHistory();

const ItsmRoutes = () => (
  <BrowserRouter>
    <Routes>
      {/*<Redirect exact from="/" to="/project" />*/}
      <Route path="/project/*" element={<Project />} />
      <Route path="/error" element={<PageError />} />
      {/*<Route component={PageError} />*/}
    </Routes>
  </BrowserRouter>
);

export default ItsmRoutes;
