import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Link, NavLink, useParams} from 'react-router-dom'
import { getListings, getOneListing } from '../../store/listing';
import "./SearchBar.css"


function SearchBar() {
    const dispatch = useDispatch();
    const listings = Object.values(useSelector(state => state?.main_listings));
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    const allTitles = listings.map(listing => {
        return listing.title;
    })

    useEffect(() => {

        if (searchTerm === ""){
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
            <input type="text" value={searchTerm} placeholder="Search Arsty.." onChange={(e)=>setSearchTerm(e.target.value)}></input>
        </div>
        <div id="search_results">
            {searchTerm && (
                <>
                {searchResults.map((title) => (
                    <>
                    {console.log("WOOO", Object.values(searchResults))}
                        <NavLink onClick={() => setSearchTerm("")} className="test" to={`/browse/${title[0]}`}> {title} </NavLink>
                    </>
                    ))}
                </>
            )}
        </div>
        </div>
    )
}

export default SearchBar;
