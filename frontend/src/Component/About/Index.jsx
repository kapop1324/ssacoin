import React from 'react';
import Banner from '../Common/MyBanner';
import BlockChain from './BlockChain';

const imgUrl = 'https://images.unsplash.com/photo-1526948531399-320e7e40f0ca?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80';
const title = 'About';

export default function Index() {
  return (
    <div>
      <Banner
        imgUrl={imgUrl}
        title={title}
      />
      <BlockChain />
    </div>
  );
}
