import { Link } from "react-router-dom";

function Logout() {
  const logout = () => {
    localStorage.removeItem("token");
  };

  return (
    <Link to="/" onClick={logout}>
      Logout
    </Link>
  );
}

export default Logout;
