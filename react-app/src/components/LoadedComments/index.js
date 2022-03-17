import React from 'react';
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect, useHistory, useParams } from 'react-router-dom';
import { getListingComments } from '../../store/comment';


function LoadedComments ({ listingId }) {
    const dispatch = useDispatch();
    const comments = Object.values(useSelector(state => state?.comments));
    
    useEffect(() => {
        console.log(listingId)
        dispatch(getListingComments(listingId))
    }, [])

    return (
        <>
            {comments.map(comment => (
                <p>{comment.body}</p>
            ))}
        </>
    )
}

export default LoadedComments;
