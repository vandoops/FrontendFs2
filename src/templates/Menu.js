import React from "react";
import { Container, Navbar, Nav, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { FaHome, FaSignOutAlt } from "react-icons/fa";
import { Link, useNavigate, useLocation } from "react-router-dom";

const Menu = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isLoginScreen = location.pathname === '/login';

  const handleSairClick = () => {
    localStorage.removeItem('Logado');
    // Redirecionar para a tela de login
    navigate('/login');

  };

  if (isLoginScreen) {
    return null; // Não renderiza o menu na tela de login
  }

  return (
    <Navbar bg="success" variant="dark" expand="lg">
      <Container>
        <div>
          <Link to="/">
            <FaHome
              title="Página Inicial"
              style={{ cursor: "pointer" }}
              size={30}
              color="white"
            />
          </Link>
        </div>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavDropdown title="Cadastros" id="basic-nav-dropdown">
              <div>
                <LinkContainer to="/pessoas">
                  <NavDropdown.Item>Pessoas</NavDropdown.Item>
                </LinkContainer>
                <NavDropdown.Divider />
                <LinkContainer to="/funcao">
                  <NavDropdown.Item>Cargos</NavDropdown.Item>
                </LinkContainer>
                
               
                <NavDropdown.Divider />
                <LinkContainer to="/financas">
                  <NavDropdown.Item>Financeiro</NavDropdown.Item>
                </LinkContainer> 
                <NavDropdown.Divider />
                <LinkContainer to="/tipomovimentacao">
                  <NavDropdown.Item>Tipo de movimentação</NavDropdown.Item>
                </LinkContainer>
                <NavDropdown.Divider />
                <LinkContainer to="/itemdoacao">
                  <NavDropdown.Item>Items de doação</NavDropdown.Item>
                </LinkContainer>
                <NavDropdown.Divider />
                <LinkContainer to="/doacao">
                  <NavDropdown.Item>Doações</NavDropdown.Item>
                </LinkContainer>
              </div>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
        <Nav>
          <div>
            <FaSignOutAlt
              title="Sair"
              style={{ cursor: "pointer" }}
              size={20}
              color="white"
              onClick={handleSairClick}
            />
          </div>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Menu;

