import React, { useEffect, useState } from "react";

const UserForm = () => {
  useEffect(() => {
    const checkUser = async () => {
      const storedName = localStorage.getItem("userName");

      if (!storedName) {
        const nameInput = prompt("Please enter your name:");

        await createUser(nameInput);
      }
    };

    checkUser();
  }, []);

  const createUser = async (name) => {
    const response = await fetch("http://127.0.0.1:8000/users/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
    });

    const data = await response.json();

    if (response.ok) {
      console.log("User created or retrieved:", data);
      localStorage.setItem("userName", name);
    } else {
      console.error("Error:", data.error);
    }
  };

  return null; // or you can return a loading indicator or another component
};

export default UserForm;
