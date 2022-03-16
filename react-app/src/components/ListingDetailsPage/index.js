import React from 'react';
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect, useHistory, useParams } from 'react-router-dom';
import { editingListing, getOneListing, postListing } from '../../store/listing';
import './ListingDetails.css'


function ListingDetailsPage() {
    const { listingId } = useParams();
    const user = useSelector(state => state.session.user)
    const oneListing = useSelector(state => state?.main_listings?.main_listings[listingId - 1]);
    const [editListingTitle, setEditListingTitle] = useState(oneListing?.title)
    const [errors, setErrors] = useState([]);
    const [showEditForm, setShowEditForm] = useState(false)

    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        dispatch(getOneListing(listingId))
    }, [dispatch, listingId])

    const handleEditListingForm = (e) => {
        e.preventDefault()

        if (!showEditForm) {
            setShowEditForm(true)
        } else {
            setShowEditForm(false)
        }
    }

    const handleEditListing = async (e) => {
        e.preventDefault()
        const editlisting_errors = [];

        if (editListingTitle.length <= 0) editlisting_errors.push(<p style={{color: "red"}}>Field must not be empty.</p>)

        if (editlisting_errors.length > 0) {
            setErrors(editlisting_errors);
        }
        else {
            dispatch(editingListing(listingId, editListingTitle))
            dispatch(getOneListing(listingId))

            setShowEditForm(false)
        }
        history.push(`/browse`)
    }

    return (
        <div className='details__container'>
            {oneListing.id == listingId ?
                <div className='listing__content'>
                    <img src={oneListing.url}></img>
                    <h2>{oneListing.title}</h2><h3>Owned By: {user.username}</h3>
                    {user.id == oneListing.user_id ? <button onClick={handleEditListingForm}>edit</button> : null}
                    {user.id == oneListing.user_id ? <button>delete</button> : null}
                    {showEditForm && (
                        <>
                            <div className='edit__listing'>
                                <div className='edit__listing'>
                                    <input
                                        type="text"
                                        name="edit-listing"
                                        value={editListingTitle}
                                        onChange={(e) => setEditListingTitle(e.target.value)}
                                        placeholder="Edit Title..."
                                    />
                                    <button type="submit" onClick={handleEditListing}>Submit</button>
                                </div>
                            </div>
                            <div className='profile__errors'>
                                {errors.map((error) => (
                                    <li style={{ color: "white" }} key={error}>{error}</li>
                                ))}
                            </div>
                        </>
                    )}
                    <p>{oneListing.description}</p>
                </div>
                : null}
            <div className='comment_submission_box'>
                <p>Leave a Comment</p>
                <textarea>

                </textarea>
                <button>Submit</button>
                <button>Clear</button>
            </div>
            <div>
                <p className='comments__heading'>Comments</p>
                <div className='comments__container' style={{ border: "2px black solid", padding: "25px", width: "40%", height: "60%" }}>
                    <h1>COMMENTS GO HERE FROM DB</h1>
                </div>
            </div>
        </div>
    )
}

export default ListingDetailsPage;
