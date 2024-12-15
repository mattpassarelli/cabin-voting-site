import React from "react";
import { Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const Home = () => {
  const isLoggedIn =
    sessionStorage.getItem("accessToken") && sessionStorage.getItem("refreshToken");
  return (
    <Container>
      <h1>Welcome to Vacation Planner!</h1>
      <p>Plan your vacation by creating trips and voting for your favorite cabins.</p>
      <p>
        {isLoggedIn && (
          <Button as={Link} to="/trips" variant="primary">
            View Trips
          </Button>
        )}
      </p>
    </Container>
  );
};

export default Home;
