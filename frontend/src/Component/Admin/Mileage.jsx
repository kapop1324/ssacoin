/* eslint-disable */
import React, { useEffect, useState } from 'react';
import UserListApi from '../../API/Admin/UserList';
import SendMileageApi from '../../API/Admin/SendMileage';
import MyAlert from '../Common/MyAlert';
import MySpinner from '../Common/MySpinner';
import './scss/Mileage.scss'

const Mileage = () => {

  const [userList,setUserList] = useState([]);
  const [user, setUser] = useState();
  const [mileage, setMileage] = useState("");
  const [alertIsOpen,setAlertOpen] = useState(false);
  const [alertComment, setAlertComment] = useState();
  const [spinnerIsOpen,setSpinnerOpen] = useState(false);

  useEffect(async()=>{
    const response = await UserListApi();
    if (response.status === 200) { // 응답 성공
      if (response.result.toLowerCase() === 'success') { // 리스트 가져오기 성공
        setUserList(response.userList);
      } else {
        //console.log('유저리스트 가져오기 실패');
      }
    } else {
      //console.log('응답 실패');
    }
  }, [])

  const HandlerClick = async() => {

    setSpinnerOpen(true);
    const response = await SendMileageApi(user, mileage);
    setSpinnerOpen(false);

    if (response.status === 200) { // 응답 성공
      if (response.result.toLowerCase() === 'success') { // 마일리지 보내기 성공
        setAlertComment("adminMileageSuccess");
        setAlertOpen(true);
      } else {
        setAlertComment("adminMileageFail");
        setAlertOpen(true);
      }
    } else {
      setAlertComment("adminMileageFail");
      setAlertOpen(true);
    }
  }
  
  return (
    <div className="sendMileage">
      <select className="selectbox" onChange={(e) => { setUser(e.target.value); }}>
      <option value="none" hidden>교육생을 선택해주세요.</option>
        {userList.map((user)=>{
          return <option key={user.id} value={user.id}>{user.id}</option>
        })}
      </select>
      <input className="input" type="number" 
        id="mileage" name="mileage" value={mileage} placeholder="마일리지를 입력해주세요." 
          onChange={(e) => { setMileage(e.target.value); }} />
      <button className="button" onClick={()=>HandlerClick()}>전송</button>
    
      {/* 알림창 */}
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

export default Mileage;