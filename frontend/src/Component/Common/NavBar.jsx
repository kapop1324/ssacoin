import React from 'react';
import { useDispatch } from 'react-redux';
import { Navbar, Container, Nav } from 'react-bootstrap';
import './NavBar.scss';
import { FaUserCircle, FaBell } from 'react-icons/fa';
import LOGO from '../../Assets/ssacoin.png';
import getId from '../../lib/getId';
import LogoutApi from '../../API/Auth/LogOut';
import { LogoutSuccess } from '../../Redux/Action/Auth';

export default function NavBar() {
  const dispatch = useDispatch();

  const logoutHandler = async () => {
    const response = await LogoutApi(getId());

    if (response.status === 200) { // 응답 성공
      if (response.result === 'success') { // 로그아웃 성공
        dispatch(LogoutSuccess());
        window.location.replace('/ssacoinlogin');
      } else {
        // console.log('로그아웃 실패');
      }
    } else {
      // console.log('응답 실패');
    }
  };

  return (
    <div>
      <Navbar expand="lg" fixed="top" className="Navbar">
        <Container>
          <Navbar.Brand href="/" className="NavBrand">
            <div className="d-flex">
              <img
                alt="logo"
                src={LOGO}
                width="40"
                height="40"
                className="d-inline-block align-top"
              />
              <h3>SSACOIN</h3>
            </div>
          </Navbar.Brand>
          <Nav className="me-auto">
            <div className="d-flex NavLink">
              <Nav.Link href="/market">Market</Nav.Link>
              <Nav.Link href="/mycoupon">Coupon</Nav.Link>
              <Nav.Link href="/shop">Shop</Nav.Link>
              <Nav.Link href="about">About</Nav.Link>
            </div>
          </Nav>
          <Nav>
            <div className="d-flex NavLink">
              <Nav.Link href="#deets" className="logout" onClick={() => logoutHandler()}>Logout</Nav.Link>
              <Nav.Link href="mypage">
                <FaUserCircle size="2rem" />
              </Nav.Link>
            </div>
          </Nav>
        </Container>
      </Navbar>
      <Navbar expand="lg" fixed="top" className="MobileNavbar">
        <Container>
          <Navbar.Brand href="/" className="NavBrand">
            <div className="d-flex">
              <h3>SSACOIN</h3>
            </div>
          </Navbar.Brand>
          <Nav>
            <div className="d-flex NavLink">
              <Nav.Link href="mypage">
                <FaBell size="1.5rem" />
              </Nav.Link>
            </div>
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
}
