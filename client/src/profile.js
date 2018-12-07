import Controller from './controller';
import auth from './auth';

const logout = document.getElementById('logout');
const newOrder = document.getElementById('new');
const pending = document.getElementById('pending');
const delivered = document.getElementById('delivered');
let newOrders = [];
let pendingOrders = [];
let deliveredOrders = [];

const baseUrl = 'https://sendit-courier.herokuapp.com/api/v1';

const controller = new Controller(baseUrl);
const token = localStorage.getItem('token');
const userId = localStorage.getItem('userId');

// Get User Parcel Order History
async function getMenu() {
  try {
    const method = {
      method: 'GET',
      headers: {
        Accept: 'text/plain, application/json, */*',
        'Content-type': 'application/json',
        'x-access-token': token,
      },
    };
    const data = await controller.post(`/users/${userId}/parcels`, method);
    document.querySelector('#user').innerHTML = `Hi! ${data.user}`;
    if (data.success === 'true') {
      data.order.forEach((post) => {
        if (post.orderStatus === 'New') {
          const model = `<div id="shipmentOrderPreview" class='new'>
        <div id="createShipmentPreview" class="createShipmentPreview">
            <form class="fromPreview" id="fromPreview">
                <div class="img_login">
                    <h2> From </h2>
                </div>
                <div id="fromParticulars">
                    <b>Name :</b>
                    <p id="fromName" class="previewName">${post.fromName}</p><br>
                    <b>Address :</b>
                    <p id="fromAddress" class="previewAddress">${post.fromAddress}</p><br>
                    <b>Email Address :</b>
                    <p id="fromEmail" class="previewEmail">${post.fromEmail}</p><br>
                </div>
            </form>
            <section class="particulars"></section>
            <form class="toPreview" id="toPreview">
                <div class="img_login">
                    <h2> To </h2>
                </div>

                <div id="toParticulars">
                    <b>Name :</b>
                    <p id="toName" class="previewName">${post.toName}</p><br>
                    <b>Address :</b>
                    <p id="toAddress" class="previewAddressTo">${post.toAddress}</p><br>
                    <b>Email Address :</b>
                    <p id="toEmail" class="previewEmail">${post.toEmail}</p><br>
                </div>
            </form>
            <section class="particulars"></section>
            <!-- Parcel Details Section -->
            <div id="parcel">
                <h2> Parcel Details </h2>
                <div id="parcelParticulars">
                    <b>Type:</b>
                    <p id="parcelPreferencePreview">${post.type}</p><br>
                    <b>weight(kg):</b>
                    <p id="weightPreview">${post.weight}</p>
                    <p> kg </p>
                    <br>
                    <b>Price :</b>
                    <p id="parcelPreferencePreview">&#8358;${post.price}</p><br>
                    <b>Date of Order:</b>
                    <p id="parcelPreferencePreview">${post.createdAt}</p>
                </div>
            </div>
        </div>


    </div>`;

          newOrders += model;
          newOrder.innerHTML = newOrders;
        }
        if (post.orderStatus === 'Pending') {
          const model = `<div id="shipmentOrderPreview" class='pending'>
        <div id="createShipmentPreview" class="createShipmentPreview">
            <form class="fromPreview" id="fromPreview">
                <div class="img_login">
                    <h2> From </h2>
                </div>
                <div id="fromParticulars">
                    <b>Name :</b>
                    <p id="fromName" class="previewName">${post.fromName}</p><br>
                    <b>Address :</b>
                    <p id="fromAddress" class="previewAddress">${post.fromAddress}</p><br>
                    <b>Email Address :</b>
                    <p id="fromEmail" class="previewEmail">${post.fromEmail}</p><br>
                </div>
            </form>
            <section class="particulars"></section>
            <form class="toPreview" id="toPreview">
                <div class="img_login">
                    <h2> To </h2>
                </div>

                <div id="toParticulars">
                    <b>Name :</b>
                    <p id="toName" class="previewName">${post.toName}</p><br>
                    <b>Address :</b>
                    <p id="toAddress" class="previewAddressTo">${post.toAddress}</p><br>
                    <b>Email Address :</b>
                    <p id="toEmail" class="previewEmail">${post.toEmail}</p><br>
                </div>
            </form>
            <section class="particulars"></section>
            <!-- Parcel Details Section -->
            <div id="parcel">
                <h2> Parcel Details </h2>
                <div id="parcelParticulars">
                    <b>Type:</b>
                    <p id="parcelPreferencePreview">${post.type}</p><br>
                    <b>weight(kg):</b>
                    <p id="weightPreview">${post.weight}</p>
                    <p> kg </p>
                    <br>
                    <b>Price :</b>
                    <p id="parcelPreferencePreview">&#8358;${post.price}</p><br>
                    <b>Date of Order:</b>
                    <p id="parcelPreferencePreview">${post.createdAt}</p>
                </div>
            </div>
        </div>


    </div>`;

          pendingOrders += model;
          pending.innerHTML = pendingOrders;
        }
        if (post.orderStatus === 'Delivered') {
          const model = `<div id="shipmentOrderPreview" class='delivered'>
        <div id="createShipmentPreview" class="createShipmentPreview">
            <form class="fromPreview" id="fromPreview">
                <div class="img_login">
                    <h2> From </h2>
                </div>
                <div id="fromParticulars">
                    <b>Name :</b>
                    <p id="fromName" class="previewName">${post.fromName}</p><br>
                    <b>Address :</b>
                    <p id="fromAddress" class="previewAddress">${post.fromAddress}</p><br>
                    <b>Email Address :</b>
                    <p id="fromEmail" class="previewEmail">${post.fromEmail}</p><br>
                </div>
            </form>
            <section class="particulars"></section>
            <form class="toPreview" id="toPreview">
                <div class="img_login">
                    <h2> To </h2>
                </div>

                <div id="toParticulars">
                    <b>Name :</b>
                    <p id="toName" class="previewName">${post.toName}</p><br>
                    <b>Address :</b>
                    <p id="toAddress" class="previewAddressTo">${post.toAddress}</p><br>
                    <b>Email Address :</b>
                    <p id="toEmail" class="previewEmail">${post.toEmail}</p><br>
                </div>
            </form>
            <section class="particulars"></section>
            <!-- Parcel Details Section -->
            <div id="parcel">
                <h2> Parcel Details </h2>
                <div id="parcelParticulars">
                    <b>Type:</b>
                    <p id="parcelPreferencePreview">${post.type}</p><br>
                    <b>weight(kg):</b>
                    <p id="weightPreview">${post.weight}</p>
                    <p> kg </p>
                    <br>
                    <b>Price :</b>
                    <p id="parcelPreferencePreview">&#8358;${post.price}</p><br>
                    <b>Date of Order:</b>
                    <p id="parcelPreferencePreview">${post.createdAt}</p>
                </div>
            </div>
        </div>


    </div>`;

          deliveredOrders += model;
          delivered.innerHTML = deliveredOrders;
        }
        if (post.orderStatus !== 'New') {
          newOrder.innerHTML = '<p id=\'errorMsg\'>No new Shipment. Please create a shipment</p>';
        }
        if (post.orderStatus !== 'Pending') {
          pending.innerHTML = '<p id=\'errorMsg\'>No Pending Shipment</p>';
        }
        if (post.orderStatus !== 'Delivered') {
          delivered.innerHTML = '<p id=\'errorMsg\'>No Delivered Shipment</p>';
        }
      });
      const deliveredNum = data.order.filter(item => item.orderStatus === 'Delivered').length;
      document.querySelector('#deliveredNumber').innerHTML = deliveredNum;
      const pendingNum = data.order.filter(item => (item.orderStatus === 'Pending') || (item.orderStatus === 'New')).length;
      document.querySelector('#pendingNumber').innerHTML = pendingNum;
    }
  } catch (err) {
    if (err) {
      alert('Network Error, Please check your network connection and try again');
    }
  }
}
// initiate login when the token is invalid or has expired
window.onload = async () => {
  const validity = await auth();
  if (validity === 'Failed') {
    return logout.click();
  }
  getMenu();
};
