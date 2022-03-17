import React from 'react';
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect, useHistory, useParams } from 'react-router-dom';
import { editingComment, getListingComments, postComment } from '../../store/comment';


function LoadedComments({ listingId, userId }) {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user);
    const user_id = user.id
    const oneComment = useSelector(state => state?.comments[listingId]);
    // console.log("FROM LOADED COMMENTS", oneComment)
    const [body, setBody] = useState('');
    const comments = Object.values(useSelector(state => state?.comments));
    const [editCommentBody, setEditCommentBody] = useState('')
    const [errors, setErrors] = useState([]);
    const [showEditForm, setShowEditForm] = useState(false)

    useEffect(() => {
        const validationErrors = [];

        if (body.length < 15) validationErrors.push("Must provide a title longer than 5 characters for your listing.");

        setErrors(validationErrors);

        dispatch(getListingComments(listingId))
    }, [body])


    const handleSubmitComment = async (e) => {
        e.preventDefault();
        dispatch(postComment(user_id, listingId, body))
        setBody('')
        // history.push(`/browse/${listingId}`)
    };

    const handleEditCommentForm = (e) => {
        e.preventDefault()

        if (!showEditForm) {
            setShowEditForm(true)
        } else {
            setShowEditForm(false)
        }
    }

    const handleEditComment = async (e) => {
        e.preventDefault()
        const editComment_errors = [];

        if (editCommentBody.length <= 0) editComment_errors.push(<p style={{ color: "red" }}>Field must not be empty.</p>)
        if (editCommentBody.length <= 50) editComment_errors.push(<p style={{ color: "red" }}>Comment must be longer than 50 characters</p>)

        if (editComment_errors.length > 0) {
            setErrors(editComment_errors);
        }
        else {
            dispatch(editingComment(listingId, editCommentBody))
            setShowEditForm(false)
        }
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
                {showEditForm && (
                            <>
                                <div className='edit__comment'>
                                    <div className='edit__comment'>
                                        <textarea
                                            type="text"
                                            name="edit-comment"
                                            value={editCommentBody}
                                            onChange={(e) => setEditCommentBody(e.target.value)}
                                            placeholder="Edit comment..."
                                        />
                                        <button type="submit" onClick={handleEditComment} disabled={errors.length > 0}>Submit</button>
                                    </div>
                                </div>
                                <div className='profile__errors'>
                                    {errors.map((error) => (
                                        <li style={{ color: "white" }} key={error}>{error}</li>
                                    ))}
                                </div>
                            </>
                        )}
                <button onClick={handleSubmitComment}
                    // disabled={errors.length > 0}
                    type="submit"
                >Submit
                </button>
                <button>Clear</button>
            </div>
            <div>
                {comments.map(comment => (
                    <div>
                        {comment.user_id == userId ? <h3>{user.username}</h3> : null}
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
                        {comment.user_id == user.id ? <button style={{marginBottom: "5%", marginTop: "1%"}} onClick={handleEditCommentForm}>edit</button> : null}
                        {comment.user_id == user.id ? <button>delete</button> : null}
                    </div>
                ))}
            </div>
        </>
    )
}

export default LoadedComments;
