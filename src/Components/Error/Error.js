import "./Error.css"
import GoBack from "../BackButton/BackButton"

export default function Error(){

    return(
        <div id="error">
            <h1>Something went wrong :(</h1>
            <img alt="crying pikachu" src={require("../../Resources/sad-pikachu.gif")}></img>
            <GoBack />
        </div>
    )
}