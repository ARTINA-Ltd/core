import React from 'react';

import App from '../LoginComponent/App';

import {BrowserRouter, Routes, Route} from "react-router-dom";
import SignUp from "../LoginComponent/SignUp";

function LoginPage() {

return<>

        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<App />} />
                <Route path="/" element={<App />} />
                <Route exact path="/signup" element={<SignUp/>} />
            </Routes>
        </BrowserRouter>
</>
} export default LoginPage

