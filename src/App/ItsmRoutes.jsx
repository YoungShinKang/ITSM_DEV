import React from 'react';
import { BrowserRouter, Routes, Route, Redirect, Navigate   } from 'react-router-dom';
import { createBrowserHistory } from 'history'

import Project from 'Project/Project';
import PageError from 'common/components/PageError/PageError';
import LoginComponent from 'Project/Login/LoginComponent'
import LoginPage from 'Project/Login/LoginPage'

import AuthContextProvider from 'common/utils/authContextProvider';

const history = createBrowserHistory();

const ItsmRoutes = () => (
  <AuthContextProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/project/*" element={<Project />} />
        <Route path="/error" element={<PageError />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  </AuthContextProvider>
);

export default ItsmRoutes;
