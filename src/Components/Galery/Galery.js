import { capitalizeFirstLetter, correctIdFormat } from "../../Resources/support";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import getApiInfo, {getNextPageURL} from "../../Resources/support"
import "./Galery.css"


export default function Galery (props) {

    const[toggle, setToggle] = useState(false)

    useEffect(() => {
        async function pkmData(){
            let pokeData = await getApiInfo(props.nextPageURL);
            props.setPokemonData( pokeData);
        }
        async function nextPage(){
            let nextPage = await getNextPageURL(props.nextPageURL);
            props.setNextPageURL(nextPage)
        }
        pkmData()
        nextPage()
    },[toggle])
    

function changeToggle(){
    toggle ? setToggle(false) : setToggle(true)
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
            <button onClick={changeToggle}>More Pokémon!!</button>
        </main>
    )
}