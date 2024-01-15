import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from "./containers/Home";
import Calculator from './containers/Calculator';
import Comparison from './containers/Comparison';
import LoginPage from './containers/LoginPage';
import ProtectedRoute from './containers/ProtectedRoute';

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/" element={<ProtectedRoute />} >
                <Route index element={<Home />} />
                <Route path="/calculator" element={<Calculator />} />
                <Route path="/comparison" element={<Comparison />} />
            </Route>
        </Routes>
    );
}

