import React,{useRef, useState} from 'react'
import {useAuth} from '../../Context/AuthContext'
import { Link , useHistory} from "react-router-dom";
import './Authentication.css'

function Login() {

    const emailRef=useRef();
    const passwordRef=useRef();
    // The signup function is the useAuth itself
    const {login}= useAuth()
    const [error, setError]= useState('')
    const [loading, setLoading] = useState(false)
    const history=useHistory();


    async function handleSubmit(e){
        e.preventDefault();

        try{ 
            setError('')
            setLoading(true)
            await login(emailRef.current.value,passwordRef.current.value)
            history.push('/')
        }catch(e){
            setError('Failed to login.')
            console.log(e)
        }

        setLoading(false)
    }


    return (
        <div className='container'>
            <div className="main">
                <form onSubmit={handleSubmit}>
                    <div className="card">
                        <h1>Log In</h1>
                        {error && <p className='notify'>{error}</p>}
                        <h3>Enter Email</h3>
                        <input type="mail" ref={emailRef} />
                        <h3>Enter Password</h3>
                        <input type="password" name="" id="" ref={passwordRef} />
                        <div className="forgot_password">
                            <p><Link to='/forgot-password' className='link' >Forgot Password ?</Link></p>
                        </div>
                        <br/>
                        <button disabled={loading} type="submit"  className='submit'>Log In</button>
                    </div>
                </form>
                
                <div className="account">
                    Need an Account? <Link to='/signup' className='link'>Sign Up</Link>
                </div>
                
            </div>
        </div>
    )
}

export default Login
