import { useEffect } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

function Profile() {
  const navigate = useNavigate();
  useEffect(() => {
    if (!Cookies.get("token")) {
      navigate("/");
    }
  }, []);

  return <div>Profile</div>;
}

export default Profile;
