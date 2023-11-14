import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import Contact from './pages/Contact.jsx'
import LoginProvider, { LoginContext } from './contexts/LoginProvider.jsx';
import ThemeProvider from './contexts/ThemeProvider.jsx';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/contact",
    element: <Contact />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(

  <LoginProvider>
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  </LoginProvider>
)
