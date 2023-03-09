
export default async function getApiInfo(){

    const baseUrl = 'https://pokeapi.co/api/v2/';

    const pokemonPath = 'pokemon'

    let results;
    let pokeList = [];
    
    try{
        const response = await fetch(`${baseUrl}${pokemonPath}`)
        
        if(response.ok){
            let jsonResponse = await response.json();
            results = jsonResponse.results

        };
        



    } catch(error){
        console.log(error)
    }

    for(let data of results) {
        try{
            const moster = await fetch(data.url)
            if(moster.ok){
                let jsonResponse = await moster.json();
                pokeList.push(jsonResponse);
            }


            
        }catch(error){
            console.log(error)
        }
    

}
    return pokeList;
}

