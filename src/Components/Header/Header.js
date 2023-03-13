import Galery from "../Galery/Galery"
import "./Header.css"
import getApiInfo, { getNextPageURL } from "../../Resources/support"
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";


export default function Header (props){

    const [searchTarget, setSearchTarget] = useState()
    const [nextSearch, setNextSearch] = useState(props.nextPageURL)
    const [toggle, setToggle] = useState(false)
    


useEffect(() => {
    
    searchPkmData()
    refreshNextPage()
}, [props.nextPageURL, toggle])


    async function searchPkmData(){
        let searchResult = await getApiInfo(nextSearch);
        setSearchTarget(searchResult)
        
    }
    async function refreshNextPage(){
        let nextPage = await getNextPageURL(nextSearch);
        setNextSearch(nextPage);
    }

    async function catchPokemon(){
        await searchPkmData()
        
        
    }

    async function updateNext(){
        await refreshNextPage()
        
    }

    function changeToggle(){
        toggle ? setToggle(false) : setToggle(true)
    }
    
    const navigate = useNavigate();

    function goTo(id) {
        navigate(`/${id}`)
    }

    function goToError() {
        navigate(`/error`)
    }
    
    async function searchPokemon() {
        let id = document.getElementById("searchBox").value;
        const foundOnState = props.pokemonData.find(pokemon => pokemon.id.toString() === id || pokemon.name === id.toLowerCase())
        let foundOnApi;
        await catchPokemon()
        foundOnApi = searchTarget.find(pokemon => pokemon.id.toString() === id || pokemon.name === id.toLowerCase())
        !foundOnApi && changeToggle()
        
        const foundPokemon = foundOnState ? foundOnState : foundOnApi;
        foundPokemon && props.setFound(foundPokemon)
        // goTo(foundPokemon.name)
    }

    async function goToFoundPokemon () {
        while(!props.found){
            await searchPokemon()
        }
        goTo(props.found.name)
    }


    return(
        <div>
            <header>
            <div className="header-content" id="top-header">
                <h1>Pokédex</h1>
            </div>
            <div className="header-content" id="search-ctn">
                <div id="search-box">
                    <label for="searchBox">Name or Number</label>
                    <div id="input-ctn">
                        <input type="text" name="searchBox" id="searchBox" />
                        <img alt= "research button" onClick={goToFoundPokemon} src={require('./resources/input#search.png') }/>
                    </div>
                    
                    <h3>Use the Advanced Search to explore Pokémon by type, weakness, Ability, and more!</h3>
                </div>
                <div id="greenBox">
                    <h2>Search for a Pokémon by name or using its National Pokédex number.</h2>

                </div>

            </div>
            
            <div  id="bottom-bar">

            </div>
        </header>
        <Galery pokemonData={props.pokemonData} setPokemonData={props.setPokemonData} nextPageURL={props.nextPageURL} setNextPageURL={props.setNextPageURL}/>
        </div>
       
        
    )
}
