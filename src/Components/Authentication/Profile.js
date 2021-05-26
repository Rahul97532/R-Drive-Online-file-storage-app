import React, { useState } from "react";
import { useAuth } from "../../Context/AuthContext";
import { Link, useHistory } from "react-router-dom";
function Profile() {
  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();
  const history = useHistory();
  async function handleLogout() {
    console.log("Hello");
    setError("");
    try {
      await logout();
      history.push("/login");
    } catch {
      setError("Failed to logout");
    }
  }
  return (
    <div className="container">
      <div className="main">
        <form>
          <h1 className="Profile">Profile</h1>
          {error}
          <h4>
            <strong>Email:</strong> {currentUser.email}
          </h4>
          <h3>
            <Link className="link" to="/update-profile">
              Update Profile
            </Link>
          </h3>
          <button className="submit" onClick={handleLogout}>
            Log Out
          </button>
        </form>
        <div className="account">
          Go back to{" "}
          <Link to="/" className="link">
            Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Profile;
