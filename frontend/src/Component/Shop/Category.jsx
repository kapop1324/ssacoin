import React from 'react';
import { Button } from 'react-bootstrap';
import { IoPizzaOutline, IoFastFoodOutline } from 'react-icons/io5';
import { FiCoffee } from 'react-icons/fi';
import { RiCake3Line, RiCoupon2Line } from 'react-icons/ri';
import './scss/Category.scss';

export default function Category(props) {
  const sendCategory = (category) => {
    props.parentsFunc(category);
  };

  return (
    <div className="categoryContainer">
      <div className="text">
        <h5>카테고리</h5>
      </div>
      <div className="buttons">
        <Button onClick={() => sendCategory('chicken_pizza')} variant="outline-warning" className="mybutton">
          <IoPizzaOutline size="3rem" className="icon" />
          <p>치킨/피자</p>
        </Button>
        <Button onClick={() => sendCategory('coffee')} variant="outline-success" className="mybutton">
          <FiCoffee size="3rem" />
          <p>커피/음료</p>
        </Button>
        <Button onClick={() => sendCategory('dessert')} variant="outline-danger" className="mybutton">
          <RiCake3Line size="3rem" />
          <p>디저트</p>
        </Button>
        <Button onClick={() => sendCategory('burger')} variant="outline-primary" className="mybutton">
          <IoFastFoodOutline size="3rem" />
          <p>햄버거</p>
        </Button>
        <Button onClick={() => sendCategory('etc')} variant="outline-secondary" className="mybutton">
          <RiCoupon2Line size="3rem" />
          <p>기타</p>
        </Button>
      </div>
    </div>
  );
}
