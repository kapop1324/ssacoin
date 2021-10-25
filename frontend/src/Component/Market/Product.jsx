import React, {
  useEffect, useState, useRef, useCallback,
} from 'react';
import AOS from 'aos';
import { Container } from 'react-bootstrap';
import p2pAllProductsApi from '../../API/Market/Product';
import p2pProductsCategoryApi from '../../API/Market/ProductCategory';
import Cards from './Cards';
import './scss/Product.scss';
import CouponSell from './CouponSell';
import MyPagination from '../Common/MyPagination';
import MySearch from '../Common/MySearch';
import Filter from './Filter';
import getId from '../../lib/getId';

export default function Product() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  // const [noItem, setNoItem] = useState(true);

  useEffect(async () => {
    AOS.init({
      duration: 1000,
      disable: 'mobile',
    });
    const response = await p2pAllProductsApi();
    setProducts(response.res);
  }, []);

  // 검색 클릭 시 필터기능 초기화
  const childRef = useRef();
  const callChildFunc = useCallback(() => {
    childRef.current.filterFuncReset(); // 자식 컴포넌트 함수 호출
  });

  // 검색기능
  const getSearch = async (searchProps) => {
    // 필터 초기화
    callChildFunc();
    // 새로 전체상품을 불러온 후 그 데이터 에서 필터링
    const response = await p2pAllProductsApi();
    setProducts(response.res.filter((product) => {
      if (product.couponExchange.includes(searchProps)
      || product.couponName.includes(searchProps) || product.tradeTitle.includes(searchProps)
      || product.tradeRequestId.includes(searchProps)) {
        return product;
      }
      return null;
    }));
  };

  // 필터 기능
  const getFilter = async (filterProps) => {
    if (filterProps) {
      const response = await p2pProductsCategoryApi(filterProps.category);
      // 카테고리 값 넣었는데 데이터 있을 때.
      if (response.res !== undefined) {
        const subProduct = response.res.filter((product) => {
          if (product.tradeMileage <= filterProps.price
            && product.tradeMileage > (filterProps.price - 5000)) {
            // console.log(product.tradeMileage);
            return product;
          } return null;
        });
        if (filterProps.sort) {
          subProduct.sort((a, b) => b.tradeMileage - a.tradeMileage);
        } else {
          subProduct.sort((a, b) => a.tradeMileage - b.tradeMileage);
        }
        setProducts(subProduct);
        return null;
      }
      return null;
    }
    // null 값 들어올때.(초기화)
    const response = await p2pAllProductsApi();
    setProducts(response.res);
    return null;
  };
  const getPage = async (getpage) => {
    setPage(getpage);
  };
  const totlaPage = products ? products.length : 1;
  const startPage = (page - 1) * 12;
  const lastPage = page * 12;
  const allProduct = products && products.length > 0
    ? products.slice(startPage, lastPage).map((product, index) => (
      <Cards
        key={index}
        imgUrl={product.productImg}
        title={product.tradeTitle}
        price={product.tradeMileage}
        tradeTitle={product.tradeTitle}
        marketBuyDetail={{
          name: product.couponName,
          price: product.tradeMileage,
          period: product.couponEnd.substring(0, 10),
          seller: product.tradeRequestId,
        }}
        buyRequest={{
          tradeIdx: product.tradeIdx,
          tradeCouponId: product.couponId,
          tradeMileage: product.tradeMileage,
          tradeRequestId: product.tradeRequestId,
          tradeResponseId: getId(),
          tradeTitle: product.tradeTitle,
          tradeDate: product.couponEnd.substring(0, 10),
        }}
      />
    )) : <div>검색결과가 없습니다.</div>;

  return (
    <Container className="p2pContainer">
      <div className="top">
        <CouponSell />
        <MySearch searchFunc={getSearch} />
      </div>
      <Filter getFilterFunc={getFilter} ref={childRef} />
      <div className="products" data-aos="fade-up">
        {allProduct}
      </div>
      <MyPagination parentsFunc={getPage} pageTotal={totlaPage} />
    </Container>
  );
}
