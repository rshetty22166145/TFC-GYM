import { useState, useEffect } from "react";

function SearchBar({map}) {
    const [search, setSearch] = useState("");
    const [searchStudioName, setSearchStudioName] = useState(true);
    const [searchClassName, setSearchClassName] = useState(false);
    const [searchCoachName, setSearchCoachName] = useState(false);
    const [searchAmentity, setSearchAmentity] = useState(false);

    useEffect(() => {
        console.log("trying to search :" + search)
    }, [search])

    useEffect(() => {
        console.log("map using :" + map)
    }, [map])

    useEffect(() => {
        console.log("Are you searching using studio name? " + searchStudioName)
    }, [searchStudioName])

    useEffect(() => {
        console.log("Are you searching using class name? " + searchClassName)
    }, [searchClassName])

    useEffect(() => {
        console.log("Are you searching using coach name? " + searchCoachName)
    }, [searchCoachName])

    useEffect(() => {
        console.log("Are you searching using amenity? " + searchAmentity)
    }, [searchAmentity])

    const handleSearch = () => {
        console.log(search);
    };

    const Checkbox = ({ label, value, onChange }) => {
        return (
            <label style={{color: "black"}}>
                <input type="checkbox" checked={value} onChange={onChange} />
                {label}
            </label>
        );
    };

    function SearchFilter() {
        return (
            <div>
                <Checkbox
                    label="Studio Name"
                    value={searchStudioName}
                    onChange={(e) => setSearchStudioName(!searchStudioName)}
                />
                <Checkbox
                    label="Class Name"
                    value={searchClassName}
                    onChange={(e) => setSearchClassName(!searchClassName)}
                />
                <Checkbox
                    label="Coach Name"
                    value={searchCoachName}
                    onChange={(e) => setSearchCoachName(!searchCoachName)}
                />
                <Checkbox
                    label="Amentities Type"
                    value={searchAmentity}
                    onChange={(e) => setSearchAmentity(!searchAmentity)}
                />
            </div>
        )
    }

    function SearchResult() {

    }

    return (
        <div>
            <input 
                value={search} 
                onChange={(e) => setSearch(e.target.value)}
            />
            <button onClick={handleSearch}>
                Search
            </button>
            <br></br>
            <SearchFilter></SearchFilter>
            
        </div>
    );
}

export default SearchBar;