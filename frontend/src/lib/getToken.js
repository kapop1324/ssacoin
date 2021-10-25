const getToken = () => {
  const info = JSON.parse(localStorage.getItem('persist:root'));
  const auth = JSON.parse(info.Auth);
  return auth.userInfo.token;
};
export default getToken;
