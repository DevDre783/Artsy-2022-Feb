import React from 'react';
import { useState, useEffect } from 'react';
import { FaUserAstronaut } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getListings } from '../../store/listing';
import ProfileEditModal from './ProfileEditModal'
import './ProfilePage.css';



function ProfileDisplay({ setShowModal }) {
    const dispatch = useDispatch();
    const defaultValue = "black"
    const user = useSelector(state => state.session.user)
    const listings = Object.values(useSelector(state => state?.main_listings))
    const [color, setColor] = useState(localStorage.getItem("color"));
    // const [state, setState] = useState(localStorage.getItem(color))
    const [showMore, setShowMore] = useState(false);

    useEffect(() => {
        dispatch(getListings(listings))
        // localStorage.setItem(color, state)
    }, [])

    const handleBrokenImg = (e) => {
        e.target.src = "https://bitsofco.de/content/images/2018/12/broken-1.png"
    }

    const text = "Art in a period of widely-perceived global crisis can never be the same as art in more stable times. Placid ripples of lake water on canvas may reflect the deadly poison of factory waste. A photograph of a family dinner may convey messages about the millions for whom half an egg is a mere fantasy. A tender voice singing a lullaby may compel us to remember the massive nuclear attack that could occur at any moment. Artists need audiences. More fundamentally, artists need people to love and be loved by in turn. Artists need landscapes, dreams, and ideas. Just like other beings, artists need earth to stand on, water to drink, and air to breathe. Artists need the world; without the world there can be no art, no artist. Thus global survival is the primary issue for artists, just as it is for all other human beings. We could try to ignore the terrifying situation in which we have been living since the onset of the nuclear arms race. We could try to regard art as separate from our political concerns. We could try to deny art as a tool for social change. Art could remain innocently pleasing. But we cannot, in the end, escape from reality; we need to put out messages of our utmost concern to those we care for. Many artists have started working with global awareness, and I feel encouraged by being a part of an invisible community of socially engaged artists."


    return (
        <div className='outer__container'>
            <div className='top__container'>
                <div className='profile__pic__container'>
                    <div>
                        <FaUserAstronaut className='profile__pic' color={color} />
                    </div>
                    <div id='change__theme__container'>
                      <div className='color__palette'>
                        <div className='color1__container'>
                          <button onClick={() => {
                              setColor("rgb(30, 30, 218)")
                              localStorage.setItem("color", "rgb(30, 30, 218)")}} id='theme__color__btn1' className='color1'></button>
                        </div>
                        <div  className='color2__container'>
                          <button onClick={() => {
                              setColor("rgb(0, 167, 0)")
                              localStorage.setItem("color", "rgb(0, 167, 0)")}} id='theme__color__btn2' className='color2'></button>
                        </div>
                        <div className='color3__container'>
                          <button onClick={() => {
                              setColor("rgb(223, 22, 206)")
                              localStorage.setItem("color", "rgb(223, 22, 206)")}} id='theme__color__btn3' className='color3'></button>
                        </div>
                        <div className='color4__container'>
                          <button onClick={() => {
                              setColor("rgb(235, 16, 16)")
                              localStorage.setItem("color", "rgb(235, 16, 16)")}} id='theme__color__btn4' className='color4'></button>
                        </div>
                        <div className='color5__container'>
                          <button onClick={() => {
                              setColor("rgb(219, 204, 41)")
                              localStorage.setItem("color", "rgb(219, 204, 41)")}} id='theme__color__btn5' className='color5'></button>
                        </div>
                      </div>
                    </div>
                </div>
                <div className='user__info__display'>
                    <div className='username__display'>
                        <h3 onChange={e => (e.target.value)}>Welcome, {user.username}</h3>
                    </div>
                    <div className='email__display'>
                        <p>{user.email}</p>
                    </div>
                </div>
                <div className='edit__profile__container'>
                    <ProfileEditModal />
                </div>
            </div>
            <div className='container'>
                {listings.map(listing => (
                    <>
                        {listing?.user_id === user?.id ?
                            <div className='' key={listing?.id}>
                                <h1 key={listing?.id1} className='the__title'>{listing?.title}</h1>
                                <Link key={`${listing?.id1}`} id='image__holder' to={`/browse/${listing?.id}`}>
                                    <img onError={handleBrokenImg} key={listing?.id1} src={listing?.url} className="the__image"></img>
                                </Link>
                            </div>
                            : null}
                    </>
                ))}
            </div>
            {/* <div className='lower__container'>
                <footer className='footer__text'>
                    {showMore ? text : `${text.substring(0, 539)}`}
                    <button className='showMoreLessbtn' onClick={() => setShowMore(!showMore)}>{showMore ? "Show less" : "...Show more"}</button>
                </footer>
            </div> */}
        </div>
    )
}

export default ProfileDisplay;



// import React, { useState } from 'react';
// import { Modal } from '../../../Context/Modal';
// import LoginForm from './LoginForm';
// import './index.css'

// function LoginFormModal({ prop = false }) {
//     const [showModal, setShowModal] = useState(prop);

//     const hideButtonStyle = {
//         display: 'none',
//     }

//     return (
//         <>
//             <button
//                 className='auth-button'
//                 onClick={() => setShowModal(true)}
//                 style={prop ? hideButtonStyle : null}
//             >
//                 Sign In
//             </button>
//             {showModal && (
//                 <Modal onClose={() => setShowModal(false)}>
//                     <LoginForm />
//                 </Modal>
//             )}
//         </>
//     );
// }
// dsaf

// export default LoginFormModal;
