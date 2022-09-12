import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import { AuthProvider } from "./AuthContext";
import Home from "./HomePage";
import Login from "./LoginPage";
import ProtectedPage from "./ProtectedPage";

function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <Routes>
                    <Route element={<PrivateRoute><ProtectedPage /></PrivateRoute>} path="/protected" />
                    <Route element={<Home />} path="/"/>
                    <Route element={<Login />} path="/login"/>
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    );
}

export default App;