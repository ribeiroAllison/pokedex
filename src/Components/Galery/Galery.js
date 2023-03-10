import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import "./Galery.css"


export default function Galery (props) {



    function correctIdFormat (pkm){
        let pokeId = '';
        if(pkm.id < 10){
            pokeId = `#000${pkm.id.toString()}`
        }else if( pkm.id >=10 && pkm.id <100){
            pokeId = `#00${pkm.id.toString()}`
        } else if (pkm.id >=100 && pkm.id <1000){
            pokeId = `#0${pkm.id.toString()}`
        } else{
            pokeId = `#${pkm.id.toString()}`
        };
        return pokeId;
    };
    
    
    return(
        <main className="galery-main">
            
            
            {
                !props.pokemonData ? <h1>Loading...</h1>:
                props.pokemonData?.map((pkm) =>{
                    return(
                        <div className="card-ctn">
                            <Link to={`/${pkm.name}}`} className="poke-card">
                                <img alt="pokemon" src={pkm.sprites.other['official-artwork'].front_default}/>
                                <h3>{correctIdFormat(pkm)}</h3>
                                <h2>{pkm.name}</h2>
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