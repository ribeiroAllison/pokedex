import { capitalizeFirstLetter, correctIdFormat } from "../../Resources/support";
import { Link } from "react-router-dom";
import getApiInfo, { getNextPageURL } from "../../Resources/support"
import "./Galery.css"
import srcPath from "../../Resources/loading.gif"


export default function Galery (props) {


    
        async function refreshPkmData(){
            let newList = props.pokemonData;
            let pokeData = await getApiInfo(props.nextPageURL);
            for(let index of pokeData){
                newList.push(index)
            }
            props.setPokemonData(newList);
        }
        async function refreshNextPage(){
            let nextPage = await getNextPageURL(props.nextPageURL);
            props.setNextPageURL(nextPage)
        }

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
            <div className="galery-main">
                
                
                {
                    !props.pokemonData ? <h1>Loading...</h1>:
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
                <button onClick={execute} id="load-button">More Pokémon!!</button>
            </div>
            
        </main>
    )
}