const LogoutProcess = () => {
  localStorage.removeItem('isLoggedin');
  localStorage.removeItem('id');
  localStorage.removeItem('role');
  localStorage.removeItem('token');
};

export default LogoutProcess;
