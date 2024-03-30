import React from "react";
import { Link } from "react-router-dom";
import { Button, Container, Header, Icon, Grid } from "semantic-ui-react";

function Home() {
  return (
    <Grid
      textAlign="center"
      style={{ height: "100vh", margin: 0 }}
      verticalAlign="middle"
    >
      <Grid.Column style={{ maxWidth: 450 }}>
        <Container>
          <Icon name="key" size="huge" />
          <Header as="h1" content="Auth System" />
          <p>Welcome to user auth system</p>
          <Grid.Row columns={2}>
            <Grid.Column>
              <Link to="/login">
                <Button color="black" size="large" fluid>
                  Login
                </Button>
              </Link>
            </Grid.Column>
            <Grid.Column>
              <Link to="/register">
                <Button color="grey" size="large" fluid>
                  Register
                </Button>
              </Link>
            </Grid.Column>
          </Grid.Row>
        </Container>
      </Grid.Column>
    </Grid>
  );
}

export default Home;
