import React, { useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import './scss/Market.scss';
import { Link } from 'react-router-dom';
import AOS from 'aos';
import StyledButton from '../Common/MyButton';
import marketpage from '../../Assets/marketpage.png';
import marketpage2 from '../../Assets/marketpage2.png';

import 'aos/dist/aos.css';

export default function Market() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      disable: 'mobile',
    });
  }, []);

  return (
    <Container
      className="market"
    >
      <div className="content d-flex">
        <Row xs={1} md={2}>
          <Col className="left" data-aos="fade-down">
            <div className="content d-flex flex-column">
              <div className="top">
                <h1>쿠폰 직거래 마켓</h1>
                <Link to="/market">
                  <StyledButton yellow>마켓 바로가기</StyledButton>
                </Link>
              </div>
              <div className="bottom">
                <img src={marketpage} alt="marketpage" />
              </div>
            </div>
          </Col>
          <Col className="right" data-aos="fade-up">
            <div className="content d-flex flex-column">
              <div className="top">
                <img src={marketpage2} alt="marketpage" />
              </div>
              <div className="bottom">
                <p>
                  사용하지 않은 쿠폰을 팔고,
                  {' '}
                  <br />
                  필요한 쿠폰을 구매하세요.
                  {' '}
                  <br />
                  쿠폰과 판매자에 대한 상세내역도
                  {' '}
                  <br />
                  한번에 볼 수 있어요.
                </p>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </Container>
  );
}
