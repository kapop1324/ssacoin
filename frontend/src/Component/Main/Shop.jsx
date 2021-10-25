import { Container } from 'react-bootstrap';
import './scss/Shop.scss';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import AOS from 'aos';
import StyledButton from '../Common/MyButton';
import beskin from '../../Assets/beskin.jpg';
import chiken from '../../Assets/chiken.jpg';
import dunkin from '../../Assets/dunkin.jpg';

export default function Shop() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      disable: 'mobile',
    });
  }, []);

  return (
    <Container className="shop">
      <div className="text" data-aos="fade-down">
        <h1>
          SSAFY
          {' '}
          <span>Coupon Shop</span>
          {' '}
          Open!
        </h1>
        <br />
        <p>
          커피 쿠폰만 10개째...
          <br />
          나도 치킨을 먹고 싶다면??
        </p>
        <p>
          쿠폰 판매와 활동 마일리지로 얻은 싸코인으로
          <br />
          내가 원하는 쿠폰을 구매해 보세요!
        </p>
        <Link to="/shop">
          <StyledButton green>쿠폰샵 바로가기</StyledButton>
        </Link>
      </div>
      <div className="foodImg" data-aos="fade-up">
        <img src={chiken} alt="bekin" />
        <img src={beskin} alt="bekin" />
        <img src={dunkin} alt="bekin" />
      </div>
    </Container>
  );
}
