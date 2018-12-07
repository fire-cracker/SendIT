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


function cancelButtons() {
  const cancelButton = document.querySelectorAll('.cancelButton');
  cancelButton.forEach((order) => {
    order.addEventListener('click', async (e) => {
      const cancelled = order.nextElementSibling;
      cancelled.style.display = 'block';
      order.style.display = 'none';
      const parcelId = order.id;
      e.preventDefault();
      try {
        const body = JSON.stringify({
          orderStatus: 'Cancelled',
        });
        const method = {
          method: 'PUT',
          headers: {
            Accept: 'text/plain, application/json, */*',
            'Content-type': 'application/json',
            'x-access-token': token,
          },
          body,
        };
        await controller.post(`/parcels/${parcelId}/cancel/`, method);
      } catch (err) {
        if (err) {
          alert('Network Error, Please check your network connection and try again');
        }
      }
    });
  });
}

function editBtns() {
  const editButton = document.querySelectorAll('.editButton');
  editButton.forEach((order) => {
    order.addEventListener('click', (e) => {
      e.preventDefault();
      const submitButton = order.parentElement.nextElementSibling;
      submitButton.style.display = 'block';
      order.parentElement.style.display = 'none';
      const originalValue = order.previousElementSibling;
      const newValue = order.parentElement.nextElementSibling.children[1];
      newValue.value = originalValue.innerHTML;
    });
  });
}

function submitBtns() {
  const submitButtons = document.querySelectorAll('.submitButton');
  submitButtons.forEach((order) => {
    order.addEventListener('click', async (e) => {
      e.preventDefault();
      const editButton = order.parentElement.previousElementSibling;
      editButton.style.display = 'block';
      order.parentElement.style.display = 'none';
      const newValue = order.previousElementSibling;
      const originalValue = order.parentElement.previousElementSibling.children[1];
      originalValue.innerHTML = newValue.value;
      const parcelId = order.id;
      try {
        const body = JSON.stringify({
          toAddress: newValue.value,
        });
        const method = {
          method: 'PUT',
          headers: {
            Accept: 'text/plain, application/json, */*',
            'Content-type': 'application/json',
            'x-access-token': token,
          },
          body,
        };
        await controller.post(`/parcels/${parcelId}/destination/`, method);
      } catch (err) {
        if (err) {
          alert('Network Error, Please check your network connection and try again');
        }
      }
    });
  });
}
// Get User Parcel Order History
async function getOrder() {
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
    if (data.success === 'true') {
      data.order.forEach((post) => {
        if (post.orderStatus === 'New') {
          const model = `<div id="shipmentOrderPreview" class = 'new'>
                            <div id="createShipmentPreview" class="createShipmentPreview">
                                <form class="fromPreview" id="fromPreview">
                                    <div class="img_login">
                                            <h2> From </h2> 
                                    </div>
                                    <ul id="fromParticulars">
                                        <li><b>Name :</b> <p id="fromName" class="previewName">${post.fromName}</p></li>
                                        <li><b>Address :</b> <p id="fromAddress" class="previewAddress">${post.fromAddress}</p></li>
                                        <li><b>Email Address :</b> <p id="fromEmail" class="previewEmail">${post.fromEmail}</p></li>  
                                    </ul>
                                </form>
                                <section class="particulars"></section>
                                <form class="toPreview" id="toPreview">
                                    <div class="img_login">
                                        <h2> To </h2> 
                                    </div>
                                    <ul id="toParticulars">
                                        <li><b>Name :</b> <p id="toName" class="previewName">${post.toName}</p></li>   
                                        <li class="destination" id="destination">
                                            <b>Address :</b> <p class="toAddress" id="toAddress" >${post.toAddress}</p>
                                            <button id="editButton" class="editButton" type="submit">Edit</button>
                                        </li>
                                        <li class="newDestination" id="newDestination">
                                            <b>Address :</b> <input type="text" class="newToAddress" id="newToAddress" name="address">
                                            <button id="${post.parcelId}" class="submitButton" type="submit">submit</button>
                                        </li>
                                        <li><b>Email Address :</b> <p id="toEmail" class="previewEmail">${post.toEmail}</p></li> 
                                    </ul>
                                </form>
                                            <section class="particulars"></section>
                                <div id="parcel">
                                    <h2> Parcel Details </h2> 
                                    <ul id="parcelParticulars">
                                        <li><b>Type:</b> <p id="type">${post.type}</p></li>
                                        <li><b>weight(kg):</b> <p id="weight">${post.weight}</p>
                                            <p> kg </p>
                                            <b>| Price :</b><p id="price">&#8358;${post.price}</p>
                                        </li>
                                        <li><b>Date of Order:</b><p id="date">${post.createdAt}</p></li>
                                    </ul>  
                                </div>
                            </div>
                        
                                <div id="buttons">
                                    <!-- Parcel order status section -->
                                    <div>
                                        <button id="${post.parcelId}" class="cancelButton" name="cancelButton" type="submit">Cancel</button>
                                        <button id="cancelled" class="cancelled" type="submit">Cancelled</button>
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
                  <ul id="fromParticulars">
                      <li><b>Name :</b>
                          <p id="fromName" class="previewName">${post.fromName}</p>
                      </li>
                      <li><b>Address :</b>
                          <p id="fromAddress" class="previewAddress">${post.fromAddress}</p>
                      </li>
                      <li><b>Email Address :</b>
                          <p id="fromEmail" class="previewEmail">${post.fromEmail}</p>
                      </li>
                  </ul>
              </form>
              <section class="particulars"></section>
              <form class="toPreview" id="toPreview">
                  <div class="img_login">
                      <h2> To </h2>
                  </div>

                  <ul id="toParticulars">
                      <li><b>Name :</b>
                          <p id="toName" class="previewName">${post.toName}</p>
                      </li>
                      <li class="destination" id="destination">
                          <b>Address :</b>
                          <p class="toAddress" id="toAddress">${post.toAddress}</p>
                          <button id="editButton3" class="editButton" type="submit">Edit</button>
                      </li>
                      <li class="newDestination" id="newDestination">
                          <b>Address :</b> <input type="text" class="newToAddress" id="newToAddress" name="address">
                          <button id="${post.parcelId}" class="submitButton" type="submit">submit</button>
                      </li>
                      <li><b>Email Address :</b>
                          <p id="toEmail" class="previewEmail">${post.toEmail}</p>
                      </li>
                  </ul>
              </form>
              <section class="particulars"></section>
              <!-- Parcel Details Section -->
              <div id="parcel">
                  <h2> Parcel Details </h2>
                  <ul id="parcelParticulars">
                      <li><b>Type:</b>
                          <p id="type">${post.type}</p>
                      </li>
                      <li>
                          <b>weight(kg):</b>
                          <p id="weight">${post.weight}</p>
                          <p> kg </p>
                          <b>| Price :</b>
                          <p id="price">&#8358;${post.price}</p>
                      </li>
                      <li><b>Date of Order:</b>
                          <p id="date">${post.createdAt}</p>
                      </li>
                  </ul>
              </div>
          </div>
          <div id="buttons">
              <!-- Parcel order status section -->
              <div id="presentLocation">
                  <b>Present Location :</b>
                  <p id="location" class="presentLocation">${post.presentLocation}</p>
              </div>
              <div>
                    <button id="${post.parcelId}" class="cancelButton" type="submit">Cancel</button>
                    <button id="cancelled" class="cancelled" type="submit">Cancelled</button>
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
                  <ul id="fromParticulars">
                      <li><b>Name :</b>
                          <p id="fromName" class="previewName">${post.fromName}</p>
                      </li>
                      <li><b>Address :</b>
                          <p id="fromAddress" class="previewAddress">${post.fromAddress}</p>
                      </li>
                      <li><b>Email Address :</b>
                          <p id="fromEmail" class="previewEmail">${post.fromEmail}</p>
                      </li>
                  </ul>
              </form>
              <section class="particulars"></section>
              <form class="toPreview" id="toPreview">
                  <div class="img_login">
                      <h2> To </h2>
                  </div>

                  <ul id="toParticulars">
                      <li><b>Name :</b>
                          <p id="toName" class="previewName">${post.toName}</p>
                      </li>
                      <li><b>Address :</b>
                          <p id="toAddress" class="previewAddressTo">${post.toAddress}</p>
                      </li>
                      <li><b>Email Address :</b>
                          <p id="toEmail" class="previewEmail">${post.toEmail}</p>
                      </li>
                  </ul>
              </form>
              <section class="particulars"></section>
              <!-- Parcel Details Section -->
              <div id="parcel">
                  <h2> Parcel Details </h2>
                  <ul id="parcelParticulars">
                      <li><b>Type:</b>
                          <p id="type">${post.type}</p>
                      </li>
                      <li><b>weight(kg):</b>
                          <p id="weight">${post.weight}</p>
                          <p> kg </p>
                          <b>| Price :</b>
                          <p id="price">&#8358;${post.price}</p>
                      </li>
                      <li><b>Date of Order:</b>
                          <p id="date">${post.createdAt}</p>
                      </li>
                  </ul>
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
      cancelButtons();
      editBtns();
      submitBtns();
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
  getOrder();
};
