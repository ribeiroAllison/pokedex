import './App.css';
import React from 'react';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import Root from '../Root/Root';
import Header from '../Header/Header';
import Galery from '../Galery/Galery';

function App() {

  const router =
  createBrowserRouter(createRoutesFromElements(
    <Route path="/" element={<Root />} >
      <Route index element={ <Header />} />
      <Route path="/galery" element={ <Galery />}/>
      

    </Route>
  ))

  return (
    <>
      <RouterProvider router={router}/>
    </>
  );
}

export default App;
