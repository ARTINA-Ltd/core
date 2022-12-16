import React from 'react';

import ProtectedPage from '../LoginComponent/ProtectedPage'
import {BrowserRouter, Routes, Route} from "react-router-dom";
import SignUp from "../LoginComponent/SignUp";
import PrivateRoute from '../LoginComponent/PrivateRoute';
import HomePage from '../LoginComponent/HomePage';
import { AuthProvider } from '../LoginComponent/AuthContext';

function LoginPage() {

return<>
<div className='app'>
            <AuthProvider>
                <Routes>
                    <Route element={<PrivateRoute><ProtectedPage /></PrivateRoute>} exact path="/protected" />
                    <Route element={<HomePage />} path="/"/>
                    <Route element={<SignUp />} exact path="/signup"/>
                </Routes>
            </AuthProvider>
            </div>
</>
} export default LoginPage

