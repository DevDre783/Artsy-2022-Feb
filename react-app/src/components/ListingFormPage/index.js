import React from 'react';
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect, useHistory, useParams } from 'react-router-dom';
import { addNewListing, postListing } from '../../store/listing';
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

    const [image, setImage] = useState('');
    const [imageLoading, setImageLoading] = useState(false);

    useEffect(() => {
        const validationErrors = [];

        if (title.length < 5) validationErrors.push("Must provide a title longer than 5 characters for your listing.");
        if (title?.length > 40) validationErrors.push("Title cannot be longer than 40 characters");
        if (description.length < 50) validationErrors.push("Description is too short. Please provide some more detail.")
        // if (image.length > 500) validationErrors.push("Url CANNOT be longer than 500 characters..")
        // if (!url.match(/\.(jpeg|jpg|gif|png)$/)) validationErrors.push("Not a Valid image (Must be jpeg, jpg, png)")

        setErrors(validationErrors);

    }, [title, url, description]);


    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("user_id", user_id);
        formData.append("url", image);
        formData.append("title", title);
        formData.append("description", description);
        console.log("HIIIII", Object.fromEntries(formData))

        // aws uploads can be a bit slow—displaying
        // some sort of loading message is a good idea
        setImageLoading(true);

        const res = await fetch('/api/browse/listing-form', {
            method: "POST",
            body: formData,
        });

        if (res.ok) {
            const newListing = await res.json();
            dispatch(addNewListing(newListing))
            history.push("/browse")
            setImageLoading(false);
        }
        else {
            setImageLoading(false);
            // a real app would probably use more advanced
            // error handling
            console.log("error");
        }

        // dispatch(postListing(user_id, title, image, description))
        // history.push("/browse")
    };

    const updateImage = (e) => {
        const file = e.target.files[0];
        setImage(file);
    }

    return (
        <>
        <div className='background__image'>
        <div className='errors__container' style={{marginLeft: "40.3%"}}>
                <ul className="listingForm__errors">
                    {errors.map(error => (
                        <li key={error}>{error}</li>
                        ))}
                </ul>
            </div>
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
                            name='image'
                            type='file'
                            placeholder="Image url"
                            accept='image/*'
                            onChange={updateImage}
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
                    {(imageLoading) && <p>Loading...</p>}
                </form>
            </div>
        </>
    )
}

export default ListingFormPage;
