import React, { useEffect } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import './scss/Intro.scss';
import AOS from 'aos';
import 'aos/dist/aos.css';
import mainpage from '../../Assets/mainpage.png';

export default function intro() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      disable: 'mobile',
    });
  }, []);

  return (
    <Container className="intro">
      <div className="content d-flex">
        <Row xs={1} md={2}>
          <Col className="text" data-aos="fade-right">
            <div className="content d-flex flex-column">
              <div className="top">
                <h2>SSAFY에서 받은 쿠폰</h2>
                <h2>어떻게 관리 하시나요?</h2>
              </div>
              <div className="bottom">
                <p>
                  SSAFY 활동을 열심히 하시는
                  {' '}
                  <br />
                  쿠폰 수집가 여러분들을 위해
                  {' '}
                  <br />
                  드디어 SSACOIN이 완성되었습니다!
                  {' '}
                </p>
              </div>
            </div>
          </Col>
          <Col className="img" data-aos="fade-left">
            <div className="content">
              <img src={mainpage} alt="mainpage" />
            </div>
          </Col>
        </Row>
      </div>
    </Container>
  );
}
