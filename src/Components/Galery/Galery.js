import { useEffect, useState } from "react"
import getApiInfo from "../../Resources/support"
import GaleryPokemon from "../GaleryPokemon/GaleryPokemon";

export default function Galery () {

    const [pokemon, setPokemon] = useState([]);
    const [pokemonData, setPokemonData] = useState();
    // const [id, setId] = useState(1);

    

    useEffect(() =>{
        async function pkm(){
            let pokeData = await getApiInfo();
            let pokeList = [];
            setPokemonData(pokeData.results);
            for(let data of pokemonData) {
                try{
                    let moster = await fetch(data.url)
                    if(moster.ok){
                        let jsonResponse = await moster.json();
                        pokeList.push(jsonResponse);
                        setPokemon(pokeList)
                        
                    }


                    
                }catch(error){
                    console.log(error)
                }
                
            }
            console.log(pokemon)
    }pkm() }, [])

    // const populate = () => {
    //     pokemon.map((pkm) =>{
    //         return <h1>{pkm.name}</h1>
    //     })
    // }
    
    
    
    
    return(
        <main>
            <div className="galery-card">
            
                {pokemon.map((pkm) =>{
                    return (
                        <div>
                            <h1>{pkm.name}</h1>
                            <h2>{pkm.weight}</h2>
                        </div>
                    )
                    
                })}

            </div>
            
        </main>
    )
}