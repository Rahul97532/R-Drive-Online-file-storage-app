import React,{useRef, useState} from 'react'
import {useAuth} from '../../Context/AuthContext'
import { Link } from "react-router-dom";


function Login() {

    const emailRef=useRef();
    // The signup function is the useAuth itself
    const {passwordReset}= useAuth()
    const [error, setError]= useState('')
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState('')


    async function handleSubmit(e){
        e.preventDefault();

        try{ 
            setMessage('')
            setError('')
            setLoading(true)
            await passwordReset(emailRef.current.value)
            setMessage('Check your email for further instructions')
        }catch{
            setError('Failed to reset password.')
        }

        setLoading(false)
    }


    return (
        <div className='container'>
            <div className="main">
                <form onSubmit={handleSubmit}>
                    <div className="card">
                        <h1>Password Reset</h1>
                        {error && <p  className='notify'>{error}</p>}
                        {message && <p className='message'>{message}</p>}
                        {/* <p className='message'>Hello</p> */}
                        <h3>Enter Email</h3>
                        <input type="mail" ref={emailRef} />
                        <br/>
                        <button className='submit' disabled={loading} type="submit">Reset</button>
                    </div>
                </form>
                <div className="account">
                    Back to <Link className='link' to='/login' >Log In</Link>
                </div>
                <div className="account">
                    Need an Account? <Link className='link' to='/signup'>Sign Up</Link>
                </div>
                
            </div>
        </div>
    )
}

export default Login
