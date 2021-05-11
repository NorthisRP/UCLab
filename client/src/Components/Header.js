import React from "react";
import { Nav, NavDropdown, Navbar } from "react-bootstrap";
import logo from "../assets/UCLab-logo-txt-white.png";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Header() {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div>
      <Navbar collapseOnSelect expand="lg" bg="dark">
        <Navbar.Brand>
          <Link to="/">
            <img width="60" height="60" src={logo} alt="UCLab" />
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mx-auto">
            <CustomLink to="/blog">{t("Блог")}</CustomLink>
            <CustomLink to="/projects">Проекты</CustomLink>
            <CustomLink to="/about">О нас</CustomLink>
          </Nav>
          <NavDropdown title="Language" id="basic-nav-dropdown">
            <NavDropdown.Item onClick={() => changeLanguage("ru")}>
              RU
            </NavDropdown.Item>
            <NavDropdown.Item onClick={() => changeLanguage("en")}>
              En
            </NavDropdown.Item>
          </NavDropdown>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}

const CustomLink = styled(Link)`
  color: white;
  transition: 0.2s;
  margin: 10px;

  :hover {
    text-decoration: none;
    color: rgb(238, 145, 6);
  }
`;
