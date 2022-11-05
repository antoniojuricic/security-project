import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";

const Profile = () => {
  const { id } = useParams();
  const { isAuthenticated, isLoading } = useAuth0();

  const [userInfo, setUserInfo] = useState({});
  const [contentLoading, setContentLoading] = useState(true);

  const secureAccess = localStorage.getItem("secure-access");

  const getProfile = () => {
    axios
      .get("http://localhost:3001/profile/", {
        params: {
          id: id,
          secureAccess: secureAccess,
          isAuth: isAuthenticated,
        },
      })
      .then((res) => {
        setUserInfo(res.data);
        setContentLoading(false);
      });
  };

  useEffect(() => {
    getProfile();
  }, [isAuthenticated, id]);

  if (isLoading) {
    return (
      <div style={{ width: "100%", margin: "4em", textAlign: "center" }}>
        Učitavanje...
      </div>
    );
  }

  if (userInfo.message)
    return (
      <div style={{ width: "100%", margin: "4em", textAlign: "center" }}>
        {userInfo.message}
      </div>
    );

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        marginTop: "2em",
      }}
    >
      <div
        style={{
          display: "flex",
          padding: "3em 10em",
          borderRadius: "10px",
          backgroundColor: "grey",
          color: "white",
          flexDirection: "column",
          gap: "1em",
          justifyContent: "center",
        }}
      >
        <div style={{ fontSize: "1.5em", marginBottom: "1em" }}>
          Informacije o profilu
        </div>
        {userInfo.message}
        {!contentLoading && (
          <div>
            <div>
              Korisničko ime: <b>{userInfo[0].username}</b>
            </div>
            <div>
              Email: <b>{userInfo[0].email}</b>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
