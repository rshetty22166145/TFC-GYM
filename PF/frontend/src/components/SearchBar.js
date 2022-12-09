import { useState, useEffect } from "react";

function SearchBar() {
    const [search, setSearch] = useState("");
    const [searchStudio, setSearchStudio] = useState(false);

    const handleSearch = () => {
        console.log(search);
    };

    const handleSearchChange = () => {
        setSearchStudio(!searchStudio);
        console.log(searchStudio);
    };

    const Checkbox = ({ label, value, onChange }) => {
        return (
            <label>
                <input type="checkbox" checked={value} onChange={onChange} />
                {label}
            </label>
        );
    };

    function SearchResult() {
        if (searchStudio) {
            return null;
        }
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
            <Checkbox
                label="Search Studio"
                value={searchStudio}
                onChange={handleSearchChange}
            />
            <Checkbox
                label="Search Class"
                value={!searchStudio}
                onChange={handleSearchChange}
            />
        </div>
    );
}

export default SearchBar;