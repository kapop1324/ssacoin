import React from 'react';
import {
  Carousel, Col, Container, Row,
} from 'react-bootstrap';
import './scss/Banner.scss';
import { Link } from 'react-router-dom';
import LOGO from '../../Assets/ssacoin.png';
import Point from '../../Assets/point.png';
import StyledButton from '../Common/MyButton';

export default function Banner() {
  return (
    <Carousel className="mycarousel">
      <Carousel.Item interval={3000}>
        <Container>
          <Row>
            <Col sm={8} className="description">
              <h1>SSACOIN</h1>
              <p>이더리움 기반 스마트컨트렉트 기술을 적용한 안전한 P2P 거래 지원</p>
              <Link to="/about">
                <StyledButton>코인 소개</StyledButton>
              </Link>
            </Col>
            <Col sm={4}>
              <img
                src={LOGO}
                alt="logo"
              />
            </Col>
          </Row>
        </Container>
      </Carousel.Item>
      <Carousel.Item interval={3000}>
        <Container>
          <Row>
            <Col sm={8} className="description">
              <h1>SSAFY 마일리지</h1>
              <p>SSAFY에서 마일지를 받는 방법으로 코인으로 받아서 원하는 쿠폰 구매</p>
              <Link to="/about" className="link">
                <StyledButton>마일리지 소개</StyledButton>
              </Link>
            </Col>
            <Col sm={4}>
              <img
                src={Point}
                alt="logo"
              />
            </Col>
          </Row>
        </Container>
      </Carousel.Item>
    </Carousel>
  );
}
