import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styles from './navbar.module.css';
import { PATH } from '../../constants/path';
import { useCustomNavigate } from '../../reduxStore/hooks/hooks';

const AppNavbar: React.FC = () => {
  const navigate=useCustomNavigate()

  const logoutHandler=()=>{
    localStorage.removeItem('app-token')
    navigate(PATH.LOGIN)
  }
  
  return (
    <Navbar bg="dark" variant="dark" expand="lg" className={styles.navbar}>
      <Container>
        <Navbar.Brand as={Link} to="/" className={styles.brand}>Task Management</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav className="ml-auto">
            <Nav.Link as={Link} to={PATH.TASKLIST} className={styles.navLink}>Dashboard</Nav.Link>
            <Nav.Link as={Link} to="/profile" className={styles.navLink}>Profile</Nav.Link>
            <Nav.Link onClick={logoutHandler} className={styles.navLink}>Logout</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;
