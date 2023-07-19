import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import './header.css';

const Header = () => {
  return (
    <Navbar className="custom-navbar" bg="light" expand="lg">
      <Navbar.Brand href="/">MiAppDeCitas</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/solicitar">Solicitar cita médica</Nav.Link>
          <Nav.Link href="/citas">Ver citas solicitadas</Nav.Link>
          {/* Agrega más enlaces de navegación si es necesario */}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;