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
    const comments = Object.values(useSelector(state => state?.comments));

    const [commentId, setCommentId] = useState()
    const [body, setBody] = useState('');
    const [editCommentBody, setEditCommentBody] = useState("comments original body goes here")
    const [errors, setErrors] = useState([]);
    const [editErrors, setEditErrors] = useState([]);
    const [showEditForm, setShowEditForm] = useState(false)


    useEffect(() => {
        const validationErrors = [];
        const editValidationsErrors = [];

        if (body.length === 0) validationErrors.push("Cannot submit an empty comment");
        if (body.length < 15) validationErrors.push("Comment must be more than 15 characters");

        if (editCommentBody.length < 15) editValidationsErrors.push("Editing comment must be more than 15 characters");

        setErrors(validationErrors);
        setEditErrors(editValidationsErrors);

        dispatch(getListingComments(oneListing.id))

    }, [dispatch, body, oneListing.id, editCommentBody])


    const handleSubmitComment = async (e) => {
        e.preventDefault();
        dispatch(postComment(user_id, listingId, body))
        setBody('')
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
        setBody('')
    }

    const handleEditComment = async (e) => {
        e.preventDefault()

        await dispatch(editingComment(oneListing?.id, commentId, editCommentBody))
        await dispatch(getListingComments(oneListing?.id))

        setShowEditForm(false)
    }

    const handleDeleteComment = async (commentId) => {

        await dispatch(deleteComment(commentId, editCommentBody))
        await dispatch(getListingComments(oneListing?.id))
    }

    return (
        <>
            <div className='comment_submission_box'>
                <p style={{fontFamily: "sans-serif"}}>Leave a Comment</p>
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
                <div className='comment__errors'>
                            {errors.map((error) => (
                                <li style={{ color: "red" }} key={error}>{error}</li>
                            ))}
                </div>
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
                                <button type="submit" onClick={handleEditComment} disabled={editErrors.length > 0}>Submit</button>
                                <button type="submit" onClick={handleCancelEditCommentForm}>Cancel</button>
                            </div>
                        </div>
                        <div className='comment__errors'>
                            {editErrors.map((error) => (
                                <li style={{ color: "red" }} key={error}>{error}</li>
                            ))}
                        </div>
                    </>
                )}
            </div>
            <div>
                {comments.map(comment => (
                    <div>
                        <h3>{comment.username}</h3>
                        <div className='' style={{ border: "1px grey solid", padding: "25px", width: "100%", height: "60%" }}>
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
                                setCommentId(comment?.id)
                                handleEditCommentForm(comment?.id)
                                setEditCommentBody(comment?.body)
                            }}>edit</button> : null}
                        {comment.user_id == user.id ? <button onClick={() => {
                            handleDeleteComment(comment?.id)
                        }}>delete</button> : null}
                    </div>
                ))}
            </div>
        </>
    )
}

export default LoadedComments;
