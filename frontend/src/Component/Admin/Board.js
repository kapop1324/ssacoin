/* eslint-disable */
import React, { useState } from 'react';
import './scss/Board.scss'
import ApproveApi from '../../API/Admin/Approve';
import MyModal from '../Common/MyModal';
import MyAlert from '../Common/MyAlert';
import MySpinner from '../Common/MySpinner';
import imgUrl from '../../Assets/noFile.jpg'

const Board = ({data}) => {
  /* modal 변수 */
  const [isOpen, setOpen] = useState(false); // 모달 미리 열려있을지
  const [adminDetail, setDetail] = useState({name: "", receiver: "", requestIdx: ""});
  
  /* alert 변수 */
  const [alertComment, setAlertComment] = useState("");
  const [alertIsOpen,setAlertOpen] = useState(false); // alert 미리 열려있을지
  
  /* spinner 변수 */
  const [spinnerIsOpen,setSpinnerOpen] = useState(false);
  
  /* 모달에서 취소 버튼 눌렀을 때 */
  const handleCancel = () => setOpen(false);

  /* 모달에서 확인 버튼 눌렀을 때 */
  const onSubmit = async (sendData, requestIdx) => {

    const data = new FormData();
    data.append('couponId', sendData.number);
    data.append('couponEnd', sendData.period);
    data.append('couponComment', sendData.comment);
    data.append('request_idx', requestIdx.toString());
    data.append('image', sendData.photo);
    
    setSpinnerOpen(true);
    const response = await ApproveApi(data);
    setSpinnerOpen(false);

    if (response.status === 200) { // 응답 성공
      setOpen(false);
      if (response.result.toLowerCase() === 'success') { 
        setAlertComment("adminSuccess");
      } else {
        setAlertComment("adminFail");
      }
      setAlertOpen(true);
    } else {
      setAlertComment("adminFail");
      setAlertOpen(true);
    }
  }

  /* 상세 내역 클릭 핸들러 */
  const handlerClick = (status, name, receiver, requestIdx) => {
    // 승인 완료 클릭 불가능
    if(status === '1') return;
    setDetail({name, receiver, requestIdx});
    setOpen(true);
  }

  return (
    <div className="board">
      {/* 승인 요청 및 승인 완료 */}
      <div className="table-responsive">
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">날짜</th>
              <th scope="col">상품명</th>
              <th scope="col">받는사람</th>
            </tr>
          </thead>
          <tbody>
          {data.length !== 0 && data.map((item, index) => {
            return (
              <tr key={item.requestIdx} onClick={()=>handlerClick(item.requestStatus, item.requestProductName, item.requestId, item.requestIdx)}>
                <th scope="row">{index+1}</th>
                <td>{item.requestDate.substring(2,10)}</td>
                <td>{item.requestProductName}</td>
                <td>{item.requestId}</td>
              </tr>
            )
          })}
          </tbody>
        </table>
      </div>
      
      {/* 모달 */}
      <MyModal 
      isOpen={isOpen}
      onSubmit={onSubmit}
      onCancel={handleCancel}
      type="admin"
      title="승인 요청"
      photo={imgUrl}
      detail={adminDetail} 
      submitName="승인하기"
      />

      {/* alert */}
      <MyAlert 
        isOpen={alertIsOpen}
        alertOpen={setAlertOpen}
        type="admin"
        comment={alertComment}
        reload="/admin"
      />

      {/* spinner */}
      <MySpinner 
      isOpen={spinnerIsOpen}
      type="shop"
      />
    </div>
  )
}

export default Board;