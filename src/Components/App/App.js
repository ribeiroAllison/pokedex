import './App.css';
import React from 'react';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import Root from '../Root/Root';
import Header from '../Header/Header';

function App() {

  const router =
  createBrowserRouter(createRoutesFromElements(
    <Route path="/" element={<Root />} >
      <Route index element={ <Header />} />

    </Route>
  ))

  return (
    <>
      <RouterProvider router={router}/>
    </>
  );
}

export default App;
