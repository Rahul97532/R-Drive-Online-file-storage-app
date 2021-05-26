import React,{useState} from 'react'
import {useAuth} from '../Context/AuthContext'
import {Link, useHistory} from 'react-router-dom'
function Dashboard() {
    const [error,setError]=useState('');
    const {currentUser, logout}=useAuth();
    const history=useHistory();
    async function handleLogout(){
        console.log('Hello');
        setError('')
        try{
            await logout()
            history.push('/login')
        }catch{
            setError('Failed to logout')
        }
    }
    return (
        <div>
            <div className="main">
                <h1>Profile</h1>
                {error}
                <strong>Email:</strong> {currentUser.email}
                <h3><Link to='/update-profile' >Update Profile</Link></h3>
                <button onClick={handleLogout}>Log Out</button>
            </div>
        </div>
    )
}

export default Dashboard
