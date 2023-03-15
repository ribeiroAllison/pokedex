import { useParams, useNavigate } from "react-router-dom"
import { capitalizeFirstLetter, correctIdFormat } from "../../Resources/support";
import "./PokemonDetail.css"
import GoBack from "../BackButton/BackButton";

export default function(props) {

    let {pokemon} = useParams();
    

    let paramsPokemonObj = props.pokemonData.filter(obj => obj.name === pokemon);
    let targetPokemon = paramsPokemonObj[0] ? paramsPokemonObj[0] : props.found

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
                            {targetPokemon.game_indices[0] &&
                                <div id="first-appears">
                                    <label for="appears">First appeared in</label>
                                    <p name="appears">{targetPokemon.game_indices[0].version.name}</p>
                                </div>

                            }
                            
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

                    <div className="art-imgs">
                        <figure>
                            <img src={targetPokemon.sprites.front_default} />
                            <figcaption>Default</figcaption>
                        </figure>
                        <figure>
                            <img src={targetPokemon.sprites.back_default}/>
                            <figcaption>Default</figcaption>
                        </figure>

                        {targetPokemon.sprites.front_female && 
                            <figure>
                                <img src={targetPokemon.sprites.front_female}/>
                                <figcaption>♀️ Version</figcaption>
                            </figure>
                        
                        }
                        
                        {targetPokemon.sprites.back_female &&
                            <figure>
                                <img src={targetPokemon.sprites.back_female}/>
                                <figcaption>♀️ Version</figcaption>
                            </figure>
                        
                        }

                        {targetPokemon.sprites.front_shiny &&
                            <figure>
                                <img src={targetPokemon.sprites.front_shiny}/>
                                <figcaption>Shiny</figcaption>
                            </figure>
                        }

                        { targetPokemon.sprites.back_shiny &&
                            <figure>
                                <img src={targetPokemon.sprites.back_shiny}/>
                                <figcaption>Shiny</figcaption>
                            </figure>
                        }

                        { targetPokemon.sprites.front_shiny_female &&
                            <figure>
                                <img src={targetPokemon.sprites.front_shiny_female}/>
                                <figcaption>♀️ Shiny</figcaption>
                            </figure>
                        }
                        
                        { targetPokemon.sprites.back_shiny_female &&
                            <figure>
                                <img src={targetPokemon.sprites.back_shiny_female}/>
                                <figcaption>♀️ Shiny</figcaption>
                            </figure>
                        }
                        
                    </div>
                <div className="alternative-art">
                    { targetPokemon.sprites.other.dream_world.front_default &&
                        <figure>
                            <img src={targetPokemon.sprites.other.dream_world.front_default}/>
                            <figcaption> Dream World </figcaption>
                        </figure>
                    }

                    { targetPokemon.sprites.other['official-artwork'].front_shiny &&
                        <figure>
                            <img src={targetPokemon.sprites.other['official-artwork'].front_shiny}/>
                            <figcaption> Official Shiny Art</figcaption>
                        </figure>
                    }
                    
                    
                </div>
                
            </div>
            <GoBack />
        </section>
        
    )
}