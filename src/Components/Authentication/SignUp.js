import React,{useRef, useState} from 'react'
import {useAuth} from '../../Context/AuthContext'
import { Link , useHistory} from "react-router-dom";
import './Authentication.css';

function SignUp() {

    const emailRef=useRef();
    const passwordRef=useRef();
    const passwordConfirmRef=useRef();
    // The signup function is the useAuth itself
    const {signup}= useAuth()
    const [error, setError]= useState('')
    const [loading, setLoading] = useState(false)
    const history=useHistory();

    async function handleSubmit(e){
        e.preventDefault();

        if(passwordRef.current.value !== passwordConfirmRef.current.value){
            return setError('Passwords donot match')
        }
        
        try{ 
            setError('')
            setLoading(true)
            await signup(emailRef.current.value,passwordRef.current.value)
            history.push('/')
        }catch(e){
            setError('Failed to create an account.')
            console.log(e)
        }

        setLoading(false)
    }


    return (
        <div className='container'>
            <div className="main">
                <form onSubmit={handleSubmit}>
                    <div className="card">
                        <h1>Sign Up</h1>
                        {error && <p className='notify'>{error}</p>}
                        <h3>Enter Email</h3>
                        <input type="mail" placeholder='Enter ypur email' ref={emailRef} required />
                        <h3>Enter Password</h3>
                        <input type="password" placeholder='Enter atleast 6 digits' ref={passwordRef} required/>
                        <h3>Confirm Password</h3>
                        <input type="password" placeholder='Enter atleast 6 digits' ref={passwordConfirmRef} required/>
                        <br/>
                        <button disabled={loading} className='submit' type="submit">Sign Up</button>
                    </div>
                </form>
                <div className="account">
                    Already have Account? <Link className='link' to='/login'>Login</Link>
                </div>
            </div>
        </div>
    )
}

export default SignUp
