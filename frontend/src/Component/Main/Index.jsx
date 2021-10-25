import React from 'react';
import Intro from './Intro';
import Banner from './Banner';
import Market from './Market';
import MyCoupon from './MyCoupon';
import Shop from './Shop';

const Index = () => (
  <div className="body">
    <Banner />
    <Intro />
    <Market />
    <MyCoupon />
    <Shop />
  </div>
);

export default Index;
