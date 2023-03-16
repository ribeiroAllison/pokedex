import { capitalizeFirstLetter, correctIdFormat } from "../../Resources/support";
import { Link } from "react-router-dom";
import getApiInfo, { getNextPageURL } from "../../Resources/support"
import "./Gallery.css"
import srcPath from "../../Resources/loading.gif"


export default function Gallery (props) {


        /**
         * This function pushes a page of data from the API to the
         * pokemonData state array every time it is called, and consequently
         * these new pokemon fetched are displayed in main screen.
         */
        async function refreshPkmData(){
            let newList = props.pokemonData;
            let pokeData = await getApiInfo(props.nextPageURL);
            for(let returnedObject of pokeData){
                newList.push(returnedObject)
            }
            props.setPokemonData(newList);
        }

        /**
         * Set next API data page to be added to pokemonData state
         */
        async function refreshNextPage(){
            let nextPage = await getNextPageURL(props.nextPageURL);
            props.setNextPageURL(nextPage)
        }

        /**
         * Function to request more pokémon to be displayed on screen
         * and display a loading screen while information is being fetched
         */
        async function execute(){
            const load = document.getElementById("load");
            const button = document.getElementById("load-button")
            const loading = document.createElement('img');
            button.style.display = 'none'
            loading.setAttribute('src', srcPath)
            load.appendChild(loading)
            await refreshPkmData();
            await refreshNextPage();
            load.removeChild(load.lastChild)
            button.style.display = 'block'
        }
    
    return(
        <main>
            <div className="gallery-main">
                
                
                {
                    !props.pokemonData ? <img alt="running pikachu" src={srcPath} style={{width: "300px", margin: "auto"}}/>:
                    props.pokemonData?.map((pkm) =>{
                        return(
                            <div className="card-ctn">
                                <Link to={`/${pkm.name}`} className="poke-card">
                                    <img alt="pokemon" src={pkm.sprites.other['official-artwork'].front_default}/>
                                    <h3>{correctIdFormat(pkm)}</h3>
                                    <h2>{capitalizeFirstLetter(pkm.name)}</h2>
                                    <div className="type-ctr">
                                        {pkm.types.map((tp) => {
                                            return <h4 className={tp.type.name}>{tp.type.name}</h4>
                                        })}
                                    </div>
                                    
                                </Link>
                                
                            </div>
                        )
                    })
                }
                
                
                
            </div>
            <div id="load">
                {props.pokemonData  &&
                    <button onClick={execute} className="button" id="load-button">More Pokémon!!</button>
                }
                
            </div>
            
        </main>
    )
}