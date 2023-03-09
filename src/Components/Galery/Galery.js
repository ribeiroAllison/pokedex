import { useEffect, useState } from "react"
import getApiInfo from "../../Resources/support"
import GaleryPokemon from "../GaleryPokemon/GaleryPokemon";

export default function Galery () {

    // const [pokemon, setPokemon] = useState();
    const [pokemonList, setPokemonList] = useState();
    // const [id, setId] = useState(1);

    

    useEffect(() =>{
        async function pkm(){
            let pokeData = await getApiInfo()
            // for(let pokemon of pokeData){
            //     setPokemonList([...pokemonList, pokemon])
            
            // }
            setPokemonList(pokeData.results);
    }pkm() }, [])

    
    
    
    
    
    return(
        <main>
            <div className="galery-card">
                {
                    pokemonList.map((pokemon) =>{
                        return <h1>{pokemon.name}</h1>
                    }
                        
                    
                        
                    )
                }
                
                

            </div>
            
        </main>
    )
}