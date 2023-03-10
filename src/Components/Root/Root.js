import { Outlet } from "react-router-dom"
import './Root.css'

export default function Root(){

    return(
        <section id="root">
            <div className="grayBar"></div>
                <Outlet />
            <div className="grayBar"></div>
        </section>
    )
}