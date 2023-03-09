import { useEffect, useState } from "react"
import getPokemon from "../../Resources/support"

export default function Galery () {

    const [pokemon, setPokemon] = useState();
    

    useEffect(() =>{
        async function pkm(id){
            let pokeData = await getPokemon(id)
            setPokemon(pokeData)
        }
        pkm(1)

    }, [])
    
    
    
    return(
        <main>
            <div className="galery-card">
                {/* <h1>{pokemon.name}</h1> */}
                
                

            </div>
            
        </main>
    )
}