import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Login } from './web/pages/login';
import { Logs } from './web/pages/logs';
import { Sites } from './web/pages/sites';
import CreateSite from './web/pages/sites/create';
import { setupToaster } from './utils/toaster';
import ViewSite from './web/pages/sites/_id';
import { Signup } from './web/pages/signup';
import { Layout } from './web/layouts/Layout';
import { RequireAuth } from './web/common/RequireAuth';
import { NotFound } from './web/layouts/NotFound';
import 'bootstrap/dist/css/bootstrap.min.css';

setupToaster();

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* private routes */}
        <Route element={<RequireAuth />}>
          <Route path="/logs" element={<Logs />} />
          <Route path="/sites" element={<Sites />} />
          <Route path="/sites/create" element={<CreateSite />} />
          <Route path="/sites/:id" element={<ViewSite />} />
        </Route>

        {/* not found route */}
        <Route path="/*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
