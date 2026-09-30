import { useEffect, useState } from "react";
import "../App.css";
import API from "../services/api";

function Profile() {

  const [user, setUser] = useState(null);

  useEffect(() => {
    const getProfile = async () => {
      try {
        const response = await API.get("/auth/profile");
        setUser(response.data.data);
      } catch (error) {
        console.error("Profile loading failed:", error);
      }
    };

    getProfile();
  }, []);

  return (
    <div className="dashboard">

      <h1>
        👤 Profile
      </h1>

      <div className="profile-card">

        <h2>
          User Information
        </h2>

        <p>
          Name: {user?.name}
        </p>

        <p>
          Email: {user?.email}
        </p>

      </div>

    </div>
  );
}
export default Profile;