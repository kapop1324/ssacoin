const LoginProcess = (response) => {
  localStorage.setItem('isLoggedin', true);
  localStorage.setItem('id', response.id);
  localStorage.setItem('role', response.role);
  localStorage.setItem('token', response.token);
};

export default LoginProcess;
