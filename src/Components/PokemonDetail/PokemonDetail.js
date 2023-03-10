import { useParams } from "react-router-dom"
import { capitalizeFirstLetter, correctIdFormat } from "../../Resources/support";
import "./PokemonDetail.css"

export default function(props) {

    let {pokemon} = useParams();

    let paramsPokemonObj = props.pokemonData.filter(obj => obj.name === pokemon);
    let targetPokemon = paramsPokemonObj[0];

    return(
        <section className="detail-card">
            <h2>{capitalizeFirstLetter(targetPokemon.name) + " " + correctIdFormat(targetPokemon)} </h2>
            <div className="pokemon-detail">
                <img src={targetPokemon.sprites.other['official-artwork'].front_default}/>
                <div className="info-card">
                    <div className="column-1">
                        <label for="height">Height</label>
                        <p name="height">{targetPokemon.height * 10}cm</p>
                        <label for="weight">Height</label>
                        <p name="weight">{targetPokemon.weight / 10}kg</p>
                        <label for="abilities">Abilities</label>
                        <p name="abilitiles">{targetPokemon.abilities[0].ability.name}</p>
                    </div>
                    <div className="column-2">
                        <label for="base">Base Experience</label>
                        <p name="base">{targetPokemon.base_experience}</p>
                        <label for="appears">First Appears in</label>
                        <p name="appears">{targetPokemon.game_indices[0].version.name}</p>
                    </div>
                    
                </div>
                
            </div>
            <div className="type-ctr">
                <p>Type</p>
                        {targetPokemon.types.map((tp) => {
                            return <h4 className={tp.type.name} id="detail-card-type">{tp.type.name}</h4>
                        })}
                    </div>
        </section>
        
    )
}