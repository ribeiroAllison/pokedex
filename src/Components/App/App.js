import './App.css';
import React, {useState, useEffect} from 'react';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import Root from '../Root/Root';
import Header from '../Header/Header';
import getApiInfo, {getNextPageURL} from "../../Resources/support"
import PokemonDetail from '../PokemonDetail/PokemonDetail';
import Error from '../Error/Error';




function App() {

  const [pokemonData, setPokemonData] = useState(); // This will store all pokemon objects that are displayed in main page
  const [nextPageURL, setNextPageURL] = useState('https://pokeapi.co/api/v2/pokemon'); // Get and set the next page of data from API
  const [found, setFound] = useState(); // Store the returned pokemon from catchPokemon() of Header.js

  useEffect(() =>{
    async function pkmData(){
        let pokeData = await getApiInfo(nextPageURL);
        setPokemonData(pokeData);
  }

  
    async function nextPage(){
      let nextPage = await getNextPageURL(nextPageURL);
      setNextPageURL(nextPage)
    }
  
  pkmData() 
  nextPage()
  }, [])

  const router =
  createBrowserRouter(createRoutesFromElements(
    <Route path="/" element={<Root />} errorElement={<Error />} >
      <Route index element={ <Header pokemonData={pokemonData} setPokemonData={setPokemonData} nextPageURL={nextPageURL} setNextPageURL={setNextPageURL} found={found} setFound={setFound}/>} />
      <Route path="/:pokemon" element={<PokemonDetail pokemonData={pokemonData} found={found}/>}/>
      
    </Route>
    
    
  ))

  return (
    <>
      <RouterProvider router={router}/>
    </>
  );
}

export default App;
