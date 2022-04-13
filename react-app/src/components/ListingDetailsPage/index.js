import React from 'react';
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect, useHistory, useParams } from 'react-router-dom';
import { getListingComments } from '../../store/comment';
import { deleteListings, editingListing, getListings, getOneListing, postListing } from '../../store/listing';
import LoadedComments from '../LoadedComments';
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import './ListingDetails.css'
import StarRating from '../StarRating';


function ListingDetailsPage() {
    const { listingId } = useParams();
    const user = useSelector(state => state.session.user)
    const oneListing = useSelector(state => state?.main_listings[listingId]);
    const [editListingTitle, setEditListingTitle] = useState(oneListing?.title)
    const [errors, setErrors] = useState([]);
    const [showEditForm, setShowEditForm] = useState(false)

    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        const listingTitleValidation = [];

        if(editListingTitle?.length < 5) listingTitleValidation.push("Title must be longer than 5 characters");
        if(editListingTitle?.length > 40) listingTitleValidation.push("Title cannot be longer than 40 characters");

        setErrors(listingTitleValidation);

        dispatch(getOneListing(listingId))

    }, [dispatch, listingId, editListingTitle])

    // const handleSubmitComment = async (e) => {
    //     e.preventDefault();
    //     dispatch(postComment(user_id, listingId, body))
    //     // history.push(`/browse/${listingId}`)
    // };

    const handleEditListingForm = (e) => {
        e.preventDefault()

        if (!showEditForm) {
            setShowEditForm(true)
        } else {
            setShowEditForm(false)
        }
    }

    const handleEditListing = async () => {
        // e.preventDefault()

        await dispatch(editingListing(listingId, editListingTitle))
        await dispatch(getOneListing(listingId))

        setShowEditForm(false)
    }

    const handleDeleteListing = async () => {
        history.push('/browse')
        await dispatch(deleteListings(oneListing.id))
    }

    // if (!oneListing) {
    //     return <Redirect to={`/browse/${listingId}`}/>
    // }

    const handleBrokenImg= (e) => {
        e.target.src = "https://bitsofco.de/content/images/2018/12/broken-1.png"
    }

    return (
        <div className='details__container'>
            {oneListing?.id == listingId ?
                <div className='listing__content'>
                    <img src={oneListing.url} onError={handleBrokenImg}></img>
                    <div className='detail__titleAndEditBtn'>
                    <StarRating />
                        <h2 className='title__header'>{oneListing.title }{user.id == oneListing.user_id ? <button className='edit__btn' onClick={handleEditListingForm} disabled={errors.length > 0}><FaEdit/></button> : null}
                            {user.id == oneListing.user_id ? <button className='delete__btn' onClick={handleDeleteListing}><FaTrashAlt/></button> : null}
                        </h2>
                        <p>{oneListing.username}</p>
                        {showEditForm && (
                            <>
                                <div className='edit__listing'>
                                    <div className='edit__listing'>
                                        <input
                                            type="text"
                                            name="edit-listing"
                                            value={editListingTitle}
                                            onChange={(e) => setEditListingTitle(e.target.value)}
                                            placeholder="Edit Listing title..."
                                            />
                                        <button disabled={errors.length > 0} className='edit__submitBtn' type="submit" onClick={() => handleEditListing(editListingTitle)}>Submit</button>
                                    </div>
                                </div>
                                <div className='editTitle__errors'>
                                    {errors.map((error) => (
                                        <li style={{ color: "red" }} key={error}>{error}</li>
                                    ))}
                                </div>
                            </>
                        )}
                    </div>
                </div>
            : null}
            <div className='description__area'>
                <p className='note__header'>Note:</p><p className='description__p'>{oneListing?.description}</p>
            </div>
            <div>
                <h1 style={{marginTop: "3%", marginBottom: "1%"}} className='comments__heading'>Comments</h1>
                <div className='comments__container' style={{ border: "1px grey solid", padding: "25px", width: "40%", height: "60%" }}>
                    <LoadedComments listingId={oneListing?.id} userId={user?.id} oneListing={oneListing}/>
                </div>
            </div>
        </div>
    )
}

export default ListingDetailsPage;
