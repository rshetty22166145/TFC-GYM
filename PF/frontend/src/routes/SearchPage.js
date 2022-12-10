import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import SearchBar from "../components/SearchBar";

function SearchPage(){
    return(
        <div>
            <NavBar></NavBar>
            <br></br>
            <SearchBar></SearchBar>
        </div>
    )
}

export default SearchPage;