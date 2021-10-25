const getId = () => {
  const info = JSON.parse(localStorage.getItem('persist:root'));
  const auth = JSON.parse(info.Auth);
  // console.log(auth);
  return auth.userInfo.id;
};
export default getId;
