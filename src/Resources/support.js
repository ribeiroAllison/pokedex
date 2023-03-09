const baseUrl = 'https://pokeapi.co/api/v2/';

const pokemonPath = 'pokemon'

async function getApiInfo(id){
    let results;
    
    try{
        const response = await fetch(`${baseUrl}${pokemonPath}/${id}`)
        
        if(response.ok){
            let jsonResponse = await response.json();
            results = jsonResponse

        }



    } catch(error){
        console.log(error)
    }
    return results;

}

async function getPokemon(id){
    
    const pokeObj = await getApiInfo(id);
    const objId = pokeObj.id;
    let pokeId = "";

    if(objId < 10){
        pokeId = `#000${objId.toString()}`
    }else if( objId >=10 && objId <100){
        pokeId = `#00${objId.toString()}`
    } else if (objId >=100 && objId <1000){
        pokeId = `#0${objId.toString()}`
    } else{
        pokeId = `#${objId.toString()}`
    }
    
    const pokemon = {
        name: pokeObj.name,
        height: pokeObj.height,
        weight: pokeObj.weight,
        type: pokeObj.types[0].type.name,
        strId: pokeId,
        id: pokeObj.id,
        ability: pokeObj.abilities[0].ability.name
    }

    return pokemon;
}

console.log(getPokemon(999))
