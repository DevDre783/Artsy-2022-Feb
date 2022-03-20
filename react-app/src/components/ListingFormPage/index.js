import React from 'react';
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect, useHistory, useParams } from 'react-router-dom';
import { postListing } from '../../store/listing';
import './ListingForm.css'


function ListingFormPage () {
    const dispatch = useDispatch('');
    const history = useHistory('');
    // Art Listings
    const [title, setTitle] = useState('');
    const [url, setUrl] = useState('');
    const [description, setDescription] = useState('');
    // Errors
    const [errors, setErrors] = useState([]);
    const user = useSelector(state => state?.session?.user);
    const user_id = user.id

    useEffect(() => {
        const validationErrors = [];

        if (title.length < 8) validationErrors.push("Must provide a title longer than 5 characters for your listing.");
        if (description.length === 0) validationErrors.push("Please provide a brief description for your listing.")
        if (description.length < 25) validationErrors.push("Description is too short. Please provide some more detail.")
        if (!url.includes("http") || !url.includes("https")) validationErrors.push("MUST provide at least one VALID photo for your listing (https).")

        setErrors(validationErrors);

    }, [title, url, description]);


    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(postListing(user_id, title, url, description))
        history.push("/browse")
    };

    return (
        <>
        <div className='background__image'>
        <img className='background__image' src='https://hdwallpaperim.com/wp-content/uploads/2017/08/25/463034-men-simple_background-digital_art-graffiti-clouds-minimalism-white_background.jpg'></img>
        </div>
            <div className="form__container1">
                <form className="the__form" onSubmit={handleSubmit}>
                    <div className="main__info">
                        <h1 className='form__header'>Share your work!</h1>
                        <div className='title__input__container'>
                        <input
                        className='title__input'
                            type='text'
                            placeholder="Title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        </div>
                        <div className='image__input__container'>
                        <input
                            className='image__input'
                            type='string'
                            placeholder="Image url"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                        />
                        </div>
                        <div className='description__input__container'>
                        <textarea
                        className='description__input'
                        style={{resize: "none"}}
                        rows="6"
                        cols="40"
                        type='text'
                        placeholder="Description"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        />
                        </div>
                        <button
                            className="form-submit"
                            disabled={errors.length > 0}
                            type="submit">Submit
                        </button>
                        <Link to={`/browse`}>
                            <button className="form-cancel">Cancel</button>
                        </Link>
                    </div>
                </form>
            </div>
            <div style={{marginLeft: "40.3%"}}>
                <ul style={{listStyle: "none"}} className="listingForm__errors">
                    {errors.map(error => (
                        <li key={error}>{error}</li>
                        ))}
                </ul>
            </div>
        </>
    )
}

export default ListingFormPage;
