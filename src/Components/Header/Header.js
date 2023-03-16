import Gallery from "../Gallery/Gallery"
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import getApiInfo, { getNextPageURL } from "../../Resources/support"
import loadingCircle from "../../Resources/loading-circle.gif"
import searchButton from "../../Resources/input#search.png"
import "./Header.css"


export default function Header (props){

    const navigate = useNavigate();

    function goTo(id) {
        navigate(`/${id}`)
    }

    
    const [searchParam, setSearchParam] = useState()
    

    function handleChangeParam(e) {
        let param = e.target.value;
        setSearchParam(param)
        
    }

    /**
     * This function checks if the pokemon ID or name, provided by
     * the user via input on Header, can be found as an attribute of the objects
     * stored pokemonData state. If not, it goes on and try to find a match
     * among all objects returned as JSON from API
     * 
     * @id {string} - The string typed by user in input field
     * @foundOnState {object} - An object of pokemonData state that
     * matches the name or ID from id param
     * @foundOnApi {object} - An object returned from the search of every data page
     * from the API, if no match is found an error in thrown.
     * @page {string} - A string of the URL from the next page of data from API
     * @returns either foundOnState or foundOnApi objects, also trigger the
     * navigation to found pokemon detail page.
     */
    async function catchPokemon() {

        const button = document.getElementById("search-button");
        button.setAttribute('src', loadingCircle)

        let id = searchParam;
        let foundOnState = props.pokemonData.find(
            (pokemon) =>
            pokemon.id.toString() === id || pokemon.name === id.toLowerCase()
        );
        if (foundOnState) {
            props.setFound(foundOnState);
            goTo(foundOnState.name);
            return;
        }

        let foundOnApi = null;
        let page = props.nextPageURL;
        while (!foundOnApi && page) {
            const searchResult = await getApiInfo(page);
            foundOnApi = searchResult.find(
            (pokemon) =>
                pokemon.id.toString() === id || pokemon.name === id.toLowerCase()
            );
            if (!foundOnApi) {
            page = await getNextPageURL(page);
            }
        }

        if (foundOnApi) {
            props.setFound(foundOnApi);
            goTo(foundOnApi.name);
            page = props.nextPageURL;
        } else {
            throw new Error();
        }
        button.setAttribute('src', searchButton);
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
                        <input type="text" name="searchBox" id="searchBox" onChange={handleChangeParam} />
                        <img alt= "research button" onClick={catchPokemon} src={require('./resources/input#search.png') } id="search-button"/>
                    </div>
                    
                
                </div>
                <div id="greenBox">
                    <h2>Search for a Pokémon by name or using its National Pokédex number.</h2>

                </div>

            </div>
            
            <div  id="bottom-bar">

            </div>
        </header>
        <Gallery pokemonData={props.pokemonData} setPokemonData={props.setPokemonData} nextPageURL={props.nextPageURL} setNextPageURL={props.setNextPageURL}/>
        </div>
       
        
    )
}
