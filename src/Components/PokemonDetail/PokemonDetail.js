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
                <div>
                    <div className="info-card">
                        <div className="column-1 column">
                            <label for="height">Height</label>
                            <p name="height">{targetPokemon.height * 10}cm</p>
                            <label for="weight">Weight</label>
                            <p name="weight">{targetPokemon.weight / 10}kg</p>
                            <label for="abilities">Abilities</label>
                            <p name="abilitiles">{targetPokemon.abilities[0].ability.name}</p>
                        </div>
                        <div className="column-2 column">
                            <label for="base">Base Experience</label>
                            <p name="base">{targetPokemon.base_experience}</p>
                            <label for="appears">First appeared in</label>
                            <p name="appears">{targetPokemon.game_indices[0].version.name}</p>
                        </div>
                    </div>
                    <div className="type-ctr" id="detail-type-ctr">
                        <p>Type </p>
                        <div className="types">
                            {targetPokemon.types.map((tp) => {
                                return <h4 className={tp.type.name} id="detail-card-type">{tp.type.name}</h4>
                            })}
                        </div>
                        
                    </div>
                    
                </div>
                
                
                
            </div>
            <div className="art-galery">
                <h2>Art Galery</h2>
                <div>
                    
                    <div>
                        <img src={targetPokemon.sprites.front_default}/>
                        <img src={targetPokemon.sprites.back_default}/>
                        { targetPokemon.sprites.front_female && <img src={targetPokemon.sprites.front_female}/>}
                        { targetPokemon.sprites.back_female && <img src={targetPokemon.sprites.back_female}/>}
                        { targetPokemon.sprites.front_shiny && <img src={targetPokemon.sprites.front_shiny}/>}
                        { targetPokemon.sprites.back_shiny && <img src={targetPokemon.sprites.back_shiny}/>}
                        { targetPokemon.sprites.front_shiny_female && <img src={targetPokemon.sprites.front_shiny_female}/>}
                        { targetPokemon.sprites.back_shiny_female && <img src={targetPokemon.sprites.back_shiny_female}/>}
                    </div>
                </div>
            </div>
            
        </section>
        
    )
}