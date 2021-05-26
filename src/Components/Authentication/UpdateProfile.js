import React,{useRef, useState} from 'react'
import {useAuth} from '../../Context/AuthContext'
import { Link , useHistory} from "react-router-dom";


function UpdateProfile() {

    const emailRef=useRef();
    const passwordRef=useRef();
    const passwordConfirmRef=useRef();
    // The signup function is the useAuth itself
    const {currentUser, updateEmail, updatePassword}= useAuth()
    const [error, setError]= useState('')
    const [loading, setLoading] = useState(false)
    const history=useHistory();

    function handleSubmit(e){
        e.preventDefault();

        if(passwordRef.current.value !== passwordConfirmRef.current.value){
            return setError('Passwords donot match')
        }

        const promises=[]
        setError('')
        setLoading(true)
        if(emailRef.current.value!==currentUser.email){
            promises.push(updateEmail(emailRef.current.value))
        }
        if(passwordRef.current.value){
            promises.push(updatePassword(passwordRef.current.value))
        }
        Promise.all(promises).then(()=>{
            history.push('/user');
        }).catch(()=>{
            setError('Failed to update the account.')
        }).finally(()=>{
            setLoading(false)
        })
    }


    return (
        <div className='container'>
            <div className="main">
                <form onSubmit={handleSubmit}>
                    <div className="card">
                        <h1>Update Profile</h1>
                        {error && <h2>{error}</h2>}
                        <h3>Email</h3>
                        <input type="mail" ref={emailRef} defaultValue={currentUser.email}/>
                        <h3>Password</h3>
                        <input type="password" name="" id="" ref={passwordRef} placeholder='Leave blank to keep the same' />
                        <h3>Confirm Password</h3>
                        <input type="password" name="" id="" ref={passwordConfirmRef} placeholder='Leave blank to keep the same' />
                        <br/>
                        <button className='submit' disabled={loading} type="submit">Update</button>
                    </div>
                </form>
                <div className="account">
                    Want to<Link className='link' to='/user'> Go Back </Link>?
                </div>
            </div>
        </div>
    )
}

export default UpdateProfile
