import Galery from "../Galery/Galery"
import "./Header.css"
import getApiInfo, { getNextPageURL } from "../../Resources/support"
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import loadingCircle from "../../Resources/loading-circle.gif"
import searchButton from "../../Resources/input#search.png"


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
        <Galery pokemonData={props.pokemonData} setPokemonData={props.setPokemonData} nextPageURL={props.nextPageURL} setNextPageURL={props.setNextPageURL}/>
        </div>
       
        
    )
}
