import api from "../../api/api";
import { useNavigate } from "react-router-dom";

const LogoutButton = ({ className }) => {
  //Hook to navigate
  const navigate = useNavigate();

  //Function to handle logout
  const logout = async () => {
    try {
      //send a get request to the logout endpoint
      await api.get("/logout");

      // Remove the token from session storage to complete the logout process
      sessionStorage.removeItem("token");

      //Redirect to the home page after successful logout
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <button
      onClick={logout}
      type="button"
      className={`btn btn-outline-light btn-lg me-3 ${className}`}
    >
      Logout
    </button>
  );
};

export default LogoutButton;
