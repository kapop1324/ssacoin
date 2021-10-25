import React from 'react';
import Banner from '../Common/MyBanner';
import Product from './Product';

const imgUrl = 'https://images.unsplash.com/photo-1568332620171-160b4bdca2e1?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1934&q=80';
const title = 'Market';

export default function Index() {
  window.scrollTo(0, 0);
  return (
    <div>
      <Banner
        imgUrl={imgUrl}
        title={title}
      />
      <Product />
    </div>
  );
}
