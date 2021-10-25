import React from 'react';
import { Container } from 'react-bootstrap';
import { FcNext } from 'react-icons/fc';
import './scss/BlockChain.scss';
import ssafylogo from '../../Assets/SSAFY_logo.png';
import SSACOIN from '../../Assets/ssacoin.png';

export default function BlockChain() {
  return (
    <Container className="blockChainContainer">
      <div>
        <div className="intro">
          <h3>SSACOIN은 이더리움 기반 블록체인으로 만들어진 코인입니다.</h3>
          <h3>스마트 컨트렉트를 이용한 안전 P2P거래를 지원합니다.</h3>
          <div className="detail">
            <p>SSAFY활동을 통해 얻은 마일리지는 곧 코인이 되어,</p>
            <p>상품으로 받은 쿠폰이외에 내가 사고 싶은 쿠폰을 구매하실 수 있습니다!</p>
          </div>
        </div>
        <div className="logoImg">
          <img src={ssafylogo} alt="ssafylogo" />
          <FcNext size="2rem" />
          <FcNext size="2rem" />
          <FcNext size="2rem" />
          <img src={SSACOIN} alt="ssacoin" />
        </div>
      </div>
    </Container>
  );
}
