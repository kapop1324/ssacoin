import React, {
  useEffect, useState, forwardRef, useImperativeHandle,
} from 'react';
import { Container } from 'react-bootstrap';
import StyledButton from '../Common/MyButton';
import './scss/Filter.scss';

const Filter = forwardRef((props, ref) => {
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState(0);
  const [sort, setSort] = useState(null);
  const [filter, setFilter] = useState({
    category: '',
    price: 0,
    sort: 0,
  });
  // const [nullCheck, setNullCheck] = useState(false);

  const sendCategory = async (getCategory) => {
    setCategory(getCategory);
  };

  const sendPrice = async (getPrice) => {
    setPrice(getPrice);
  };

  const sendSort = async (getSort) => {
    setSort(getSort);
  };

  const filterFunc = async () => {
    setFilter({ category, price, sort });
  };
  useEffect(async () => {
    props.getFilterFunc(filter);
  }, [filter]);

  useImperativeHandle(ref, () => ({
    filterFuncReset() {
      // 함수 보내기
      setCategory('');
      setPrice(0);
      setSort(null);
      setFilter({ category: '', price: 0, sort: null });
    },
  }));

  const filterFuncReset = async () => {
    setCategory('');
    setPrice(0);
    setSort(null);
    setFilter({ category: '', price: 0, sort: null });
    props.getFilterFunc(null);
  };

  return (
    <Container className="filterContainer">
      <div className="filter">
        <h5>카테고리</h5>
        <div className="buttons">
          <StyledButton p2p onClick={() => sendCategory('chicken_pizza')} className={category === 'chicken_pizza' ? 'active' : 'nonActive'}>치킨/피자</StyledButton>
          <StyledButton p2p onClick={() => sendCategory('coffee')} className={category === 'coffee' ? 'active' : 'nonActive'}>커피/음료</StyledButton>
          <StyledButton p2p onClick={() => sendCategory('dessert')} className={category === 'dessert' ? 'active' : 'nonActive'}>디저트</StyledButton>
          <StyledButton p2p onClick={() => sendCategory('burger')} className={category === 'burger' ? 'active' : 'nonActive'}>햄버거</StyledButton>
          <StyledButton p2p onClick={() => sendCategory('etc')} className={category === 'etc' ? 'active' : 'nonActive'}>기타</StyledButton>
        </div>
      </div>
      <div className="filter">
        <h5>가격</h5>
        <div className="buttons">
          <StyledButton p2pPrice onClick={() => sendPrice(5000)} className={price === 5000 ? 'active' : 'nonActive'}>~ 5000</StyledButton>
          <StyledButton p2pPrice onClick={() => sendPrice(10000)} className={price === 10000 ? 'active' : 'nonActive'}>5000 ~ 10000</StyledButton>
          <StyledButton p2pPrice onClick={() => sendPrice(15000)} className={price === 15000 ? 'active' : 'nonActive'}>10000 ~ 15000</StyledButton>
          <StyledButton p2pPrice onClick={() => sendPrice(20000)} className={price === 20000 ? 'active' : 'nonActive'}>15000 ~ 20000</StyledButton>
          <StyledButton p2pPrice onClick={() => sendPrice(25000)} className={price === 25000 ? 'active' : 'nonActive'}>20000 ~</StyledButton>
        </div>
      </div>
      <div className="filter">
        <h5>정렬</h5>
        <div className="buttons">
          <StyledButton p2p onClick={() => sendSort(0)} className={sort === 0 ? 'active' : 'nonActive'}>낮은 가격순</StyledButton>
          <StyledButton p2p onClick={() => sendSort(1)} className={sort === 1 ? 'active' : 'nonActive'}>높은 가격순</StyledButton>
        </div>
      </div>
      <div className="filter">
        <div className="buttons form">
          <StyledButton p2pYellow2 onClick={() => filterFunc()}>검색하기</StyledButton>
          <StyledButton p2pGray onClick={() => filterFuncReset()}>초기화</StyledButton>
        </div>
      </div>
    </Container>
  );
});

export default Filter;
