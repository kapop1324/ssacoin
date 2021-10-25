import React, { useState } from 'react';
import { Card } from 'react-bootstrap';
import './scss/Card.scss';
import MyModal from '../Common/MyModal';
import MyAlert from '../Common/MyAlert';
import MySpinner from '../Common/MySpinner';
import { UserErcApi } from '../../API/Auth/User';
import getId from '../../lib/getId';
import marketBuyApi from '../../API/Market/Buy';

export default function Cards({
  imgUrl, title, price, tradeTitle, marketBuyDetail, buyRequest,
}) {
  const [isOpen, setOpen] = useState(false);

  /* alert 변수 */
  const [alertComment, setAlertComment] = useState('');
  const [alertIsOpen, setAlertOpen] = useState(false); // alert 미리 열려있을지

  /* spinner 변수 */
  const [spinnerIsOpen, setSpinnerOpen] = useState(false);

  const handleCancel = () => setOpen(false);
  const handleSubmit = async () => {
    setOpen(false);

    // 현재 코인 비교
    let canBuy = false;
    const response = await UserErcApi(getId());
    if (response.status === 200) { // 응답 성공
      if (response.result && response.result.toLowerCase() === 'success') { // 코인 정보 가져오기 성공
        if (response.coin >= buyRequest.tradeMileage) canBuy = true;
        else canBuy = false;
      } else {
        // console.log('코인 정보 가져오기 실패');
      }
    } else {
      // console.log('응답 실패');
    }

    // 구매
    if (canBuy) { // 구매 가능
      setSpinnerOpen(true);
      const response2 = await marketBuyApi(buyRequest);
      setSpinnerOpen(false);

      if (response2.status === 200) { // 응답 성공
        if (response2.result.toLowerCase() === 'success') { // 구매 성공
          setAlertComment('success');
        } else {
          // console.log('구매 실패');
        }
      } else {
        // console.log('응답 실패');
        setAlertComment('adminFail');
      }
    } else { // 구매 불가능
      // console.log('실패');
      setAlertComment('fail');
    }
    setAlertOpen(true);
  };
  return (
    <div>
      <Card onClick={() => setOpen(true)}>
        <Card.Img variant="top" src={imgUrl} />
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
        type="marketBuy"
        title={tradeTitle}
        photo={imgUrl}
        detail={marketBuyDetail}
        submitName="구매하기"
      />

      <MyAlert
        isOpen={alertIsOpen}
        alertOpen={setAlertOpen}
        type="marketBuy"
        comment={alertComment}
        reload="/market"
      />

      {/* spinner */}
      <MySpinner
        isOpen={spinnerIsOpen}
        type="shop"
      />
    </div>
  );
}
