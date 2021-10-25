import React from 'react';
import Banner from '../Common/MyBanner';
import Suggest from './Suggest';
import Product from './Product';

const imgUrl = 'https://images.unsplash.com/photo-1564216550945-b9aca66d0a10?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80';
const title = 'SHOP';

export default function Index() {
  window.scrollTo(0, 0);
  return (
    <div>
      <Banner
        imgUrl={imgUrl}
        title={title}
      />
      <Suggest />
      <Product />
    </div>
  );
}
