import React from 'react';
import { BrowserRouter, Routes, Route, Redirect } from 'react-router-dom';
import { createBrowserHistory } from 'history'

import Project from 'Project/Project';
import PageError from 'common/components/PageError/PageError';
import LoginComponent from 'Project/Login/LoginComponent'

import AuthContextProvider from 'common/utils/authContextProvider';

const history = createBrowserHistory();

const ItsmRoutes = () => (
  <AuthContextProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginComponent />} />
        <Route path="/project/*" element={<Project />} />
        <Route path="/error" element={<PageError />} />
        <Route element={<PageError />} />
      </Routes>
    </BrowserRouter>
  </AuthContextProvider>
);

export default ItsmRoutes;
