import { capitalizeFirstLetter, correctIdFormat } from "../../Resources/support";
import { Link } from "react-router-dom";
import "./Galery.css"


export default function Galery (props) {

    
    return(
        <main className="galery-main">
            
            
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

            
            
        </main>
    )
}