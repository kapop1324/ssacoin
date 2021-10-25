import React from 'react';
import './MyBanner.scss';

export default function Banner({ imgUrl, title }) {
  return (
    <div className="mybanner">
      <img src={imgUrl} alt="banner" />
      <h3>{title}</h3>
    </div>
  );
}
