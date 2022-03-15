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
        dispatch(postListing(title, url, description))

    };

    return (
        <>
            <div>
                <ul className="hostForm__errors">
                    {errors.map(error => (
                        <li key={error}>{error}</li>
                        ))}
                </ul>
            </div>
            <div className="form__container">
                <form className="the__form" onSubmit={handleSubmit}>
                    <div className="main__info">
                        <h1>Share your Art!</h1>
                        Title<input
                            type='text'
                            placeholder="Title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        Image<input
                            type='string'
                            placeholder="Image url"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                        />
                        Description<textarea
                        style={{resize: "none"}}
                        rows="6"
                        cols="40"
                        type='text'
                        placeholder="Description"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        />
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
        </>
    )
}

export default ListingFormPage;
