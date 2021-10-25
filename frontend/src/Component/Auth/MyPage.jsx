/* eslint-disable no-unused-expressions */
/* eslint-disable array-callback-return */
import React, { useState, useEffect } from 'react';
import './scss/MyPage.scss';
import { HistoryApi } from '../../API/Auth/User';
import Board from './Board';
import Banner from '../Common/MyBanner';
import Milege from './Milege';
import imgUrl from '../../Assets/mypageBanner.jpeg';
import getId from '../../lib/getId';

const Mypage = () => {
  const title = 'MYPAGE';
  /* 누적 마일지 값 */
  const [sum, setSum] = useState([]); // [누적 판매 마일리지, 누적 구매 마일리지]
  /* 쿠폰샵 구매 내역 */
  const [request, setRequest] = useState([]);
  /* p2p 구매 내역 */
  const [tradeBuy, setTradeBuy] = useState([]);
  /* p2p 판매 내역 */
  const [tradeSell, setTradeSell] = useState([]);
  /* table에 넣을 데이터 */
  const [tableData, setTableData] = useState([]);

  useEffect(async () => {
    window.scrollTo(0, 0);
    const response = await HistoryApi(getId());
    let sumSell = 0;
    let sumBuy = 0;

    // 쿠폰샵 구매
    const arr1 = [];
    response.request.length !== 0
      && response.request.map((item) => {
        if (item.requestStatus.toString() === '1') {
          arr1.push({
            idx: item.requestIdx,
            date: item.requestDate,
            coupon: item.requestProductName,
            milege: item.requestMileage,
          });
          sumBuy += Number(item.requestMileage);
        }
      });
    setRequest(arr1);

    // 중고거래 구매
    const arr2 = [];
    response.tradeBuy.length !== 0
      && response.tradeBuy.map((item) => {
        if (item.tradeStatus.toString() === '1') {
          arr2.push({
            idx: item.tradeIdx,
            date: item.tradeDate,
            coupon: item.couponName,
            milege: item.tradeMileage,
          });
          sumBuy += Number(item.tradeMileage);
        }
      });
    setTradeBuy(arr2);

    // 중고거래 판매
    const arr3 = [];
    response.tradeSell.length !== 0
      && response.tradeSell.map((item) => {
        if (item.tradeStatus.toString() === '0') {
          arr3.push({
            idx: item.tradeIdx,
            date: item.tradeDate,
            coupon: item.couponName,
            milege: item.tradeMileage,
          });
        } else {
          sumSell += Number(item.tradeMileage);
        }
      });
    setTradeSell(arr3);

    // 누적 거래
    setSum([sumSell.toString(), sumBuy.toString()]);
  }, []);

  return (
    <div className="mypage">
      {/* 배너 */}
      <Banner
        imgUrl={imgUrl}
        title={title}
      />

      <div className="container">
        {/* 기본 정보 */}
        <Board history={sum} />

        {/* 버튼 */}
        <div className="dataSelect">
          <div className="form-check form-check-inline">
            <label className="form-check-label" htmlFor="inlineRadio1">
              <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1" onChange={() => setTableData(request)} />
              쿠폰샵 구매
            </label>
          </div>
          <div className="form-check form-check-inline">
            <label className="form-check-label" htmlFor="inlineRadio2">
              <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2" onChange={() => setTableData(tradeBuy)} />
              중고거래 구매
            </label>
          </div>
          <div className="form-check form-check-inline">
            <label className="form-check-label" htmlFor="inlineRadio3">
              <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio3" value="option3" onChange={() => setTableData(tradeSell)} />
              중고거래 판매중
            </label>
          </div>
        </div>

        {/* 마일리지 내역 */}
        <Milege data={tableData} />
      </div>
    </div>
  );
};

export default Mypage;
