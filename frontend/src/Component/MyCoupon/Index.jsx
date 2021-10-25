import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import Banner from '../Common/MyBanner';
import Cards from './Cards';
import getMyCouponAPI from '../../API/MyCoupn/Product';
import './scss/index.scss';
import getId from '../../lib/getId';

const imgUrl = 'https://images.unsplash.com/photo-1577042939454-8b29d442b402?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=967&q=80';
const title = 'MY COUPON';

export default function Index() {
  const [coupons, setCoupons] = useState([]);

  useEffect(async () => {
    const user = getId();
    const response = await getMyCouponAPI(user);
    setCoupons(response.res.data.Coupons);
  }, []);

  const allCoupons = coupons.map((coupon, index) => (
    <Cards
      key={index}
      imgUrl={coupon.couponImg}
      title={coupon.couponName}
      price={coupon.couponMileage}
      myCouponDetail={{
        couponId: coupon.couponId,
        name: coupon.couponName,
        price: coupon.couponMileage,
        period: coupon.couponEnd,
        comment: coupon.couponComment,
      }}
    />
  ));

  return (
    <div>
      <Banner
        imgUrl={imgUrl}
        title={title}
      />
      <Container className="couponContainer">
        <div className="coupons">
          {allCoupons}
        </div>
      </Container>
    </div>
  );
}
