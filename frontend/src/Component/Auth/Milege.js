import React from 'react';
import './scss/Milege.scss';

const Milege = ({ data }) => (
  <div className="milegetabale board table-responsive table-bordered">
    <table className="table table-hover">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">날짜</th>
          <th scope="col">쿠폰</th>
          <th scope="col">마일리지</th>
        </tr>
      </thead>
      <tbody>
        {data.length !== 0 && data.map((item, index) => (
          <tr key={index}>
            <th scope="row">{index + 1}</th>
            <td>{item.date.substring(2, 10)}</td>
            <td>{item.coupon}</td>
            <td>{item.milege}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default Milege;
