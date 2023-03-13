import Galery from "../Galery/Galery"
import "./Header.css"
import getApiInfo, { getNextPageURL } from "../../Resources/support"
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";


export default function Header (props){

    const [nextSearch, setNextSearch] = useState(props.nextPageURL)


    async function refreshNextPage() {
        let nextPage = await getNextPageURL(nextSearch);
        setNextSearch(nextPage);

    }

    useEffect(() => {
        refreshNextPage()
    }, [])



    const navigate = useNavigate();

    function goTo(id) {
        navigate(`/${id}`)
    }

    function goToError() {
        navigate(`/error`)
    }

    const [searchParam, setSearchParam] = useState()
    
    function handleChangeParam(e) {
        let param = e.target.value;
        setSearchParam(param)
        
    }

    async function catchPokemon() {
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
        let page = nextSearch;
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
            setNextSearch(props.nextPageURL)
        } else {
            goToError();
        }
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
                        <img alt= "research button" onClick={catchPokemon} src={require('./resources/input#search.png') }/>
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
