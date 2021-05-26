import './App.css';
import SignUp from './Authentication/SignUp';
import AuthProvider from '../Context/AuthContext'
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Profile from './Authentication/Profile';
import Login from './Authentication/Login';
import PrivateRoute from './Authentication/PrivateRoute';
import ForgotPassword from './Authentication/ForgotPassword'
import UpdateProfile from './Authentication/UpdateProfile';
import Dashboard from './Google-Drive/Dashboard';
function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
        <Switch>
          <PrivateRoute exact path='/' component={Dashboard} />
          <PrivateRoute exact path='/folder/:folderId' component={Dashboard} />
          <PrivateRoute path='/user' component={Profile} />
          <PrivateRoute path='/update-profile' component={UpdateProfile} />
          <Route path='/signup' component={SignUp} />
          <Route path='/login' component={Login} />
          <Route path='/forgot-password' component={ForgotPassword} />
        </Switch>
        {/* <SignUp/> */}
        </AuthProvider>
      </BrowserRouter>
    </>
    
    // <SignUp/>

  );
}

export default App;
