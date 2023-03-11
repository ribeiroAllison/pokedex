import { capitalizeFirstLetter, correctIdFormat } from "../../Resources/support";
import { Link } from "react-router-dom";
import getApiInfo, {getNextPageURL} from "../../Resources/support"
import "./Galery.css"


export default function Galery (props) {


    
        async function pkmData(){
            let newList = props.pokemonData;
            let pokeData = await getApiInfo(props.nextPageURL);
            for(let index of pokeData){
                newList.push(index)
            }
            props.setPokemonData(newList);
        }
        async function nextPage(){
            let nextPage = await getNextPageURL(props.nextPageURL);
            props.setNextPageURL(nextPage)
        }

        async function execute(){
            await pkmData();
            await nextPage();
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
            <button onClick={execute}>More Pokémon!!</button>
        </main>
    )
}