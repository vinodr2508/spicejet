import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Login";
import Dashboard from "./Dashboard";

/**
 * Component Name: App Component
 * Description: Handling redirection between Login and Dashboard Component
 * Parameters: No Parameters
**/
const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="dashboard" element={<Dashboard />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;

