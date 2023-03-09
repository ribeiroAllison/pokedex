import { useEffect, useState } from "react"
import getApiInfo from "../../Resources/support"
import "./Galery.css"


export default function Galery () {


    const [pokemonData, setPokemonData] = useState();
    
    

    useEffect(() =>{
        async function pkmData(){
            let pokeData = await getApiInfo();
            setPokemonData(pokeData);
            
            
    }pkmData() }, [])

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
        <main>
            <div className="galery-card">
            
                {
                    
                    pokemonData?.map((pkm) =>{
                        return(
                            <div>
                                <img alt="pokemon" src={pkm.sprites.other['official-artwork'].front_default}/>
                                <h3>{correctIdFormat(pkm)}</h3>
                                <h2>{pkm.name}</h2>
                                {pkm.types.map((tp) => {
                                    return <h2>{tp.type.name}</h2>
                                })}
                            </div>
                        )
                    })
                }

            </div>
            
        </main>
    )
}