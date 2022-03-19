import React from 'react';
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers } from "../../store/user"
import { Link, Redirect, useHistory, useParams } from 'react-router-dom';
import { deleteComment, editingComment, getListingComments, postComment } from '../../store/comment';


function LoadedComments({ listingId, oneListing }) {
    const dispatch = useDispatch();

    const user = useSelector(state => state.session.user);
    const user_id = user.id
    const [commentId, setCommentId] = useState()

    const [body, setBody] = useState('');
    const comments = Object.values(useSelector(state => state?.comments));
    const commentIds = Object.keys(useSelector(state => state.comments))
    // console.log("FROM LOADED COMMENTS", commentIds)
    const [editCommentBody, setEditCommentBody] = useState("comments original body goes here")
    const [errors, setErrors] = useState([]);
    const [showEditForm, setShowEditForm] = useState(false)

    // const commentIds = comments.map(comment => {
    //     return comment.id
    // })

    useEffect(() => {
        const validationErrors = [];

        if (body.length === 0) validationErrors.push("Cannot submit an empty comment");

        setErrors(validationErrors);

        dispatch(getListingComments(listingId))
        // dispatch(getAllUsers())
    }, [dispatch, body])


    const handleSubmitComment = async (e) => {
        e.preventDefault();
        dispatch(postComment(user_id, listingId, body))
        setBody('')
        // history.push(`/browse/${listingId}`)
    };

    const handleEditCommentForm = () => {

        if (!showEditForm) {
            setShowEditForm(true)
        }

    }

    const handleCancelEditCommentForm = () => {
        setShowEditForm(false)
    }

    const handleClearComment = () => {
        setBody("")
    }

    const handleEditComment = async (e) => {
        e.preventDefault()
        console.log("FROM HANDLE EDIT", commentId)
        dispatch(editingComment(oneListing.id, commentId, editCommentBody))
        // console.log("FROM HANDLE EDIT", comments[oneListing.id].listing_id)
        dispatch(getListingComments(listingId))
        setShowEditForm(false)
    }

    const handleDeleteComment = () => {

        // dispatch(deleteComment(commentId, editCommentBody))
        // console.log("FROM HANDLE DELETE", commentId)
    }

    return (
        <>
            <div className='comment_submission_box'>
                <p>Leave a Comment</p>
                <textarea
                    style={{ resize: "none" }}
                    rows="6"
                    cols="70"
                    type='text'
                    placeholder="Leave a comment..."
                    value={body}
                    onChange={e => setBody(e.target.value)}
                />
                        <button onClick={handleSubmitComment}
                            disabled={errors.length > 0}
                            type="submit"
                        >Submit
                        </button>
                        <button onClick={handleClearComment}>Clear</button>
                {showEditForm && (
                    <>
                        <div className='edit__comment'>
                            <div className='edit__comment'>
                                <textarea
                                    style={{ resize: "none" }}
                                    rows="6"
                                    cols="70"
                                    type="text"
                                    name="edit-comment"
                                    value={editCommentBody}
                                    onChange={(e) => setEditCommentBody(e.target.value)}
                                    placeholder="Edit comment..."
                                />
                                <button type="submit" onClick={handleEditComment}>Submit</button>
                                <button type="submit" onClick={handleCancelEditCommentForm}>Cancel</button>
                            </div>
                        </div>
                        {/* <div className='profile__errors'>
                            {errors.map((error) => (
                                <li style={{ color: "red" }} key={error}>{error}</li>
                            ))}
                        </div> */}
                    </>
                )}
            </div>
            <div>
                {comments.map(comment => (
                    <div>
                        <h3>{comment.username}</h3>
                        <div className='' style={{ border: "2px black solid", padding: "25px", width: "100%", height: "60%" }}>
                            <p key={comment.id}>{comment.body}</p>
                        </div>

                        {/* {showEditForm && (
                            <>
                                <div className='edit__comment'>
                                    <div className='edit__comment'>
                                        <textarea
                                            type="text"
                                            name="edit-comment"
                                            value={editCommentBody}
                                            onChange={(e) => setEditCommentBody(e.target.value)}
                                            placeholder="Edit Title..."
                                        />
                                        <button type="submit" onClick={handleEditComment}>Submit</button>
                                    </div>
                                </div>
                                <div className='profile__errors'>
                                    {errors.map((error) => (
                                        <li style={{ color: "white" }} key={error}>{error}</li>
                                    ))}
                                </div>
                            </>
                        )} */}
                        {comment.user_id == user.id ? <button
                            style={{ marginBottom: "5%", marginTop: "1%" }}
                            onClick={ () => {
                                setCommentId(comment.id)
                                handleEditCommentForm()
                                setEditCommentBody(comment.body)
                            }}>edit</button> : null}
                        {comment.user_id == user.id ? <button onClick={() => {
                            setCommentId(comment.id)
                            handleDeleteComment()
                        }}>delete</button> : null}
                    </div>
                ))}
            </div>
        </>
    )
}

export default LoadedComments;
