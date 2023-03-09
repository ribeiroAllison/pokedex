const baseURL = 'https://swapi.dev/api/'; 




//function to extract from API all characters objects
const getPeopleList =  async () =>{
    const peopleEndPoint = 'people/';
    let charData;

        
        const requestParams = `?page=1`;
        const urlToFetch = `${baseURL}${peopleEndPoint}${requestParams}`;

        try{
            const response = await fetch(urlToFetch);
            if(response.ok){
                let jsonResponse = await response.json();
                charData = jsonResponse.results;
                
                
                
            }

        } catch(error){
            console.log(error);
        }
        

    
    
    return charData; //array with all 9 pages worth of charaters objects, however each page is store in its own child array
}

console.log(getPeopleList())