import Controller from './controller';
import auth from './auth';

const logout = document.getElementById('logout');
const previewButton = document.getElementById('previewButton');
const fromName = document.getElementById('fromName');
const fromAddress = document.getElementById('fromAddress');
const fromEmail = document.getElementById('fromEmail');
const toName = document.getElementById('toName');
const toAddress = document.getElementById('toAddress');
const toEmail = document.getElementById('toEmail');
const type = document.getElementById('type');
const weight = document.getElementById('weight');

const baseUrl = 'https://sendit-courier.herokuapp.com/api/v1';

const controller = new Controller(baseUrl);


// initiate login when the token is invalid or has expired
window.onload = async () => {
  const validity = await auth();
  if (validity === 'Failed') {
    return logout.click();
  }
};

previewButton.addEventListener('click', async (e) => {
  e.preventDefault();
  try {
    const body = JSON.stringify({
      fromName: fromName.value,
      fromAddress: fromAddress.value,
      fromEmail: fromEmail.value,
      toName: toName.value,
      toAddress: toAddress.value,
      toEmail: toEmail.value,
      type: type.value,
      weight: weight.value,
    });
    const method = {
      method: 'POST',
      headers: {
        Accept: 'text/plain, application/json, */*',
        'Content-type': 'application/json',
      },
      body,
    };
    const data = await controller.post('/parcels/', method);
    console.log(data);
  } catch (err) {
    if (err) {
      alert('Network Error, Please check your network connection and try again');
    }
  }
});


// window.onclick = function () {
//   if (event.target === loginSection) {
//     alert('Session timeout, Please login');
//   }
// };
