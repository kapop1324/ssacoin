import React from 'react';
import './scss/Suggest.scss';
import { Container, Carousel } from 'react-bootstrap';
import baskinBanner from '../../Assets/baskinBanner.jpg';
import dunkinBanner2 from '../../Assets/dunkinBanner2.jpg';
import starbucks from '../../Assets/starbucks.jpg';

export default function Suggest() {
  return (
    <Container className="suggestContainer">
      <div className="text">
        <h5>추천상품</h5>
      </div>
      <Carousel className="shopCarousel">
        <Carousel.Item interval={1000}>
          <img
            className="d-block w-100"
            src={starbucks}
            alt="starbucks"
          />
          <Carousel.Caption>
            <h3>Starbucks</h3>
            <p>코딩엔 시원한 아이스 아메리카노가 필수죠!</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={500}>
          <img
            className="d-block w-100"
            src={baskinBanner}
            alt="baskinBanner"
          />
          <Carousel.Caption>
            <h3>Baskin Robbins</h3>
            <p>공부하다가 당 떨어질 때는 달콤한 베라!</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={dunkinBanner2}
            alt="dunkinBanner"
          />
          <Carousel.Caption>
            <h3>Dunkin Donuts</h3>
            <p>아침에 모닝 도넛과 커피와 함께 모두 굿모닝!</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </Container>
  );
}
