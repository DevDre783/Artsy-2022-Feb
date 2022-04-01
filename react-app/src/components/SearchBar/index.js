import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import "./SearchBar.css"


function SearchBar() {
    const listings = Object.values(useSelector(state => state?.main_listings));
    console.log()
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    const allTitles = listings.map(listing => {
        return listing.title;
    })

    useEffect(() => {
        setSearchTerm("")
    }, [])

    useEffect(() => {

        if (searchTerm === "") {
            return setSearchTerm("")
        } else {
            setSearchTerm(searchTerm)
        }

        const filteredResult = allTitles.filter(title => {
            return (title.includes(searchTerm.toUpperCase()) || title.toUpperCase().includes(searchTerm.toUpperCase()))
        })

        const finalResult = filteredResult.slice(0, 5)

        setSearchResults(finalResult)

    }, [searchTerm])


    return (
        <div className='search_container'>
        <div className="search__bar">
            <input type="text" value={searchTerm} placeholder="&#x1F50E;&#xFE0E; Search Artsy..." onChange={(e)=>setSearchTerm(e.target.value)}></input>
        </div>
        <div id="search_results">
            {searchTerm && (
                <>
                {searchResults.map((title) => (
                    <>
                    {console.log("WOOO", Object.values(searchResults))}
                    {listings.map(listing => (
                        <>
                            { listing.title === title ?
                                <NavLink onClick={() => setSearchTerm("")} className="test" to={`/browse/${listing.id}`}> {title} </NavLink>
                            :null }
                        </>
                    ))}
                    </>
                    ))}
                </>
            )}
        </div>
        </div>
    )
}

export default SearchBar;
