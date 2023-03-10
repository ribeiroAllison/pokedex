import './App.css';
import React, {useState, useEffect} from 'react';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import Root from '../Root/Root';
import Header from '../Header/Header';
import getApiInfo from "../../Resources/support"




function App() {

  const [pokemonData, setPokemonData] = useState();

  useEffect(() =>{
    async function pkmData(){
        let pokeData = await getApiInfo();
        setPokemonData(pokeData);
        
        
  }pkmData() }, [])

  const router =
  createBrowserRouter(createRoutesFromElements(
    <Route path="/" element={<Root />} >
      <Route index element={ <Header pokemonData={pokemonData} setPokemonData={setPokemonData}/>} />
    
      
      

    </Route>
  ))

  return (
    <>
      <RouterProvider router={router}/>
    </>
  );
}

export default App;
