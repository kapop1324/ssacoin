import React, { useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import './scss/MyCoupon.scss';
import { Link } from 'react-router-dom';
import AOS from 'aos';
import StyledButton from '../Common/MyButton';
import mycouponpage from '../../Assets/mycouponpage.png';
import mycouponpage2 from '../../Assets/mycouponpage2.png';

import 'aos/dist/aos.css';

export default function MyCoupon() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      disable: 'mobile',
    });
  }, []);

  return (
    <Container className="mycoupon">
      <div className="content d-flex">
        <Row>
          <Col sm={8} className="left" data-aos="fade-right">
            <div className="content">
              <img src={mycouponpage} alt="mycouponpage" />
              <img src={mycouponpage2} alt="mycouponpage" />
            </div>
          </Col>
          <Col sm={4} className="right" data-aos="fade-left">
            <div className="content d-flex flex-column">
              <h1>쿠폰 관리하기</h1>
              <Link to="/mycoupon">
                <StyledButton blue>쿠폰함 바로가기</StyledButton>
              </Link>
            </div>
          </Col>
        </Row>
      </div>
    </Container>
  );
}
