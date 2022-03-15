import React from 'react';
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect, useHistory, useParams } from 'react-router-dom';
import { getOneListing, postListing } from '../../store/listing';


function ListingDetailsPage() {
    const {listingId} = useParams();
    const user = useSelector(state => state.session.user)
    const oneListing = useSelector(state => state?.main_listings?.main_listings[listingId - 1]);

    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        dispatch(getOneListing(listingId))
    }, [dispatch, listingId])

    return (
        <>
        {oneListing.id == listingId ?
            <div className='listing__content'>
                <img src={oneListing.url}></img>
                <button>edit</button><button>delete</button>
                <h2>{oneListing.title}</h2><h3>Owned By: {user.username}</h3>
                <p>{oneListing.description}</p>
            </div>
        :null}
        <div className='comment_submission_box'>
            <p>Comments</p>
            <textarea>

            </textarea>
        </div>
        <div className='comments__container'>
            {/* Comments go here from db */}
        </div>
        </>
    )
}

export default ListingDetailsPage;
