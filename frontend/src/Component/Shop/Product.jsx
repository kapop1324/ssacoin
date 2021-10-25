import React, { useEffect, useState } from 'react';
import AOS from 'aos';
import { Container } from 'react-bootstrap';
import Cards from './Cards';
import './scss/Product.scss';
import ShopAllProductsApi from '../../API/Shop/Product';
import ShopProductsCategoryApi from '../../API/Shop/ProductsCategory';
import Category from './Category';
import MyPagination from '../Common/MyPagination';
import getId from '../../lib/getId';

export default function Product() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(async () => {
    AOS.init({
      duration: 1000,
      disable: 'mobile',
    });
    const response = await ShopAllProductsApi();
    setProducts(response.res);
  }, []);

  const getCategory = async (category) => {
    const response = await ShopProductsCategoryApi(category);
    setProducts(response.res);
    setPage(1);
  };

  const getPage = async (getpage) => {
    setPage(getpage);
  };

  // 1 => 0~12 , 2=> 12~24 3=> 24~36
  // 게시글 총 개수 - 페이지당 12개씩
  const total = products.length;
  // 게시글 순서 계산 - 시작 - 끝
  const startCard = (page - 1) * 12;
  const lastCard = page * 12;

  //  console.log(products);
  const allProduct = products.slice(startCard, lastCard).map((product, index) => (
    <Cards
      key={index}
      imgUrl={product.productImg}
      title={product.productName}
      price={product.productMileage}
      detail={{ name: product.productName, price: product.productMileage, period: '2021년 11월 10일' }}
      buyRequest={{
        requestId: getId(),
        requestStatus: '0',
        requestProductId: product.productId.toString(),
      }}
    />
  ));

  return (
    <Container className="productContainer">
      <Category parentsFunc={getCategory} />
      <div className="text">
        <h5>전체상품</h5>
      </div>
      <div className="products" data-aos="fade-up">
        {allProduct}
      </div>
      <MyPagination parentsFunc={getPage} pageTotal={total} />
    </Container>
  );
}
