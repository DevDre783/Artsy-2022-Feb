import React from 'react';
import './BrowseListings.css';
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory, useParams } from 'react-router-dom';
import { getListings } from '../../store/listing';

function BrowseListings() {
    const dispatch = useDispatch();
    const listings = useSelector(state => state?.main_listings?.main_listings)
    console.log("LISTINGS", listings)


    useEffect(() => {
        dispatch(getListings(listings))
    }, [])

    return (
        <div className='page__container'>
            <div>
                <h1 className='title'>LISTINGS</h1>
            </div>
            <div className='listings__container'>
                {listings?.map(listing => (
                    <div className='listing__container' key={listing?.id}>
                        <h1>{listing?.title}</h1>
                        <img src={listing.url} className="individual__listing"></img>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default BrowseListings;
