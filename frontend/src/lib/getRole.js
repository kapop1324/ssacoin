const getRole = () => {
  const info = JSON.parse(localStorage.getItem('persist:root'));
  const auth = JSON.parse(info.Auth);
  return auth.userInfo.role;
};

export default getRole;
