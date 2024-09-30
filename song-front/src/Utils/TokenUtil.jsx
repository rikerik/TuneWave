import { jwtDecode } from "jwt-decode";

export const getUserIdFromToken = () => {
  const token = sessionStorage.getItem("token");
  if (token) {
    const decodedToken = jwtDecode(token);
    console.log(decodedToken.UserId);

    return decodedToken.UserId;
  }
  return null;
};
