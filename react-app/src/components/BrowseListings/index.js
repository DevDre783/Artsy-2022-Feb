import React from 'react';
import './BrowseListings.css';
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect, useHistory, useParams } from 'react-router-dom';
import { getListings } from '../../store/listing';

function BrowseListings() {
    const dispatch = useDispatch();
    const listings = Object.values(useSelector(state => state?.main_listings))
    // console.log("LISTINGS", listings)


    useEffect(() => {
        dispatch(getListings(listings))
    }, [dispatch])

    const handleBrokenImg= (e) => {
        e.target.src = "https://bitsofco.de/content/images/2018/12/broken-1.png"
    }

    return (
        <>
            <div className='heading__image'>
                <img className='image' src="https://wallpaperaccess.com/full/4847463.jpg"></img>
            </div>
            <div>
                <h1 className='header'>Gallery</h1>
            </div>
            <div className='page__container'>
                <div className='listings__container'>
                    {listings?.map(listing => (
                        <div className='listing__container' key={listing?.id}>
                            <h1 key={listing?.id1} className='listing__title'>{listing?.title}</h1>
                            <Link key={`${listing?.id1}`} id='listingImgLink' className="listingImage" to={`/browse/${listing.id}`}>
                                <img key={listing?.id1} src={listing?.url} onError={handleBrokenImg} className="individual__listing"></img>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default BrowseListings;
