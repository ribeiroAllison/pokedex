import Galery from "../Galery/Galery"
import "./Header.css"
import getApiInfo, { getNextPageURL } from "../../Resources/support"
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";


export default function Header (props){

    const [nextSearch, setNextSearch] = useState(props.nextPageURL)
    const [searchTarget, setSearchTarget] = useState()

    useEffect(() => {
    
        searchPkmData()
        refreshNextPage()
    }, [])


    
    
    async function searchPkmData(){
        let searchResult = await getApiInfo(nextSearch);
        setSearchTarget(searchResult)
        
    }

    async function refreshNextPage(){
        let nextPage = await getNextPageURL(nextSearch);
        setNextSearch(nextPage);
    }


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

    async function catchPokemon(){
        let id = searchParam;
        let foundOnState = props.pokemonData.find(pokemon => pokemon.id.toString() === id || pokemon.name === id.toLowerCase())
        foundOnState && props.setFound(foundOnState)
        let foundOnApi = false;
        while(!props.found){
            foundOnApi = searchTarget.find(pokemon => pokemon.id.toString() === id || pokemon.name === id.toLowerCase())
            if(foundOnApi){
                props.setFound(foundOnApi);
            } else {
                await refreshNextPage();
                await searchPkmData();
            }
            
        }

        props.found && goTo(props.found.name)

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
