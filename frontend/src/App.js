import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import './App.css';
import { FaArrowUp } from 'react-icons/fa';
import isLoggedin from './lib/isLoggedin';
import getRole from './lib/getRole';
import Main from './Component/Main/Index';
import Login from './Component/Auth/Login';
import SignUp from './Component/Auth/SignUp';
import MyPage from './Component/Auth/MyPage';
import Market from './Component/Market/Index';
import Shop from './Component/Shop/Index';
import MyCoupon from './Component/MyCoupon/Index';
import Admin from './Component/Admin/Index';
import About from './Component/About/Index';
import NavBar from './Component/Common/NavBar';
import Footer from './Component/Common/Footer';
import PublicRoute from './lib/PublicRoute';
import UserRoute from './lib/UserRoute';
import AdminRoute from './lib/AdminRoute';

function App() {
  const toTop = async () => {
    window.scrollTo(0, 0);
  };

  return (
    <div className="App">
      <BrowserRouter>
        {isLoggedin() && getRole().toLowerCase() === 'user' ? <NavBar /> : null}
        <Switch>
          <PublicRoute exact path="/ssacoinlogin" component={Login} />
          <PublicRoute exact path="/signup" component={SignUp} />
          <UserRoute exact path="/mypage" component={MyPage} />
          <UserRoute exact path="/market" component={Market} />
          <UserRoute exact path="/shop" component={Shop} />
          <UserRoute exact path="/mycoupon" component={MyCoupon} />
          <UserRoute exact path="/about" component={About} />
          <UserRoute exact path="/" component={Main} />
          <AdminRoute exact path="/admin" component={Admin} />
        </Switch>
        {isLoggedin() && getRole().toLowerCase() === 'user' ? <Footer /> : null}
      </BrowserRouter>
      <button id="to-top" onClick={toTop}>
        <FaArrowUp size="1rem" />
      </button>
    </div>
  );
}

export default App;
