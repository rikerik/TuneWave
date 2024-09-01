import api from "../../api/api";
import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
  const navigate = useNavigate();

  const logout = async () => {
    try {
      await api.get("/logout");

      //to make sure that the token will be removed from session storage too
      sessionStorage.removeItem("token");
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <button
      onClick={logout}
      type="button"
      className="btn btn-outline-light me-3"
    >
      Logout
    </button>
  );
};

export default LogoutButton;
