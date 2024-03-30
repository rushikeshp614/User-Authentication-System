import React, { useContext } from 'react';
import { Button, Container, Grid, Header, Icon } from 'semantic-ui-react';
import { AuthContext } from '../context/authContext';
import { useNavigate } from 'react-router-dom';

function UserProfile() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <Container>
      <Grid
        textAlign="center"
        style={{ height: '100vh', margin: 0 }}
        verticalAlign="middle"
      >
        <Grid.Column style={{ maxWidth: 450 }}>
          <Icon name="user" size="huge" style={{ marginBottom: '1rem' }} />
          {user ? (
            <React.Fragment>
              <Header as="h1" style={{ backgroundColor: 'grey', color: 'black', padding: '20px' }}>Welcome, {user.username}!</Header>
              <Button color="black" onClick={handleLogout}>Logout</Button>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <Header as="h1" style={{ color: 'black' }}>Please log in to view this page</Header>
              <Button color="black" onClick={() => navigate('/login')}>Login</Button>
            </React.Fragment>
          )}
        </Grid.Column>
      </Grid>
    </Container>
  );
}

export default UserProfile;
