import React, { Children } from 'react';
import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import "./style.scss"
import { AuthContext } from './context/AuthContext';

function App() {
  const { currentUser } = React.useContext(AuthContext)

  const ProtectedRoutes = ({ children }) => {
    if (!currentUser) {
      return (<Navigate to="/login" />)
    }
    return (children)
  }
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route
            index
            element={
              <ProtectedRoutes>
                <Home />
              </ProtectedRoutes>}
          />
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
