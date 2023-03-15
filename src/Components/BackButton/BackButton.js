import { useNavigate } from "react-router-dom"
import "./BackButton.css"

export default function GoBack() {

    const navigate = useNavigate()

    function goBack(){
        return navigate(-1);
    }

    return(
        <button onClick={goBack} className="button">Back</button>
    )

}