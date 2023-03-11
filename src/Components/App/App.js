import './App.css';
import React, {useState, useEffect} from 'react';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import Root from '../Root/Root';
import Header from '../Header/Header';
import getApiInfo, {getNextPageURL} from "../../Resources/support"
import PokemonDetail from '../PokemonDetail/PokemonDetail';




function App() {

  const [pokemonData, setPokemonData] = useState();
  const [nextPageURL, setNextPageURL] = useState('https://pokeapi.co/api/v2/pokemon');

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
    <Route path="/" element={<Root />} >
      <Route index element={ <Header pokemonData={pokemonData} setPokemonData={setPokemonData} nextPageURL={nextPageURL} setNextPageURL={setNextPageURL}/>} />
      <Route path="/:pokemon" element={<PokemonDetail pokemonData={pokemonData}/>}/>
    </Route>
    
    
  ))

  return (
    <>
      <RouterProvider router={router}/>
    </>
  );
}

export default App;
