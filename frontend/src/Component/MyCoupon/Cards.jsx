import React, { useState } from 'react';
import { Card } from 'react-bootstrap';
import './scss/Card.scss';
import MyModal from '../Common/MyModal';
import MyAlert from '../Common/MyAlert';
import useMyCouponAPI from '../../API/MyCoupn/Use';

export default function Cards({
  imgUrl, title, price, myCouponDetail,
}) {
  const [isOpen, setOpen] = useState(false);
  const [alertComment, setAlertComment] = useState('');
  const [alertIsOpen, setAlertOpen] = useState(false); // alert 미리 열려있을지

  const handleSubmit = async (couponId) => {
    setOpen(false);
    const response = await useMyCouponAPI(couponId);

    if (response.status === 200) { // 응답 성공
      if (response.result.toLowerCase() === 'success') { // 로그인 성공
        setAlertComment('myCoupon');
        setAlertOpen(true);
      } else {
        // console.log('사용 실패');
      }
    } else {
      // console.log('응답 실패');
    }
  };
  const handleCancel = () => setOpen(false);

  return (
    <div>
      <Card onClick={() => setOpen(true)}>
        <Card.Img variant="top" src={`http://j5c202.p.ssafy.io:8080/${imgUrl}`} />
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Text>
            {price}
            {' '}
            <span>
              Coin
            </span>
          </Card.Text>
        </Card.Body>
      </Card>

      <MyModal
        isOpen={isOpen}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        type="myCoupon"
        title="쿠폰 상세정보"
        photo={`http://j5c202.p.ssafy.io:8080/${imgUrl}`}
        detail={myCouponDetail}
        submitName="사용하기"
      />

      <MyAlert
        isOpen={alertIsOpen}
        alertOpen={setAlertOpen}
        type="myCoupon"
        comment={alertComment}
        reload="/mycoupon"
      />
    </div>
  );
}
