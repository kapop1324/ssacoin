import styled, { css } from 'styled-components';

const StyledButton = styled.button`
  background-color: #fff;
  color: #3396f4;
  width: 200px;
  height: 40px;
  font-family: 'Noto Sans KR', sans-serif;

  border: none;
  border-radius: 12px;

  :hover {
    background-color: rgb(9,173,255);
    color: #fff;
  } 

  @media only screen and (max-width: 767.98px) {
    width: 100px;
    height: 20px;
    font-size: 10px;
  }

  ${(props) => props.yellow && css`
    color: #ebd02f;
    border: 1px solid #ebd02f;

    :hover {
      background-color: #ebd02f;
      color: #fff;
    }

    @media only screen and (max-width: 767.98px) {
      color: #fff;
      background-color: #ebd02f;

      width: 200px;
      height: 30px;
      font-size: 1rem;
    }
  `}

  ${(props) => props.blue && css`
    color: #3396f4;
    border: 1px solid #3396f4;

    :hover {
      background-color: #3396f4;
      color: #fff;
    }

    @media only screen and (max-width: 767.98px) {
      color: #fff;
      background-color: #3396f4;

      width: 200px;
      height: 30px;
      font-size: 1rem;
    }
  `}

  ${(props) => props.green && css`
    color: #3fce32;
    border: 1px solid #3fce32;

    :hover {
      background-color: #3fce32;
      color: #fff;
    }

    @media only screen and (max-width: 767.98px) {
      color: #fff;
      background-color: #3fce32;

      width: 200px;
      height: 30px;
      font-size: 1rem;
    }
  `}

  ${(props) => props.myCouponGray && css`
    color: #fff;
    border: 1px solid #fff;
    background-color: #B0B0B0;
    font-size: relative;

    :hover {
      background-color: #4b4848;
      color: #fff;
    }

    @media only screen and (max-width: 767.98px) {
      color: #fff;
      background-color: #4b4848;

      width: 200px;
      height: 30px;
      font-size: 1rem;
    }
  `}

  ${(props) => props.myCouponYellow && css`
    color: #fff;
    border: 1px solid #fff;
    background-color: #FFE194;
    font-size: relative;

    :hover {
      background-color: #FFB319;
      border: 1px solid #FFB319;
      color: #fff;
    }

    @media only screen and (max-width: 767.98px) {
      color: #fff;
      background-color: #FFB319;
      margin-top: 30%;

      width: 200px;
      height: 30px;
      font-size: 1rem;
    }
  `}

  ${(props) => props.p2pModalYellow && css`
  color: #fff;
  border: 1px solid #fff;
  background-color: #FFE194;
  font-size: relative;

  :hover {
    background-color: #FFB319;
    border: 1px solid #FFB319;
    color: #fff;
  }

  @media only screen and (max-width: 767.98px) {
    color: #fff;
    background-color: #FFB319;

    width: 200px;
    height: 30px;
    font-size: 1rem;
  }
`}

${(props) => props.p2pModalGray && css`
color: #fff;
border: 1px solid #fff;
background-color: #B0B0B0;
font-size: relative;

:hover {
  background-color: #4b4848;
  color: #fff;
}

@media only screen and (max-width: 767.98px) {
  color: #fff;
  background-color: #4b4848;

  width: 200px;
  height: 30px;
  font-size: 1rem;
}
`}

  ${(props) => props.shopGray && css`
  color: #fff;
  border: 1px solid #fff;
  background-color: #B0B0B0;
  font-size: relative;

  :hover {
    background-color: #4b4848;
    color: #fff;
  }

  @media only screen and (max-width: 767.98px) {
    color: #fff;
    background-color: #4b4848;

    width: 200px;
    height: 30px;
    font-size: 1rem;
  }
`}

  ${(props) => props.shopGreen && css`
  color: #fff;
  background-color: #b2ebad;

  :hover {
    background-color: #3fce32;
    color: #fff;
  }

  @media only screen and (max-width: 767.98px) {
    color: #fff;
    background-color: #3fce32;

    width: 200px;
    height: 30px;
    font-size: 1rem;
  }
  `}

  ${(props) => props.p2p && css`
    color: #B0B0B0;
    border: 1px solid #B0B0B0;
    width: 140px;
    height: 30px;
    margin: 10px 10px;
    font-size: relative;

    :hover {
      background-color: #3396f4;
      border: 1px solid #3396f4;
      color: #3396f4;
    }

    @media only screen and (max-width: 767.98px) {
      color: #B0B0B0;
      background-color: #fff;

      width: 100px;
      height: 30px;
      font-size: 1rem;
    }
  `}

  ${(props) => props.p2pPrice && css`
  color: #B0B0B0;
  border: 1px solid #B0B0B0;
  width: 140px;
  height: 30px;
  margin: 10px 10px;
  font-size: relative;

  :hover {
    background-color: #3396f4;
    border: 1px solid #3396f4;
    color: #3396f4;
  }

  @media only screen and (max-width: 767.98px) {
    color: #B0B0B0;
    background-color: #fff;

    width: 140px;
    height: 30px;
    font-size: 1rem;
  }
`}

  ${(props) => props.p2pYellow2 && css`
    color: #fff;
    border: 1px solid #fff;
    background-color: #FFE194;
    width: 140px;
    height: 30px;
    margin: 10px 10px;
    font-size: relative;

    :hover {
      background-color: #FFB319;
      border: 1px solid #FFB319;
      color: #fff;
    }

    @media only screen and (max-width: 767.98px) {
      color: #fff;
      background-color: #FFB319;

      width: 100px;
      height: 30px;
      font-size: 1rem;
    }
  `}

  ${(props) => props.p2pBlue && css`
    color: #fff;
    border: 1px solid #fff;
    background-color: #86c1f9;
    font-size: relative;

    :hover {
      background-color: #3396f4;
      border: 1px solid #3396f4;
      color: #fff;
    }

    @media only screen and (max-width: 767.98px) {
      color: #fff;
      background-color: #86c1f9;
      width: 200px;
      height: 30px;
      font-size: 1rem;
    }
  `}

  ${(props) => props.p2pGray && css`
    color: #fff;
    border: 1px solid #fff;
    background-color: #B0B0B0;
    width: 140px;
    height: 30px;
    margin: 10px 10px;
    font-size: relative;

    :hover {
      background-color: #4b4848;
      color: #fff;
    }

    @media only screen and (max-width: 767.98px) {
      color: #fff;
      background-color: #4b4848;

      width: 100px;
      height: 30px;
      font-size: 1rem;
    }
  `}
  ${(props) => props.p2pGray2 && css`
    color: #fff;
    border: 1px solid #fff;
    background-color: #B0B0B0;
    font-size: relative;

    :hover {
      background-color: #4b4848;
      color: #fff;
    }

    @media only screen and (max-width: 767.98px) {
      color: #fff;
      background-color: #4b4848;

      width: 200px;
      height: 30px;
      font-size: 1rem;
    }
  `}

  ${(props) => props.p2pyellow && css`
    color: #FFB319;
    border: 2px solid #FFB319;
    background-color: #FFE194
    width: 150px;
    height: 35px;
    margin 5px;

    :hover {
      background-color: #FFB319;
      color: #fff;
    }

    @media only screen and (max-width: 767.98px) {
      color: #fff;
      background-color: #FFB319;

      width: 200px;
      height: 30px;
      font-size: 1rem;
    }
  `}

  ${(props) => props.adminGray && css`
  color: #fff;
  border: 1px solid #fff;
  background-color: #B0B0B0;
  font-size: relative;

  :hover {
    background-color: #4b4848;
    color: #fff;
  }

  @media only screen and (max-width: 767.98px) {
    color: #fff;
    background-color: #4b4848;

    width: 200px;
    height: 30px;
    font-size: 1rem;
  }
`}
`;

export default StyledButton;
