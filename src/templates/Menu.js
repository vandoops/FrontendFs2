import { Container, Navbar, Nav, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { FaHome, FaSignOutAlt } from 'react-icons/fa';
import { Link } from "react-router-dom";


export default function Menu(props) {
  return (
    <Navbar bg="success" variant="dark" expand="lg">
      <Container>
        <div>
          <Link to="/" > <FaHome title="Página Inicial" style={{ cursor: 'pointer' }} size={30} color="white" /></Link>
        </div>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavDropdown title="Cadastros" id="basic-nav-dropdown">
              <div>
                
                <LinkContainer to="/funcao">
                  <NavDropdown.Item>Tipo de movimentação</NavDropdown.Item>
                </LinkContainer>
                <NavDropdown.Divider />
                
                
                
                <NavDropdown.Divider />
                <LinkContainer to="/financas">
                  <NavDropdown.Item>Financeiro</NavDropdown.Item>
                </LinkContainer>
              </div>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
        <Nav >
          <div>
            <FaSignOutAlt title="Sair" style={{ cursor: 'pointer' }} size={20} color="white"/>
          </div>
        </Nav>
      </Container>
    </Navbar>
  );
}

