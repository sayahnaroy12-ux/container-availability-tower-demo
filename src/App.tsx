/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BrowserRouter, HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { SupplyChainProvider, useSupplyChain } from './store/SupplyChainContext';
import Layout from './components/Layout';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import MapPage from './pages/MapPage';
import LocationManager from './pages/LocationManager';
import Inventory from './pages/Inventory';
import ContainerPipeline from './pages/ContainerPipeline';
import TrackShipment from './pages/TrackShipment';
import TransformationProject from './pages/TransformationProject';
import Suppliers from './pages/Suppliers';
import Alerts from './pages/Alerts';
import Settings from './pages/Settings';
import Profile from './pages/Profile';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useSupplyChain();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return <>{children}</>;
};

function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="map" element={<MapPage />} />
        <Route path="locations" element={<LocationManager />} />
        <Route path="inventory" element={<Inventory />} />
        <Route path="container-pipeline" element={<ContainerPipeline />} />
        <Route path="suppliers" element={<Suppliers />} />
        <Route path="alerts" element={<Alerts />} />
        <Route path="settings" element={<Settings />} />
        <Route path="profile" element={<Profile />} />
        <Route path="track-shipment" element={<TrackShipment />} />
        <Route path="transformation-project" element={<TransformationProject />} />
      </Route>
    </Routes>
  );
}

export default function App() {
  return (
    <SupplyChainProvider>
      {import.meta.env.BASE_URL === '/'
        ? <BrowserRouter><AppRoutes /></BrowserRouter>
        : <HashRouter><AppRoutes /></HashRouter>}
    </SupplyChainProvider>
  );
}
