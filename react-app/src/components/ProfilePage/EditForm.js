import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { handleEdit } from '../../store/session';
import * as sessionActions from "../../store/session"
import ProfileDisplay from '.';
import { Redirect } from 'react-router-dom';


const EditForm = ({ setShowModal }) => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)
    const username = user.username

    const[name, setName] = useState(username)
    // const [showModal, setShowModal] = useState(prop);

    useEffect(() => {
    }, [name])

    const handleSubmit = async (e) => {
      e.preventDefault()
      let id = user.id
      await dispatch(handleEdit(name, id))

      setShowModal(false)
    }

  return (
    <form>
      <h2 style={{marginLeft: "55.5%"}} className='editNicknameHeader'>Nickname</h2>
      <div style={{marginLeft: "71%"}}>
      <input className='username__input' type='text'
      value={name}
      placeholder='Enter new username..'
      onChange={(e) => setName(e.target.value)}
      ></input>
      </div>
      <button style={{marginLeft: "89.5%", marginTop: "15%"}} onClick={handleSubmit} className='submit__edit__form'>Submit</button>
      <button style={{marginLeft: "93%", marginTop: "10%"}} className='submit__edit__form' onClick={() => setShowModal(false)}>close</button>
    </form>
  )
}

export default EditForm;

// username
// color pallete to theme to be changed
