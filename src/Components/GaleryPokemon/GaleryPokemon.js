import Galery from "../Galery/Galery";
export default function GaleryPokemon(props){

    function buildArray () {
        let array = [];
        for(let i = 1; i < 5; i++){
            array.push(i)
        }
        return array
    }
    
    const idArray = buildArray();
    

    const populate = idArray.map((num) => {
        props.setId(num);
        return <h2>{num}</h2>
    })

    // function populate () {
    //     for(let number of idArray) {
    //         props.setId(number);
    //         return <h1>{props.pokemon.name}</h1>
    //     }
    // }
    

    return(
        <div>
            {populate}
                
        </div>
    )
}