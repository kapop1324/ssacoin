const isLoggedin = () => {
  const info = JSON.parse(localStorage.getItem('persist:root'));
  if (!info) return null;

  const auth = JSON.parse(info.Auth);
  return auth.isLoggedIn;
};
export default isLoggedin;
