/* eslint-disable */
import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import './scss/MyModal.scss'
import MyButton from './MyButton';
import getMyCouponAPI from '../../API/MyCoupn/Product';
import getId from '../../lib/getId';


/*
1. isOpen: true - 모달창이 미리 열려있음, false - 모달창이 닫혀있음
2. onSubmit: 확인 눌렀을 때 이벤트
3. onCancel: 취소 눌렀을 때 이벤트
4. title: 모달창 제목
5. photo: 사진
6. detail: 내용
7. submitName: 확인 버튼 이름
*/
const MyModal = ({isOpen, onSubmit, onCancel, type, title, photo, detail, submitName, shopPhoto}) => {

  const [couponPhoto, setCouponPhoto] = useState(photo);
  // const [shopImg, setShopImg] = useState('');
  const [myCoupons, setMyCoupons] = useState([]);
  const [loginUser, setloginUser] = useState([]);

  useEffect(async () => {
    const user = getId();
    setloginUser(user);
    const response = await getMyCouponAPI(user);
    setMyCoupons(response.res.data.Coupons);
  }, []);

  /* 모달 스타일 */
  const webCustomStyles = {
    content: {
      top: '53%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      width : '65vw',
      height : '81vh',
      borderRadius: '10px',
    },
  };

  const mobileCustomStyles = {
    content: {
      top: '47%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      width : '65vw',
      height : '65vh',
      borderRadius: '10px',
    },
  };

  const renderStyle = () => {
    if (window.innerWidth <= 768) {
      return mobileCustomStyles;
    }
    return webCustomStyles;
  }

  
  /* 페이지에 따른 상세내역(detail) 변경 */
  //페이지 : shop

  const shopDetail = () => {
    /* 확인 버튼 핸들러 */
    const handleClickSubmit = () => onSubmit();
    /* 취소 버튼 핸들러 */
    const handleClickCancel = () => onCancel();
    return(
      <div className="detail">
        {/* 상세내역 */}
        <div className="textGroup">
          <div className="item">
            <p className="label">쿠폰 이름</p>
            <p className="text">{detail.name}</p>
          </div>
          <div className="item">
            <p className="label">쿠폰 가격</p>
            <p className="text">{detail.price}M</p>
          </div>
        </div>
        {/* 버튼 */}
        <div className="button">
          <MyButton shopGreen onClick={handleClickSubmit}>{submitName}</MyButton>
          <MyButton shopGray className="cancel" onClick={handleClickCancel}>돌아가기</MyButton>
        </div>
      </div>
    )
  }
  //페이지 : 마켓 판매
  const marketSellDetail = () => {
    const [sellCouponId, setsellCouponId] = useState("");
    const [sellCouponName, setSellCouponName] = useState("");
    const [sellCouponEnd, setSellCouponEnd] = useState("");
    const [couponMileage, setcouponMileage] = useState("");
    const [sellTitle, setSellTitle] = useState("");
    const [sellPrice, setSellPrice] = useState("");
    const [acceptChk, setAcceptChk] = useState(false);
    const handleClickSubmit = () => 
    {
      if (acceptChk) {
        onSubmit({
          tradeRequestId :loginUser, 
          tradeCouponId : sellCouponId,
          tradeTitle :sellTitle,
          tradeMileage :sellPrice,
          couponMileage : couponMileage,
        });
      }      
    }
    const handleClickCancel = () => onCancel();
    let currentValue = sellCouponId || "DEFAULT";
    return(
      <div className="detail">
        <div className="textGroup">
          <div className="item">
            <p className="label">쿠폰 선택</p>
            <select className="input" 
              id="sellCoupon" 
              name="sellCoupon"
              aria-label="쿠폰 선택"
              value={currentValue} 
              onChange={
                (e) => { 
                  myCoupons.map((selectCoupon) => {
                    if (selectCoupon.couponId === e.target.value) {
                      setSellCouponName(selectCoupon.couponName); 
                      setSellCouponEnd(selectCoupon.couponEnd);
                      setCouponPhoto(selectCoupon.productImg);
                      setsellCouponId(selectCoupon.couponId);
                      setcouponMileage(selectCoupon.couponMileage);
                    }
                  })
                }
              }>
                <option value="DEFAULT" hidden style={{ color: "#ccc" }}>
                  ---쿠폰 선택--- 
                </option>
                {myCoupons.length !== 0 && myCoupons.map((coupon, index) => {
                  return (
                    <option key={index} 
                    value={coupon.couponId}
                    >{coupon.couponName}</option>
                  )
                })}
            </select>
          </div>
          <div className="item">
            <p className="label">쿠폰 이름</p>
            <p className="text">{sellCouponName}</p>
          </div>
          <div className="item">
            <p className="label">유효 기간</p>
            <p className="text">{sellCouponEnd.slice(0, 10)}</p>
          </div>
          <div className="item">
            <p className="label">제목</p>
            <input className="input" type="text" id="sellTitle" value={sellTitle} onChange={(e) => { setSellTitle(e.target.value); }} />
          </div>
          <div className="item">
            <p className="label">쿠폰 가격</p>
            <input className="input" type="text" id="sellTitle" value={sellPrice} onChange={(e) => { setSellPrice(e.target.value); }} />
          </div>
          <div className="item">
            <p className="check">* 이미 사용한 쿠폰을 등록하거나 허위로 상품을 등록 시 '형법 제 347조 사기'에 의거하여 처벌받을 수 있습니다.</p>
          </div>
          <div className="item">
            <p className="chkLabel">동의하기</p>
            <input className="chkInput" type="checkbox" id="sellTitle" value={acceptChk} onChange={(e) => { setAcceptChk(! acceptChk); }} />
            { acceptChk ? null : <div className="fill"> * 필수항목입니다!</div>}
          </div>
          
        </div>
        <div className="button">
          <MyButton p2pModalYellow onClick={handleClickSubmit}>{submitName}</MyButton>
          <MyButton p2pModalGray className="cancel" onClick={handleClickCancel}>돌아가기</MyButton>
        </div>
      </div>
    )
  }
  //페이지 : 마켓 구매
  const marketBuyDetail = () => {
    const handleClickSubmit = () => onSubmit();
    const handleClickCancel = () => onCancel();
    return(
      <div className="detail">
        <div className="textGroup">
          <div className="item">
            <p className="label">쿠폰 이름</p>
            <p className="text">{detail.name}</p>
          </div>
          <div className="item">
            <p className="label">쿠폰 가격</p>
            <p className="text">{detail.price}M</p>
          </div>
          <div className="item">
            <p className="label">유효 기간</p>
            <p className="text">{detail.period}</p>
          </div>
          <div className="item">
            <p className="label">판매자</p>
            <p className="text">{detail.seller}</p>
          </div>
        </div>
        <div className="button">
          <MyButton p2pBlue onClick={handleClickSubmit}>{submitName}</MyButton>
          <MyButton p2pGray2 className="cancel" onClick={handleClickCancel}>돌아가기</MyButton>
        </div>
      </div>
    )
  }
  //페이지 : 쿠폰 관리
  const myCouponDetail = () => {
    const handleClickSubmit = () => onSubmit(detail.couponId);
    const handleClickCancel = () => onCancel();
    return(
      <div className="detail">
        <div className="textGroup">
          <div className="item">
            <p className="label">쿠폰 이름</p>
            <p className="text">{detail.name}</p>
          </div>
          <div className="item">
            <p className="label">쿠폰 가격</p>
            <p className="text">{detail.price}M</p>
          </div>
          <div className="item">
            <p className="label">유효 기간</p>
            <p className="text">{detail.period}</p>
          </div>
          <div className="item">
            <p className="label">코멘트</p>
            <p className="text">{detail.comment}</p>
          </div>
        </div>
        <div className="button">
          <MyButton myCouponYellow onClick={handleClickSubmit}>{submitName}</MyButton>
          <MyButton myCouponGray className="cancel" onClick={handleClickCancel}>돌아가기</MyButton>
        </div>
      </div>
    )
  }
  //페이지 : 관리자
  const adminDetail = () => {
    const [sendData,setSendData] = useState({
      number: "",
      period: "",
      comment: "",
      photo: new Blob(),
    })
    const handleClickSubmit = () => {
      onSubmit(sendData, detail.requestIdx);
    }
    const handleClickCancel = () => {
      setSendData({
        number: "",
        period: "",
        comment: "",
        photo: new Blob(),
      });
      setCouponPhoto(photo);
      onCancel();
    }

    /* 이미지 추가 함수 */
    const addImage = (e) => {
      if(e.target.files.length === 0) return;
      // 보낼 form에 이미지 넣기
      const nowSelectImage = e.target.files[0];
      setSendData({...sendData, photo: nowSelectImage});

      // 현재 보이는 이미지 변경
      const ImageUrl = URL.createObjectURL(nowSelectImage);
      setCouponPhoto(ImageUrl);
    }
    return(
      <div className="detail">
        <div className="textGroup">
          <div className="groupFile">
          <label htmlFor="file" className="file-label">
            쿠폰 이미지 첨부
            <input 
              name="file"
              key="file"
              type="file"
              id="file"
              style={{display: 'none'}}
              accept=".jpg,.jpeg,.png"
              onChange={(e) => addImage(e)}
            />
          </label>
          </div>
          <div className="item">
            <p className="label">쿠폰 이름</p>
            <p className="text">{detail.name}</p>
          </div>
          <div className="item">
            <p className="label">받는 사람</p>
            <p className="text">{detail.receiver}</p>
          </div>
          <div className="item">
            <p className="label">쿠폰 번호</p>
            <input className="input" type="text" id="number" value={sendData.number} onChange={(e) => { setSendData({...sendData, number:e.target.value});}} />
          </div>
          <div className="item">
            <p className="label">유효 기간</p>
            <input className="input" type="date" id="period" value={sendData.period} onChange={(e) => { setSendData({...sendData, period:e.target.value}); }} />
          </div>
          <div className="item">
            <p className="label">코멘트</p>
            <textarea className="input textarea" rows="1" type="text" id="sellTitle" value={sendData.comment} onChange={(e) => { setSendData({...sendData, comment:e.target.value}); }} />
          </div>
        </div>
        <div className="button">
          <MyButton green onClick={handleClickSubmit}>{submitName}</MyButton>
          <MyButton adminGray className="cancel" onClick={handleClickCancel}>돌아가기</MyButton>
        </div>
      </div>
    )
  }

  const typeDetail = {
    shop : shopDetail(),
    marketSell : marketSellDetail(),
    marketBuy : marketBuyDetail(),
    myCoupon : myCouponDetail(),
    admin : adminDetail(),
  }

  return (
      <Modal isOpen={isOpen} style={renderStyle()}>
        {/* 제목 */}
        <div className="title"> {title} </div>

        {/* 내용 */}
        <div className="content">
          <div className="img">
          {shopPhoto ?
            <img className="photo" src={shopPhoto} alt="쿠폰이미지"/>
            : <img className="photo" src={couponPhoto} alt="쿠폰이미지"/>
          }
          </div>
          { typeDetail[type] }
        </div>
      </Modal>
  );
};

export default MyModal;