
export default async function getApiInfo(url){


    let results;
    let pokeList = [];
    
    try{
        const response = await fetch(url)
        
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

export function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export function correctIdFormat (pkm){
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


export async function getNextPageURL(url){


    let results;
    
    
    try{
        const response = await fetch(url)
        
        if(response.ok){
            let jsonResponse = await response.json();
            results = jsonResponse.next

        };
        



    } catch(error){
        console.log(error)
    }
    console.log(results)
    return results
}