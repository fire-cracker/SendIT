import Controller from './controller';

const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const loginEmail = document.getElementById('loginEmail');
const loginPassword = document.getElementById('loginPassword');
const submitBtn = document.getElementById('submitBtn');
const loginBtn = document.getElementById('loginBtn');

const baseUrl = 'https://sendit-courier.herokuapp.com/api/v1';

const controller = new Controller(baseUrl);

// submits a registration data
submitBtn.addEventListener('click', async (e) => {
  e.preventDefault();
  try {
    const body = JSON.stringify({
      userName: username.value,
      userEmail: email.value,
      userPassword: password.value,
    });
    const method = {
      method: 'POST',
      headers: {
        Accept: 'text/plain, application/json, */*',
        'Content-type': 'application/json',
      },
      body,
    };
    const data = await controller.post('/auth/signup', method);
    console.log(data);
  } catch (err) {
    if (err) {
      alert('Network Error, Please check your network connection and try again');
    }
  }
});

// submits a login data for validation
loginBtn.addEventListener('click', async (e) => {
  e.preventDefault();
  try {
    const body = JSON.stringify({
      userEmail: loginEmail.value,
      userPassword: loginPassword.value,
    });
    const method = {
      method: 'POST',
      headers: {
        Accept: 'text/plain, application/json, */*',
        'Content-type': 'application/json',
      },
      body,
    };
    const data = await controller.post('/auth/login', method);
    console.log(data);
    if (data.userEmail === 'true') {
      localStorage.setItem('token', data.token);
    }
    if (data.user.userRole !== 'User') {
      console.log(data.userRole);
      window.location.replace('https://sendit-courier.herokuapp.com/home.html');
    } else window.location.replace('https://sendit-courier.herokuapp.com/admin.html');
  } catch (err) {
    if (err) {
      console.log('Network Error, Please check your network connection and try again');
    }
  }
});
