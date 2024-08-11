import React, { useState, useEffect } from "react";
import { getUserById } from "../services/UserService";
import { useParams } from "react-router-dom";

const UserDetail = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchUser();
  });

  const fetchUser = async () => {
    const response = await getUserById(id);
    setUser(response.data);
  };

  return (
    <div>
      {user ? (
        <div>
          <h2>User Detail</h2>
          <p>Username: {user.username}</p>
          <p>Last Name: {user.lastName}</p>
          <p>First Name: {user.firstName}</p>
          <p>ID: {user.id}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default UserDetail;
