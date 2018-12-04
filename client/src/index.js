import auth from './auth';

window.onload = async () => {
  const userUrl = 'https://sendit-courier.herokuapp.com/index.html';
  const adminUrl = 'https://sendit-courier.herokuapp.com/admin.html';
  const token = localStorage.getItem('token');
  if (token !== null) {
    const isValid = auth();
    try {
      if (isValid === 'User') {
        window.location.replace(userUrl);
      } else window.location.replace(adminUrl);
      // window.location.href(link);
    } catch (err) {
      if (err) {
        window.location.replace('https://sendit-courier.herokuapp.com/');
        // window.location.href('./index.html');
      }
    }
  }
};
