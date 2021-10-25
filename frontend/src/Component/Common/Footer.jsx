import React from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineHome, AiOutlineShoppingCart, AiOutlineShop } from 'react-icons/ai';
import { RiCoupon2Line } from 'react-icons/ri';
import { IoPersonOutline } from 'react-icons/io5';
import Logo from '../../Assets/ssacoin.png';
import './Footer.scss';

const currentYear = new Date().getFullYear();

export default function footer() {
  return (
    <div>
      <footer className="webFooter">
        <div className="logo">
          <img src={Logo} alt="Logo" />
          <Link to="/" className="link">
            <h1>
              SSACOIN
            </h1>
          </Link>
        </div>
        <a href="https://lab.ssafy.com/s05-blockchain/S05P21C202">
          <p>
            (c)
            {' '}
            {currentYear}
            {' '}
            SSACOIN  Team  GitLab
          </p>
        </a>
      </footer>
      <footer className="mobileFooter">
        <div className="menu">
          <Link to="/" className="link">
            <div>
              <AiOutlineHome size="2rem" />
              <p>홈</p>
            </div>
          </Link>
          <Link to="/market" className="link">
            <div>
              <AiOutlineShoppingCart size="2rem" />
              <p>마켓</p>
            </div>
          </Link>
          <Link to="/shop" className="link">
            <div>
              <AiOutlineShop size="2rem" />
              <p>쿠폰샵</p>
            </div>
          </Link>
          <Link to="/mycoupon" className="link">
            <div>
              <RiCoupon2Line size="2rem" />
              <p>나의 쿠폰</p>
            </div>
          </Link>
          <Link to="/mypage" className="link">
            <div>
              <IoPersonOutline size="2rem" />
              <p>마이페이지</p>
            </div>
          </Link>
        </div>
      </footer>
    </div>
  );
}
