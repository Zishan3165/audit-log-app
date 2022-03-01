import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './index.scss';
import { UserAvatar } from './UserAvatar';

function isLinkActive(currentPath, menuPath) {
  return currentPath.startsWith(menuPath);
}

export function NavBar() {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" className="px-2">
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link as={Link} to="/sites" active={isLinkActive(location.pathname, '/sites')}>
            Sites
          </Nav.Link>
          <Nav.Link as={Link} to="/logs" active={isLinkActive(location.pathname, '/logs')}>
            Logs
          </Nav.Link>
        </Nav>
        <Nav>
          <UserAvatar />
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
