import React from 'react';
import { useState } from 'react';
import { FaUserAstronaut } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import ProfileEditModal from './ProfileEditModal'
import './ProfilePage.css';



function ProfileDisplay({ setShowModal }) {
    const user = useSelector(state => state.session.user)
    const [showMore, setShowMore] = useState(false);


    const text = "Art in a period of widely-perceived global crisis can never be the same as art in more stable times. Placid ripples of lake water on canvas may reflect the deadly poison of factory waste. A photograph of a family dinner may convey messages about the millions for whom half an egg is a mere fantasy. A tender voice singing a lullaby may compel us to remember the massive nuclear attack that could occur at any moment. Artists need audiences. More fundamentally, artists need people to love and be loved by in turn. Artists need landscapes, dreams, and ideas. Just like other beings, artists need earth to stand on, water to drink, and air to breathe. Artists need the world; without the world there can be no art, no artist. Thus global survival is the primary issue for artists, just as it is for all other human beings. We could try to ignore the terrifying situation in which we have been living since the onset of the nuclear arms race. We could try to regard art as separate from our political concerns. We could try to deny art as a tool for social change. Art could remain innocently pleasing. But we cannot, in the end, escape from reality; we need to put out messages of our utmost concern to those we care for. Many artists have started working with global awareness, and I feel encouraged by being a part of an invisible community of socially engaged artists."


    return (
            <div className='outer__container'>
                <div className='top__container'>
                    <div className='profile__pic__container'>
                        <div>
                        {/* <img className='profile__pic' src="https://www.kindpng.com/picc/m/163-1634256_stonks-meme-transparent-hd-png-download.png"></img> */}
                            <FaUserAstronaut className='profile__pic' />
                            {/* <FaPlusCircle className='change__profile__pic' /> */}
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
                {/* <img className='image__container' src={"images/astronaut_background.png"}></img> */}
                <div className='image__container'>

                </div>
                <div className='lower__container'>
                    <footer className='footer__text'>
                        {showMore ? text : `${text.substring(0, 539)}`}
                        <button className='showMoreLessbtn' onClick={() => setShowMore(!showMore)}>{showMore ? "Show less" : "...Show more"}</button>
                    </footer>
                </div>
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
