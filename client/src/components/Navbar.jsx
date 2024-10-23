import React, { useEffect, useState } from "react";
import Image from "../assets/Carousalimages/logo.png";
import { FB, IG, TW, User } from "../assets/icons";
import { Link } from "react-router-dom";
import { Navbar, Nav, NavDropdown, Container, Button } from "react-bootstrap";
import { useSelector } from "react-redux";

const CustomNavbar = () => {
  const [subMenu, setSubMenu] = useState(false);
  const user = useSelector((state) => state.user);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(user.userID != null);
  }, [user]);

  const navBtnGrp = [
    { title: "Home", nav: "/" },
    { title: "About", nav: "/about" },
  ];
  const socialBtn = [FB, IG, TW];
  const [menu, setMenu] = useState(false);
  const [dimensions, setDimensions] = useState({ width: window.innerWidth });

  const handleResize = () => {
    setDimensions({ width: window.innerWidth });
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    setSubMenu(false);
    window.location.reload();
  };

  return (
    <Navbar bg="light" expand="lg" className="sticky-top shadow-sm">
      <Container>
        <Link to="/" className="flex items-center">
          <img src={Image} className="h-10 me-2" alt="Logo" />
          <span className="font-bold text-lg">InsightInk</span>
        </Link>
        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          onClick={() => setMenu(!menu)}
        />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="m-auto font-semibold text-lg">
            {navBtnGrp.map((btn, index) => (
              <Nav.Link as={Link} to={btn.nav} key={index}>
                {btn.title}
              </Nav.Link>
            ))}
            {!isLoggedIn && (
              <Nav.Link className="mb-2" as={Link} to="/login">
                Login
              </Nav.Link>
            )}
          </Nav>
          <div className="flex space-x-4 items-center">
            {socialBtn.map((icon, index) => (
              <img
                src={icon}
                className="cursor-pointer hover:scale-125 transition-all"
                key={index}
                alt={`Social icon ${index}`}
              />
            ))}
            {isLoggedIn && (
              <div className="relative h-10">
                <img
                  src={User}
                  className="cursor-pointer"
                  onClick={() => setSubMenu(!subMenu)}
                  alt="User"
                />
                {subMenu && (
                  <NavDropdown
                    align="end"
                    className="mt-3"
                    show={subMenu}
                    onMouseLeave={() => setSubMenu(false)}
                  >
                    <NavDropdown.Item as={Link} to="/newPost">
                      New Blog
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      as={Link}
                      to={`/profile/${user.userName}`}
                    >
                      My Account
                    </NavDropdown.Item>
                    <NavDropdown.Item onClick={handleLogout}>
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                )}
              </div>
            )}
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;
