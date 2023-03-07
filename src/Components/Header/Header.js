import "./Header.css"

export default function Header (){

    return(
        <header>
            <div className="header-content" id="top-header">
                <h1>Pokédex</h1>
            </div>
            <div className="header-content" id="search-ctn">
                <div id="search-box">
                    <label for="searchBox">Name or Number</label>
                    <div id="input-ctn">
                        <input type="text" name="searchBox"/>
                        <img src={require('./resources/input#search.png')}/>
                    </div>
                    
                    <h3>Use the Advanced Search to explore Pokémon by type, weakness, Ability, and more!</h3>
                </div>
                <div id="greenBox">
                    <h2>Search for a Pokémon by name or using its National Pokédex number.</h2>

                </div>

            </div>
            
            <div className="header-content" id="bottom-bar">

            </div>
        </header>
    )
}